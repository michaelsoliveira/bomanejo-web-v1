import { useCallback, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from "next/router"
import alertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "../Link";
import RadioGroup from "../form/RadioGroup";
import Option from '../form/Option'
import PessoaFisica from "../form/PessoaFisica";
import PessoaJuridica from "../form/PessoaJuridica";
import Endereco from "../endereco";
import { ProjetoContext } from "contexts/ProjetoContext";

const AddEdit = ({ id }: any) => {
    const router = useRouter()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const [ tipoPessoa, setTipoPessoa ] = useState(0)
    const [ detentor, setDetentor ] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const [estado, setEstado] = useState<any>()
    const isAddMode = !projeto?.pessoa

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    function onSelect(index: number) {
        setTipoPessoa(index)
    }

    const loadDetentor = useCallback(async () => {
            const { data } = await client.get(`/detentor/${projeto?.id}`)
            setDetentor(data)
            if (data?.tipo === 'J') { 
                setTipoPessoa(1) 
            } else {
                setTipoPessoa(0)
            }

            setEstado({
                label: data?.endereco?.estado?.nome,
                value: data?.endereco?.estado?.id
            })

            for (const [key, value] of Object.entries(data)) {
                if (key === 'tipo' && value === 'F')
                {
                    setValue("pessoaFisica".concat(key), value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })                     
                } else if (key === 'tipo' && value === 'J') {
                    setValue("pessoaJuridica".concat(key), value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })                     
                } else {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    }) 
                }
                
            }
        
    }, [projeto, client, setValue])
    
    useEffect(() => {  
        loadDetentor()
    }, [loadDetentor])

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createDetentor({...data, id_projeto: projeto?.id, tipo: tipoPessoa === 0 ? 'F' : 'J'})
                : updateDetentor(detentor?.id, { ...data, id_projeto: projeto?.id, tipo: tipoPessoa === 0 ? 'F' : 'J' })
        } catch (error: any) {
            alertService.error(error.message);
        } 
    }

    async function createDetentor(data: any) {
        await client.post('/detentor', data)
            .then((response: any) => {
                const { error, detentor, message } = response.data
                if (error) {
                    alertService.error(message)
                } else {
                    alertService.success(`Detentor cadastrada com SUCESSO!!!`);
                    router.push(`/projeto`)
                }
            }) 
    }

    async function updateDetentor(id: string, data: any) {
        
        await client.put(`/detentor/${id}`, data)
            .then((response: any) => {
                const detentor = response.data
                alertService.success(`Detentor atualizada com SUCESSO!!!`);
                router.push('/projeto')
            })
    }
    
    return (
        <div className="px-4 py-4">
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="lg:p-6 p-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{ isAddMode ? 'Cadastro ' : 'Atualização ' } do Detentor</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Entre com as informações iniciais de seu projeto para ter acesso ao BOManejo.
                            </p>
                            
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6 w-full">
                            <div className="grid grid-cols-6 gap-6 w-full">   
                                <div className="col-span-6 lg:col-span-3">
                                    <div>
                                        <RadioGroup labelText="Tipo">
                                            {["Física", "Jurídica"].map((el, index) => (
                                                <Option
                                                    key={index}
                                                    index={index}
                                                    selectedIndex={tipoPessoa}
                                                    onSelect={(index: any) => {
                                                        setValue('tipo', index === 0 ? 'F' : 'J')
                                                        onSelect(index)
                                                    }}
                                                >
                                                    {el}
                                                </Option> 
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>   
                                <div className="col-span-6">
                                { tipoPessoa === 0 ? (
                                    <PessoaFisica register={register} errors={errors} />
                                ) : (
                                    <PessoaJuridica register={register} errors={errors} />
                                )}
                                    <Endereco value={estado} setValue={setValue} register={register} errors={errors} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Link href={`/projeto`} className="text-center w-40 bg-gray-200 text-sm font-medium text-green-800 p-3 rounded-md">Voltar</Link>
                            <button type="submit" className="inline-flex w-40 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease duration-200">
                                Salvar
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit
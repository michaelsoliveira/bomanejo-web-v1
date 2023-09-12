import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { createRef, FormEvent, useRef, useContext, useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { useAppSelector } from 'store/hooks'
import { RootState } from 'store'

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [categoria, setCategoria] = useState<OptionType>()
    const [categorias, setCategorias] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id
    const poa = useAppSelector((state: RootState) => state.poa)

    const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/categoria?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome&search=${inputValue}`)
        const json = response.data
        
        callback(json?.map((category: any) => ({
            value: category.id,
            label: category.nome
        })))
    };

    useEffect(() => {        
        async function loadEspecie() {
        
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: especie } = await client.get(`/especie/${id}?poa=${poa?.id}`)

                setCategoria({
                    label: especie?.nome_categoria,
                    value: especie?.id_categoria
                })
                for (const [key, value] of Object.entries(especie)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })
                }
            }
        }
        
        loadEspecie()

    }, [session, isAddMode, client, id, setValue, setCategoria, poa?.id])

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const response = await client.get(`/categoria?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
                const { categorias } = response.data

                setCategorias(categorias)
            }
        }
        defaultOptions()    
        
    }, [session, client, projeto?.id, poa?.id])

    const selectedCategoria = (data: any) => {
        setCategoria(data)
        setValue('categoria', data?.value)
    }

    async function onSubmit(data: any) {
        const preparedData = {
            ...data,
            id_projeto: projeto?.id,
            id_categoria: categoria?.value ?? categoria?.value
        }
        
        try {
            return isAddMode
                ? createEspecie(preparedData)
                : updateEspecie(id, preparedData)
        } catch (error: any) {
            console.log(error.message)
            alertService.error(error.message);
        }
        
    }

    async function createEspecie(data: any) {
        client.post('especie', data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/especie')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    function getCategoriasDefaultOptions() {
        return categorias?.map((categoria: any) => {
            return {
                label: categoria.nome,
                value: categoria.id
            }
        })
    }

    async function updateEspecie(id: string, data: any) {
        
        client.put(`/especie/${id}?poa=${poa?.id}`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/especie')
                } else {
                    console.log(message)
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-11/12 max-w-xl mx-auto">
                    <div className='flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/especie" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastro de Espécie</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar Espécie</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            
                            <FormInput
                                name="nome"
                                label="Nome Vulgar (empresa)"
                                register={register}
                                errors={errors}
                                rules={ {required: 'O campo nome é obrigatório'} }
                                id="nome"
                                className="pb-4"
                            />
                            <FormInput
                                id="nome_orgao"
                                name="nome_orgao"
                                label="Nome Vulgar (Órgão Ambiental)"
                                register={register}
                                errors={errors}
                                rules={
                                    {
                                        minLength: {
                                            value: 3,
                                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                        }
                                    }}
                                className="pb-4"
                            />
                            <FormInput
                                id="nome_cientifico"
                                name="nome_cientifico"
                                label="Nome Científico"
                                register={register}
                                errors={errors}
                                rules={
                                    {
                                        minLength: {
                                            value: 3,
                                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                        }
                                    }}
                                className="pb-4"
                            />

                            <div className='pb-4'>
                                <Select
                                    initialData={
                                        {
                                            label: 'Selecione uma Categoria',
                                            value: ''
                                        }
                                    }
                                    selectedValue={categoria}
                                    defaultOptions={getCategoriasDefaultOptions()}
                                    options={loadOptions}
                                    label="Categoria"
                                    callback={selectedCategoria}
                                />
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/especie" className="text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md">Voltar</Link>
                                <button className="w-2/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit
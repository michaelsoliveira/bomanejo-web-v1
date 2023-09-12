import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { RootState } from '../../store'
import { setUpa } from "../../store/upaSlice"
import { ProjetoContext } from 'contexts/ProjetoContext'

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [equacao_volume, setEquacao] = useState<OptionType>()
    const [equacoes, setEquacoes] = useState<any>()
    const [sysRef, setSysRef] = useState<OptionType>()
    const [sysRefs, setSysRefs] = useState<any>()
    const { client } = useContext(AuthContext)
    const { projeto } = useContext(ProjetoContext)
    const umf = useAppSelector((state: RootState) => state.umf)
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id

    const loadEquacoes = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/projeto/${projeto?.id}/eq-volume?search=${inputValue}`)
        const { equacoes } = response.data

        callback(equacoes?.map((eqVolume: any) => ({
            value: eqVolume.id,
            label: eqVolume.nome
        })))
    }

    const loadSysRefs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = sysRefs.filter((srid: any) => srid.srtext?.toLowerCase().includes(inputValue))
        console.log(data)
        callback(data?.map((sysRef: any) => ({
            value: sysRef.srid,
            label: sysRef.srtext
        })))
    }

    useEffect(() => {        
        async function loadUpa() {
            
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: upa } = await client.get(`/upa/${id}`)
                
                setEquacao({
                    label: upa?.equacao_volume?.nome,
                    value: upa?.equacao_volume?.id
                })

                setSysRef({
                    label: upa?.spatial_ref_sys?.srtext.split("\"")[1],
                    value: upa?.spatial_ref_sys?.srid
                })
               
                for (const [key, value] of Object.entries(upa)) {
                    switch(key) {
                        case 'equacao_volume': setValue('equacao_volume', upa.equacao_volume?.id);
                        break;
                        case 'spatial_ref_sys': setValue('spatial_ref_sys', upa.spatial_ref_sys?.srid);
                        break;
                        case 'umf': setValue('umf', upa.umf?.id);
                        break;
                        case 'tipo': setValue('tipo', upa?.tipo.toString());
                        break;
                        default: {
                            setValue(key, value, {
                                shouldValidate: true,
                                shouldDirty: true
                            })
                        }
                    }
                }
            }
        }
        
        loadUpa()

    }, [session, isAddMode, client, id, setValue, setEquacao])

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const eqResponse = await client.get(`/projeto/${projeto?.id}/eq-volume?orderBy=nome&order=asc`)
                const { equacoes } = eqResponse.data

                const sysRefResponse = await client.get(`/sys-ref?orderBy=srtext&order=asc`)
                const { sysRefs } = sysRefResponse.data

                setSysRefs(sysRefs)

                setEquacoes(equacoes)
            }
        }
        defaultOptions()    
        
    }, [session, client, projeto])

    const selectedEquacao = (data: any) => {
        setEquacao(data)
        setValue('equacao_volume', data?.value)
    }

    const selectedSysRef = (data: any) => {
        setSysRef(data)
        setValue('spatial_ref_sys', data?.value)
    }

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createUpa(data)
                : updateUpa(id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    function getSysRefDefaultOptions() {
        return sysRefs?.map((spatialRef: any) => {
            return {
                label: spatialRef.srtext,
                value: spatialRef.srid
            }
        })
    }

    function getEquacoesDefaultOptions() {
        return equacoes?.map((equacao: any) => {
            return {
                label: equacao.nome,
                value: equacao.id
            }
        })
    }

    async function createUpa(data: any) {
        await client.post('upa', {
            umf: umf.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, upa } = response.data
                if (!error) {
                    dispatch(setUpa({
                        id: upa.id,
                        descricao: upa.descricao,
                        tipo: upa.tipo
                    }))
                    alertService.success(message);
                    router.push('/upa')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function updateUpa(id: string, data: any) {
        
        await client.put(`/upa/${id}`, {
            umf: umf.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, upa } = response.data
                if (!error) {
                    dispatch(setUpa({
                        id: upa.id,
                        descricao: upa.descricao,
                        tipo: upa.tipo
                    }))
                    alertService.success(message);
                    router.push('/upa')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/upa" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar UPA</h1>
                            ): (
                                <h1 className='text-xl'>Editar UPA</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col lg:flex-row md:flex-row space-x-0 md:space-x-4'>
                                <div className='w-3/12'>
                                    <FormInput
                                        name="ano"
                                        label="Ano"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                required: 'O campo nome é obrigatório',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                                }
                                            }
                                        }
                                        id="ano"
                                        className="pb-4"
                                    />
                                </div>
                            
                                <div className='lg:w-9/12'>
                                    <FormInput
                                        id="descricao"
                                        name="descricao"
                                        label="Descrição"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        className="pb-4"
                                    />
                                </div>
                                
                            </div>  

                            <div className="border border-gray-200 p-4 mt-4 rounded-md">
                                <span className="text-gray-700">Forma de Inventário</span>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input 
                                            {...register("tipo")}
                                            type="radio" className="form-radio" name="tipo" value="0" 
                                        />
                                        <span className="ml-2">GPS</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input 
                                            {...register("tipo")}
                                            type="radio" className="form-radio" name="tipo" value="1" 
                                        />
                                        <span className="ml-2">Cartesiano (X Y)</span>
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row space-y-4 mt-4 lg:space-y-0 space-x-0 lg:space-x-4'>
                                <div className='lg:w-1/2 border border-gray-200 rounded-lg p-4'>
                                    <span className="text-gray-700 py-2">Coordenadas</span>
                                        <div className='mt-2'>
                                            <Select
                                                placeholder='Selecione o Sistema de Coordenadas'
                                                selectedValue={sysRef}
                                                defaultOptions={getSysRefDefaultOptions()}
                                                options={loadSysRefs}
                                                label="Sistema de Coordenada"
                                                callback={selectedSysRef}
                                            />
                                            </div>
                                    </div>
                                    <div className='lg:w-1/2 border border-gray-200 rounded-lg p-4'>
                                    <span className="text-gray-700 py-2">Equação</span>
                                    <div className='mt-2'>
                                        <Select
                                            placeholder='Selecione uma Equacao'
                                            selectedValue={equacao_volume}
                                            defaultOptions={getEquacoesDefaultOptions()}
                                            options={loadEquacoes}
                                            label="Volume da Árvore"
                                            callback={selectedEquacao}
                                        />
                                    </div>
                                    </div>
                                </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/upa" className="text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit
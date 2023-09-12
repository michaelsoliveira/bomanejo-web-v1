import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { RootState } from '../../store'
import { setPoa } from "../../store/poaSlice"
import { ProjetoContext } from 'contexts/ProjetoContext'
import { useModalContext } from 'contexts/ModalContext'
import { styles } from '../utils/styles'
import {
    PlusIcon,
    PencilIcon,
    // TrashIcon,
    // InboxInIcon,
    // UsersIcon,
    // CalculatorIcon
} from '@heroicons/react/outline'
import AddResponsavel from '../responsavel/AddResponsavel'
import { CriterioPoa } from '../categoria-especie/CriterioPoa'

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [resp_elab, setRespElab] = useState<OptionType>()
    const [resp_exec, setRespExec] = useState<OptionType>()
    const [respElabs, setRespElabs] = useState<any>()
    const [respExecs, setRespExecs] = useState<any>()
    const [includeCategories, setIncludeCategories] = useState<any>(false)
    const { client } = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id
    const { showModal } = useModalContext()
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const [uts, setUts] = useState<any>()
    const [categorias, setCategorias] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    const [checkedUts, setCheckedUts] = useState<any>([])
    const [checkedCategorias, setCheckedCategorias] = useState<any>([])
    const { projeto } = useContext(ProjetoContext)
    const [poas, setPoas] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedPoa, setSelectedPoa] = useState<OptionType>()

    const loadPoas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/poa/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((poa: any) => ({
            value: poa.id,
            label: poa.nome
        })))
    }

    const poaExists = poas?.length

    const loadPoa = useCallback(() => {
        
        if (poa && poaExists > 0) {
            setSelectedPoa({
                value: poa?.id,
                label: poa?.descricao
            })
        } else {
            setSelectedPoa({} as any)
        }
        
    }, [poa, poaExists])

    const selectPoa = async (poa: any) => {
        setSelectedPoa(poa)
        const response = await client.get(`/categoria?poa=${poa.value}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
        const { categorias } = response.data
        setCategorias(categorias.filter((categoria: any) => categoria.nome !== 'Não definida'))
    }

    function getPoasDefaultOptions() {
        const data = poas?.map((poa: any, idx: any) => {
            return {
                label: poa.descricao,
                value: poa.id
            }
        })

        return data
    }

    const loadResponsaveis = useCallback(async () => {
        const respExec = await client.get(`/responsavel?tipo=exec`)
        const { data : resp_tec_exec } = respExec.data
        const respElab = await client.get(`/responsavel?tipo=elab`)
        const { data : resp_tec_elab } = respElab.data

        const responsaveisElab = resp_tec_elab.map((resp: any) => {
            return {
                id: resp.id,
                nome: resp.pessoa.pessoaFisica.nome
            }
        })

        const responsaveisExec = resp_tec_exec.map((resp: any) => {
            return {
                id: resp.id,
                nome: resp.pessoa.pessoaFisica.nome
            }
        })

        setRespElabs(responsaveisElab)
        setRespExecs(responsaveisExec)
    }, [client])

    const loadUpasOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/upa/search/q?descricao=${inputValue}`)
        const data = response.data
        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/umf/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    const loadData = useCallback(async () => {
        const { data: poa } = await client.get(`/poa/${id}`)
        console.log(poa)
        if (!isAddMode && typeof session !== typeof undefined) {

            setRespElab({
                label: poa.resp_elab?.pessoa?.pessoaFisica?.nome,
                value: poa?.id_resp_elab
            })

            setRespExec({
                label: poa.resp_exec?.pessoa?.pessoaFisica?.nome,
                value: poa.id_resp_exec
            })

            if (poa?.ut) {
                setCheckedUts(poa?.ut.map(({ id }: any) => id));    
            }
            
            for (const [key, value] of Object.entries(poa)) {
                switch(key) {
                    case 'resp_exec': setValue('resp_exec', poa.resp_exec?.id);
                    break;
                    case 'resp_elab': setValue('resp_elab', poa.resp_elab?.id);
                    break;
                    default: {
                        setValue(key, value, {
                            shouldValidate: true,
                            shouldDirty: true
                        })
                    }
                }
            }
        } else {
            setValue('corte_maximo', 30)
        }

        const response = await client.get(`/ut?orderBy=numero_ut&order=asc&upa=${upa.id}`)
        const { uts } = response.data
        const utsUncheked = uts?.filter((ut: any) => ut.id_poa === null)
        const filteredUts = uts?.filter((ut: any) => {
            
            if (poa.ut?.length > 0) {
                return poa.ut?.map((u: any) => u.id).includes(ut.id)
            }
            
        })
        
        setUts([...filteredUts, ...utsUncheked]) 
    }, [client, session, isAddMode, id, setCheckedUts, upa.id, setValue])

    const loadCategorias = useCallback(async () => {
        const response = await client.get(`/categoria?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
        const { categorias } = response.data
        setCategorias(categorias.filter((cat: any) => cat.nome !== 'Não definida').map((categoria: any) => categoria))   
    }, [client, poa.id, projeto?.id])

    const defaultUmfsOptions = useCallback(async() => {
        const response = await client.get(`/umf/find-by-projeto/${projeto?.id}?orderBy=nome&order=asc`)
        
            const { umfs } = response.data
            setUmfs(umfs)

            const compareUmf = umfs ? umfs.find((u: any) => u.id === umf.id) : null
            
            if (compareUmf) {
                setSelectedUmf({
                    value: umf?.id,
                    label: umf?.nome
                })
            }

            if (umfs.length === 0) {
                setSelectedUmf({
                    value: '0',
                    label: 'Nenhuma UMF Cadastrada'
                })
            } 
    }, [client, projeto?.id, umf.id, umf?.nome])

    const defaultUpasOptions = useCallback(async () => {
        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf?.id}`)
            const { upas } = response.data
            setUpas(upas)
            if (upas.length === 0) {
                setSelectedUpa({
                    value: '0',
                    label: 'Nenhuma UPA Cadastrada'
                })
            }

            const compareUpa = upas ? upas.find((u: any) => u.id === upa.id) : null

            if (compareUpa) {
                setSelectedUpa({
                    value: upa?.id,
                    label: upa?.descricao
                })
            }
    }, [client, umf?.id, upa?.descricao, upa.id])

    const selectUmf = async (umf: any) => {
        setSelectedUmf(umf)
        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf.value}`)
        const { upas } = response.data
        
        setUpas(upas)
    }

    const selectUpa = async (upa: any) => {
        const poaSelected = poas.find((poa: any) => poa.id === id)
        const upaSelected = upas.find((u: any) => u.id === upa.value)
        setSelectedUpa(upa)

        const response = await client.get(`/ut?orderBy=numero_ut&order=asc&upa=${upaSelected.id}`)
        const { uts } = response.data
        const utsUncheked = uts.filter((ut: any) => ut.id_poa === null)
        const filteredUts = uts.filter((ut: any) => {
            
            if (poaSelected.ut?.length > 0) {
                return poaSelected.ut?.map((u: any) => u.id).includes(ut.id)
            }
            
        })
        
        setUts([...filteredUts, ...utsUncheked])      
    }

    function getUmfsDefaultOptions() {
        return umfs?.map((umf: any) => {
            return {
                label: umf.nome,
                value: umf.id
            }
        })
    }

    function getUpasDefaultOptions() {
        return upas?.map((upa: any) => {
            return {
                label: upa.descricao,
                value: upa.id
            }
        })
    }

    const handleSelectUt = (evt: any) => {
        const utId = evt.target.value

        if (!checkedUts.includes(utId)) {
            setCheckedUts([...checkedUts, utId])
        } else {
            setCheckedUts(checkedUts.filter((checkedUtId: any) => {
                return checkedUtId !== utId
            }))
        }
    }

    const handleSelectAllCategorias = () => {
        if (checkedCategorias?.length < categorias?.length) {
            setCheckedCategorias(categorias.map(({ id }: any) => id));
        } else {
            setCheckedCategorias([]);
        }
    }

    const handleSelectCategoria = (evt: any) => {
        const categoriaId = evt.target.value

        if (!checkedCategorias.includes(categoriaId)) {
            setCheckedCategorias([...checkedCategorias, categoriaId])
        } else {
            setCheckedCategorias(checkedCategorias.filter((checkedId: any) => {
                return checkedId !== categoriaId
            }))
        }
    }

    const handleSelectAllUts = () => {
        if (checkedUts?.length < uts?.length) {
            setCheckedUts(uts.map(({ id }: any) => id));
        } else {
            setCheckedUts([]);
        }
    }

    const responseTecElab = async (data: any) => {
        loadResponsaveis()        
        setValue('resp_elab', data?.id)
        setRespElab({
            label: data?.pessoa?.pessoaFisica?.nome,
            value: data?.id
        })
    }

    const responseTecExec = (data: any) => {
        loadResponsaveis()
        setValue('resp_exec', data?.id)
        setRespExec({
            label: data?.pessoa?.pessoaFisica?.nome,
            value: data?.id
        })
    }

    const addRespElab = () => {
        showModal({
            title: 'Novo Responsável Técnico',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <div><AddResponsavel responseData={responseTecElab} /></div>
        })
    }

    const updateRespElab = () => {
        showModal({
            title: 'Novo Responsável Técnico',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <div><AddResponsavel id={resp_elab?.value} responseData={responseTecElab} /></div>
        })
    }

    const addRespExec = () => {
        showModal({
            title: 'Novo Responsável Técnico',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <div><AddResponsavel responseData={responseTecExec} /></div>
        })
    }

    const updateRespExec = () => {
        showModal({
            title: 'Novo Responsável Técnico',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <div><AddResponsavel id={resp_exec?.value} responseData={responseTecExec} /></div>
        })
    }

    const loadRespElab = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/responsavel?search=${inputValue}`)
        const { data: responsaveis } = response.data
        
        callback(responsaveis?.map((responsavel: any) => ({
            value: responsavel.id,
            label: responsavel.pessoa.pessoaFisica.nome
        })))
    }

    const loadRespExec = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/responsavel?search=${inputValue}`)
        const { data: responsaveis } = response.data

        callback(responsaveis?.map((responsavel: any) => ({
            value: responsavel.id,
            label: responsavel.pessoa.pessoaFisica.nome
        })))
    }

    const loadUpas = useCallback(async() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const upasResponse = await client.get(`/upa?orderBy=nome&order=asc`)
                const { upas } = upasResponse.data
                setUpas(upas)
            }
        }
        defaultOptions()  
    }, [client, session])

    useEffect(() => { 
        async function defaultOptions() {
            const response = await client.get(`/poa?orderBy=descricao&order=asc`)
                const { poas } = response.data
                setPoas([{ descricao: 'Padrão', id: '' }, ...poas])
                
        }
        loadResponsaveis()
        loadData()
        loadPoa()
        defaultOptions()       
        defaultUmfsOptions()
        defaultUpasOptions()
        loadUpas()
        loadCategorias()
    }, [session, client, poa, isAddMode, projeto?.id, id, loadData, loadPoa, loadCategorias, loadResponsaveis, loadUpas, setValue, defaultUmfsOptions, defaultUpasOptions])

    const selectedRespTecElab = (data: any) => {
        setRespElab(data)
        setValue('resp_elab', data?.value)
    }

    const selectedRespTecExec = (data: any) => {
        setRespExec(data)
        setValue('resp_exec', data?.value)
    }

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createPoa({...data, uts: checkedUts, categorias: checkedCategorias})
                : updatePoa(id, {...data, uts: checkedUts})
        } catch (error: any) {
            console.log(error.message)
            alertService.error(error.message);
        }
        
    }

    function getRespTecElabOptions() {
        return respElabs?.map((respTecElab: any) => {
            return {
                label: respTecElab.nome,
                value: respTecElab.id
            }
        })
    }

    function getRespTecExecOptions() {
        return respExecs?.map((respTecExec: any) => {
            return {
                label: respTecExec.nome,
                value: respTecExec.id
            }
        })
    }

    async function createPoa(data: any) {
        await client.post('poa', {
            ...data
        })
            .then((response: any) => {
                const { error, message, poa } = response.data
                if (!error) {
                    dispatch(setPoa({
                        id: poa.id,
                        descricao: poa.descricao,
                        data_ultimo_plan:poa.data_ultimo_plan,
                        pmfs: poa.pmfs
                    }))
                    alertService.success(message);
                    router.push('/poa')
                } else {
                    console.log(message)
                    alertService.error(message)
                }
            }) 
    }

    async function updatePoa(id: string, data: any) {
        await client.put(`/poa/${id}`, {
            ...data
        })
            .then((response: any) => {
                const { error, message, poa } = response.data
                if (!error) {
                    dispatch(setPoa({
                        id: poa.id,
                        descricao: poa.descricao,
                        data_ultimo_plan: poa.data_ultimo_plan,
                        pmfs: poa.pmfs
                    }))
                    alertService.success(message);
                    router.push('/poa')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-4 bg-gray-50">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/poa" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar POA</h1>
                            ): (
                                <h1 className='text-xl'>Editar POA</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
                                
                                <div className='col-span-5 md:col-span-3'>
                                    <FormInput
                                        name="descricao"
                                        label="Descricao"
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
                                        id="descricao"
                                    />
                                </div>
                            
                                <div className='col-span-1'>
                                    <FormInput
                                        id="pmfs"
                                        name="pmfs"
                                        label="Protocolo PMFS"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                                <div className='col-span-5 md:col-span-1'>
                                    <FormInput
                                        id="protocolo_poa"
                                        name="protocolo_poa"
                                        label="Protocolo POA"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                                <div>
                                <FormInput
                                        id="corte_maximo"
                                        name="corte_maximo"
                                        label="Corte Máximo"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                                
                                <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full">
                                    <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Responsáveis Técnicos</span>
                                        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-100 px-4 py-2">
                                            <div className='md:mt-[6px]'>
                                                <Select
                                                    placeholder='CPF ou iniciais do nome'
                                                    selectedValue={resp_elab}
                                                    defaultOptions={getRespTecElabOptions()}
                                                    options={loadRespElab}
                                                    label="Elaboração"
                                                    callback={selectedRespTecElab}
                                                />
                                            </div>
                                            <div className='mb-[6px] md:px-4 w-48'>
                                                <FormInput
                                                    id="num_art_resp_elab"
                                                    name="num_art_resp_elab"
                                                    label="Número ART"
                                                    type="text"
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center space-x-2'>
                                                <span
                                                    onClick={addRespElab}
                                                    className="text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer items-center text-center rounded-full"
                                                >
                                                    <PlusIcon className='w-8 h-8' />
                                                </span>
                                                { resp_elab && (
                                                    <span
                                                        onClick={updateRespElab}
                                                        className="px-2 py-2 text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer items-center text-center rounded-full"
                                                    >
                                                        <PencilIcon className='w-4 h-4' />
                                                    </span>
                                                    ) 
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-100 px-4 py-2">
                                            <div className='md:mt-[6px]'>
                                                <Select
                                                    placeholder='CPF ou iniciais do nome'
                                                    selectedValue={resp_exec}
                                                    defaultOptions={getRespTecExecOptions()}
                                                    options={loadRespExec}
                                                    label="Execução"
                                                    callback={selectedRespTecExec}
                                                />
                                            </div>
                                            <div className='mb-[6px] md:px-4 w-48'>
                                                <FormInput
                                                    id="num_art_resp_exec"
                                                    name="num_art_resp_exec"
                                                    label="Número ART"
                                                    type="text"
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center space-x-2'>
                                                <span
                                                    onClick={addRespExec}
                                                    className="text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer items-center text-center rounded-full"
                                                >
                                                    <PlusIcon className='w-8 h-8' />
                                                </span>
                                                { resp_elab && (
                                                    <span
                                                        onClick={updateRespExec}
                                                        className="px-2 py-2 text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer items-center text-center rounded-full"
                                                    >
                                                        <PencilIcon className='w-4 h-4' />
                                                    </span>
                                                    ) 
                                                }
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                {isAddMode && (
                                    <div className='flex flex-col lg:flex-row space-y-4 mt-2 lg:space-y-0 space-x-0 lg:space-x-4'>
                                        <div className='grid border border-gray-200 rounded-lg p-4 w-full justify-around'>
                                            <div className="flex items-center">
                                                <input
                                                id="import-criterios"
                                                name="import_criterios"
                                                type="checkbox"
                                                value={includeCategories}
                                                onChange={() => setIncludeCategories((current: any) => !current)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="import-criterios" className="ml-2 block text-sm text-gray-900">
                                                    Deseja importar critérios de outro POA?
                                                </label>
                                            </div>
                                            {includeCategories && (
                                            <div>
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 bg-opacity-25 my-2">
                                                <div className="lg:flex lg:flex-wrap px-4">
                                                    <span className="flex items-center">POA: </span>
                                                    <div className="w-full">
                                                        <Select
                        
                                                            placeholder='Selecione o POA...'
                                                            selectedValue={selectedPoa}
                                                            defaultOptions={getPoasDefaultOptions()}
                                                            options={loadPoas}
                                                            callback={selectPoa}
                                                            initialData={{
                                                                label: 'Entre com as iniciais do POA ...', value: ''
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>     
                                            {categorias.length > 0 && (
                                                <>
                                                    <CriterioPoa 
                                                        checkedCategorias={checkedCategorias} 
                                                        categorias={categorias} 
                                                        handleSelectAllCategorias={handleSelectAllCategorias} 
                                                        handleSelectCategoria={handleSelectCategoria} 
                                                    />
                                                </>
                                            )}
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    
                                )}
                                
                                <div className='border border-gray-200 rounded-lg p-4 mt-5 relative'>
                                        <span className="text-gray-700 py-2 absolute -top-5 bg-white px-2">UTs</span>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                                {/* <div className="w-3/12 flex items-center px-2">UMF: </div> */}
                                <div>
                                    <Select
                                        initialData={
                                            {
                                                label: 'Selecione UMF...',
                                                value: ''
                                            }
                                        }
                                        selectedValue={selectedUmf}
                                        defaultOptions={getUmfsDefaultOptions()}
                                        options={loadUmfs}
                                        label="UMF:"
                                        callback={(e) => {selectUmf(e)}}
                                    />
                                </div>
                                <div>
                                    <Select
                                        initialData={
                                            {
                                                label: 'Selecione UPA...',
                                                value: ''
                                            }
                                        }
                                        selectedValue={selectedUpa}
                                        defaultOptions={getUpasDefaultOptions()}
                                        options={loadUpasOptions}
                                        label="UPA:"
                                        callback={(e) => {selectUpa(e)}}
                                    />
                                </div>
                            <div id='uts'>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="w-1/12">
                                                <div className="flex justify-center">
                                                <input  
                                                    checked={checkedUts?.length === uts?.length}
                                                    onChange={handleSelectAllUts}                
                                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                                />
                                                </div>
                                            </th>
                                            <th
                                                className="w-4/12"
                                            >
                                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                                    UTs
                                                </div>        
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {uts?.map((ut: any) => (
                                        <tr key={ut.id}>
                                            <td className="flex justify-center">
                                                <input                 
                                                    value={ut?.id}
                                                    checked={checkedUts.includes(ut?.id)}
                                                    onChange={handleSelectUt}
                                                    id="poaId"
                                                    type="checkbox"
                                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                />    
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex flex-col items-starter">
                                                    <div className="text-sm font-medium text-gray-900">{ut?.numero_ut}</div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                                </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/poa" className="text-center w-1/5 bg-gray-100 transition-all delay-150 hover:bg-gray-200 duration-200 p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-green-600 text-white p-3 rounded-md transition-all delay-150 hover:bg-green-700 duration-200">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit
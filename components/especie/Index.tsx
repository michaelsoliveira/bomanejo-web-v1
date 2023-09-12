import { CSSProperties, ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { EspecieType } from "types/IEspecieType"
import { useModalContext } from "contexts/ModalContext"
import { LoadingContext } from "contexts/LoadingContext"
import { CsvDataService } from "services/create-csv"
import { ProjetoContext } from "contexts/ProjetoContext"
import ImportModal from "./ImportModal"
import { styles as stylesButton } from '../utils/styles'
import { StepContext } from "contexts/StepContext"
import { useAppSelector } from "store/hooks"
import { RootState } from "store"
import ExportPDF from "./ExportPDF"

const Index = ({ currentEspecies, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loadEspecies }: any) => {
    
    const [filteredEspecies, setFilteredEspecies] = useState<EspecieType[]>([])
    const [selectedEspecie, setSelectedEspecie] = useState<EspecieType>()
    const [searchInput, setSearchInput] = useState("")
    const [uploading, setUploading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const fileRef = useRef(null) as any
    const [sorted, setSorted] = useState(false)
    const [checkedEspecies, setCheckedEspecies] = useState<any>([])
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store
    const { setLoading } = useContext(LoadingContext)
    const { projeto } = useContext(ProjetoContext)
    const poa = useAppSelector((state: RootState) => state.poa)
    const submitImport = useRef(null) as any
    const { step } = useContext(StepContext)
    const steps = [
        "Arquivo",
        "Erros",
        "Finalizar"
    ]


    const styles = {
        csvReader: {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
        } as CSSProperties,
        progressBarBackgroundColor: {
          backgroundColor: 'green',
        } as CSSProperties,
    };

    const styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    const especieById = useCallback((id?: string) => {
        return currentEspecies.find((especie: EspecieType) => especie.id === id)
    }, [currentEspecies])

    const callBackImport = async () => {
        submitImport.current.click()        
    }

    const importModal = () => {
        showModal({
            title: 'Importar Espécies',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: stylesButton.greenButton, confirmBtn: (step === steps.length) ? "Finalizar" : "Prosseguir" , 
            options: false,
            content: <div><ImportModal loadEspecies={loadEspecies} ref={submitImport} steps={steps} callback={callBackImport}/></div>
        })
    }

    const deleteEspecie = useCallback(async (id?: string) => {
        try {
            client.delete(`/especie/single/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadEspecies()
                        hideModal()
                    }
                })
        } catch (error) {
            console.log(error)
        }       
    }, [client, hideModal, loadEspecies])
    
    const deleteSingleModal = useCallback((id?: string) => {
            const especie = especieById(id)
            showModal({ title: 'Deletar Espécie', onConfirm: () => { deleteEspecie(id) }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem certeza que deseja excluir a Espécie ${especie?.nome}?`})
        }, [especieById, showModal, deleteEspecie])
        
    const deleteMultModal = () => showModal({ title: 'Deletar Espécies', onConfirm: deleteEspecies, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Espécies Selecionadas?' })

    useEffect(() => {
        setFilteredEspecies(currentEspecies)
    }, [currentEspecies, poa])

    const deleteEspecies = async () => {
        setLoading(true)

        try {
            await client.post('/especie/multiples', { ids: checkedEspecies} )
                .then(() => {
                    setCheckedEspecies([])
                    alertService.success('As espécies foram deletadas com SUCESSO!!!')
                    loadEspecies()
                    hideModal()
                })
        setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleImportTemplate = async () => {
        const data = [
            { nome_vulgar: 'Teste1', nome_orgao: 'Teste1', nome_cientifico: 'Teste1' },
            { nome_vulgar: 'Teste2', nome_orgao: 'Teste2', nome_cientifico: 'Teste2' },
            { nome_vulgar: 'Teste3', nome_orgao: 'Teste3', nome_cientifico: 'Teste3' }
        ]
        
        CsvDataService.exportToCsv('template_especie', data)
    }

    const handleFocusBack = () => {
        setUploading(false)
        window.removeEventListener('focus', handleFocusBack)
    }

    const handleSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            search: evt.target.value,
        }
        
        setSearchInput(evt.target.value)
        onPageChanged(paginatedData)
    }

    const sortEspecies = (sortBy: string) => {
        const sortedBy = sortBy.split(".")
        const nElements = sortedBy.length
        
        let sortedEspecies: any = []        
        sortedEspecies = filteredEspecies.sort((a: any, b: any) => {
            return  sorted
                ? nElements > 1 
                    ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : nElements > 1 
                    ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredEspecies(sortedEspecies)    
    }

    const handleSelectEspecie = (evt: any) => {
        const especieId = evt.target.value

        if (!checkedEspecies.includes(especieId)) {
            setCheckedEspecies([...checkedEspecies, especieId])
        } else {
            setCheckedEspecies(checkedEspecies.filter((checkedEspecieId: any) => {
                return checkedEspecieId !== especieId
            }))
        }
    }

    const handleSelectAllEspecies = () => {
        if (checkedEspecies.length < currentEspecies.length) {
            setCheckedEspecies(currentEspecies.map(({ id }: any) => id));
        } else {
            setCheckedEspecies([]);
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Espécies</h1>
                <div className="flex flex-row justify-center items-center">
                    <div>
                        <a
                            onClick={handleImportTemplate}
                            className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        <span className="ml-2">Modelo</span>
                        </a>
                    </div>
                    <div className="px-4">
                        <a
                            onClick={importModal}
                            className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                        >
                            Importar
                        </a>
                    </div>
                <div>
                    <Link
                        href='/especie/add'
                        className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                    >
                        Adicionar
                    </Link>
                </div>
                </div>
                
                
            </div>
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={changeItemsPerPage}
                                id="perPage" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="w-60 px-4">Pesquisar Espécie:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Espécie"
                                id="search"
                                name="search"
                                value={searchInput}
                                onChange={handleSearch}
                                autoFocus
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedEspecies?.length > 0 && (
                                <div className="py-4">
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        onClick={deleteMultModal}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            )}
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 w-full">
                        <tr>
                        <th>
                            <div className="flex justify-center">
                            <input  
                                checked={checkedEspecies?.length === currentEspecies?.length}
                                onChange={handleSelectAllEspecies}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                 
                        </th>
                        <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome_orgao')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome Vulgar
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome_cientifico')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome Científico
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="flex flex-row items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('categoria_especie.nome')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Categoria
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th scope="col" className="relative w-1/12 px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentEspecies?.map((especie: any, idx: any) => (
                            <tr key={idx}>
                            <td className="flex justify-center">
                            <input                 
                                    value={especie?.id}
                                    checked={checkedEspecies?.includes(especie?.id)}
                                    onChange={handleSelectEspecie}
                                    id="especieId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{especie?.nome}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{especie.nome_orgao}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{especie.nome_cientifico}</div>
                            </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{especie?.categoria?.nome}</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href={`/especie/update/${especie.id}`}>
                                <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(especie.id)}>
                                <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                            </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            
        </div>
            
    </div>
    )
}

export default Index

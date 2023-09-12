import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { OptionType, Select } from '../Select'
import { setUmf } from "../../store/umfSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store"

import { useModalContext } from "contexts/ModalContext"
import { styles } from "../utils/styles"
import { ProjetoContext } from "contexts/ProjetoContext"

const Index = ({ currentPoas, onPageChanged, changeItemsPerPage, orderBy, order, currentPage, perPage, loading, loadPoas }: any) => {
    
    const [filteredPoas, setFilteredPoas] = useState<any[]>(currentPoas)
    const { client } = useContext(AuthContext)
    const [checkedPoas, setCheckedPoas] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const [umfs, setUmfs] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)

    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store

    const poaById = (id?: string) => {
        return currentPoas.find((poa: any) => poa.id === id)
    }

    const deleteSingleModal = (id?: string) => showModal({ title: 'Deletar POA', onConfirm: () => { deletePoa(id) }, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem Certeza que deseja excluir o POA ${poaById(id)?.descricao} ?` })
    const deleteMultModal = () => showModal({ title: 'Deletar POAs', onConfirm: deletePoas, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os POAs selecionados' })
    

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/umf/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    const umfExits = umfs?.length

    const loadUmf = useCallback(() => {
        
        if (umf && umfExits > 0) {
            setSelectedUmf({
                value: umf?.id,
                label: umf?.nome
            })
        } else {
            setSelectedUmf({} as any)
        }
        
    }, [umf, umfExits])

    useEffect(() => {
        async function defaultOptions() {
            const response = await client.get(`/umf/find-by-projeto/${projeto?.id}?orderBy=nome&order=asc`)
                const { umfs } = response.data
                setUmfs(umfs)
        }

        loadUmf()
        
        defaultOptions()
        setFilteredPoas(currentPoas)
    }, [currentPoas, currentPage, client, umf, loadUmf, projeto?.id])

    const selectUmf = async (umf: any) => {
        dispatch(setUmf({
            id: umf.value,
            nome: umf.label
        }))
        setSelectedUmf(umf)
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            totalItems: filteredPoas ? filteredPoas.length : 0
        }
        
        onPageChanged(paginatedData)
    }

    function getUmfsDefaultOptions() {
        const data = umfs?.map((umf: any, idx: any) => {
            return {
                label: umf.nome,
                value: umf.id
            }
        })

        return [{ label: 'Todos', value: 'todos' }].concat(data)
    }

    async function deletePoa(id?: string) {
        try {
            await client.delete(`/poa/single/${id}`)
                .then(() => {
                    alertService.success('O POA foi deletada com SUCESSO!!!')
                    loadPoas()
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }       
    }

    const handleSearch = async (query: string) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            search: query
        }
        onPageChanged({
            umf: umf.id,
            ...paginatedData
        })
    }

    const sortPoas = () => {
        let setedPoas: any = []        
        setedPoas = filteredPoas.sort((a: any, b: any) => {
            return sorted
                ? a.descricao.toLowerCase().localeCompare(b.descricao.toLowerCase())
                : b.descricao.toLowerCase().localeCompare(a.descricao.toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredPoas(setedPoas)    
    }

    const handleSelectPoa = (evt: any) => {
        const poaId = evt.target.value

        if (!checkedPoas.includes(poaId)) {
            setCheckedPoas([...checkedPoas, poaId])
        } else {
            setCheckedPoas(checkedPoas.filter((checkedPoaId: any) => {
                return checkedPoaId !== poaId
            }))
        }
    }

    const handleSelectAllPoas = () => {
        if (checkedPoas?.length < currentPoas?.length) {
            setCheckedPoas(currentPoas.map(({ id }: any) => id));
        } else {
            setCheckedPoas([]);
        }
    };

    const deletePoas = async () => {
        try {
            await client.delete('/poa/multiples', { data: { ids: checkedPoas} })
                .then((response: any) => {
                    setCheckedPoas([])
                    alertService.success('As POAs foram deletadas com SUCESSO!!!')
                    loadPoas()  
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Plano Operacional Anual</h1>
                <Link
                    href='/poa/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6 lg:px-16">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={(evt: any) => changeItemsPerPage(evt.target.value)}
                                id="perPage" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="lg:flex lg:flex-wrap lg:w-5/12 px-4">
                            <div className="w-3/12 flex items-center">UMF: </div>
                            <div className="w-9/12">
                                <Select

                                    placeholder='Selecione UMF...'
                                    selectedValue={selectedUmf}
                                    defaultOptions={getUmfsDefaultOptions()}
                                    options={loadUmfs}
                                    // label="Volume da Árvore"
                                    callback={selectUmf}
                                    initialData={{
                                        label: 'Entre com as iniciais da UMF...', value: 'Entre com as iniciais da UMF...'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-60 px-4">Pesquisar POA:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Poa"
                                id="search"
                                name="search"
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedPoas.length > 0 && (
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
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-1/12">
                                    <div className="flex justify-center">
                                    <input  
                                        checked={checkedPoas?.length === currentPoas?.length}
                                        onChange={handleSelectAllPoas}                
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                    />
                                    </div>
                                </th>
                                <th
                                    className="w-4/12"
                                    onClick={() => sortPoas()}
                                >
                                    <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Descricao
                                        {sorted
                                            ? (<ChevronUpIcon className="w-5 h-5" />)
                                            : (<ChevronDownIcon className="w-5 h-5" />)
                                        }
                                    </div>        
                                </th>
                                <th
                                    className="w-[5rem]"
                                    scope="col"
                                >
                                    <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Situação
                                        {sorted
                                            ? (<ChevronUpIcon className="w-5 h-5" />)
                                            : (<ChevronDownIcon className="w-5 h-5" />)
                                        }
                                    </div>
                                </th>   
                                <th
                                    scope="col"
                                    className="w-[5rem]"
                                >
                                    <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Data Último Planejamento
                                        {sorted
                                            ? (<ChevronUpIcon className="w-5 h-5" />)
                                            : (<ChevronDownIcon className="w-5 h-5" />)
                                        }
                                    </div>
                                </th>  
                                <th scope="col" className="w-1/12 px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPoas?.map((poa: any) => (
                            <tr key={poa.id}>
                                <td className="flex justify-center">
                                    <input                 
                                        value={poa?.id}
                                        checked={checkedPoas.includes(poa?.id)}
                                        onChange={handleSelectPoa}
                                        id="poaId"
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    />    
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="flex flex-col items-starter">
                                        <div className="text-sm font-medium text-gray-900">{poa?.descricao}</div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="flex flex-col items-starter">
                                        <div className="text-sm font-medium text-gray-900">{poa?.situacao_poa?.nome}</div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{poa?.data_ultimo_plan ? new Date(poa?.data_ultimo_plan?.toString()).toLocaleDateString('pt-BR') : ''}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                    <Link href={`/poa/update/${poa.id}`}>
                                        <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                    </Link>
                                    <Link href="#" onClick={() => deleteSingleModal(poa.id)}>
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
        )}
            
    </div>
    )
}

export default Index

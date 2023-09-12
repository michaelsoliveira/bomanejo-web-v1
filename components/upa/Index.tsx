import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import Modal from "../Modal"
import { AuthContext } from "../../contexts/AuthContext"
import { OptionType, Select } from '../Select'
import { setUmf } from "../../store/umfSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store"
import { UpaType } from "types/IUpaType"

import { useModalContext } from "contexts/ModalContext"
import { styles } from "../utils/styles"
import { ProjetoContext } from "contexts/ProjetoContext"

const Index = ({ currentUpas, onPageChanged, changeItemsPerPage, orderBy, order, currentPage, perPage, loading, loadUpas }: any) => {
    
    const [filteredUpa, setFilteredUpa] = useState<UpaType[]>(currentUpas)
    const { client } = useContext(AuthContext)
    const [checkedUpas, setCheckedUpas] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const [umfs, setUmfs] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)

    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store

    const upaById = (id?: string) => {
        return currentUpas.find((ut: UpaType) => ut.id === id)
    }

    const deleteSingleModal = (id?: string) => showModal({ title: 'Deletar UPA', onConfirm: () => { deleteUpa(id) }, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem Certeza que deseja excluir a UPA ${upaById(id)?.descricao} ?` })
    const deleteMultModal = () => showModal({ title: 'Deletar UPAs', onConfirm: deleteUpas, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir as UPAs selecionadas' })
    

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
        setFilteredUpa(currentUpas)
    }, [currentUpas, currentPage, client, umf, loadUmf, projeto?.id])

    const selectUmf = async (umf: any) => {
        dispatch(setUmf({
            id: umf.value,
            nome: umf.label
        }))
        setSelectedUmf(umf)
        const response = await client.get(`/upa?orderBy=nome&order=asc&umf=${umf.value}`)
        const { upas } = response.data
        
        setFilteredUpa(upas)
    }

    function getUmfsDefaultOptions() {
        return umfs?.map((umf: any) => {
            return {
                label: umf.nome,
                value: umf.id
            }
        })
    }

    async function deleteUpa(id?: string) {
        try {
            await client.delete(`/upa/single/${id}`)
                .then(() => {
                    alertService.success('A UPA foi deletada com SUCESSO!!!')
                    loadUpas()
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

    const sortUpas = () => {
        let sortedUpas: any = []        
        sortedUpas = filteredUpa.sort((a: any, b: any) => {
            return sorted
                ? a.descricao.toLowerCase().localeCompare(b.descricao.toLowerCase())
                : b.descricao.toLowerCase().localeCompare(a.descricao.toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredUpa(sortedUpas)    
    }

    const handleSelectUpa = (evt: any) => {
        const upaId = evt.target.value

        if (!checkedUpas.includes(upaId)) {
            setCheckedUpas([...checkedUpas, upaId])
        } else {
            setCheckedUpas(checkedUpas.filter((checkedUpaId: any) => {
                return checkedUpaId !== upaId
            }))
        }
    }

    const handleSelectAllUpas = () => {
        if (checkedUpas?.length < currentUpas?.length) {
            setCheckedUpas(currentUpas.map(({ id }: any) => id));
        } else {
            setCheckedUpas([]);
        }
    };

    const deleteUpas = async () => {
        try {
            await client.delete('/upa/multiples', { data: { ids: checkedUpas} })
                .then((response: any) => {
                    setCheckedUpas([])
                    alertService.success('As UPAs foram deletadas com SUCESSO!!!')
                    loadUpas()  
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Unidade de Produção Anual</h1>
                <Link
                    href='/upa/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6">
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
                        <div className="w-60 px-4">Pesquisar UPA:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Upa"
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
                            {checkedUpas.length > 0 && (
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
                                    checked={checkedUpas?.length === currentUpas?.length}
                                    onChange={handleSelectAllUpas}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                            <th
                                className="w-1/12"
                                onClick={() => sortUpas()}
                            >
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Ano
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>        
                            </th>
                            <th
                                scope="col"
                                className="w-4/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Descrição
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Tipo de Coordenada
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Modelo de Equação
                            </th>           
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUpa?.map((upa: UpaType) => (
                        <tr key={upa.id}>
                            <td className="flex justify-center">
                                <input                 
                                    value={upa?.id}
                                    checked={checkedUpas.includes(upa?.id)}
                                    onChange={handleSelectUpa}
                                    id="upaId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex flex-col items-starter">
                                    <div className="text-sm font-medium text-gray-900">{upa?.ano}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{upa?.descricao}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{ upa?.tipo == 0 ? (<div>GPS</div>) : (<div>Cartesiano X Y</div>) }</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{ upa?.equacao_volume?.nome }</div>
                                </span>
                            </td>   
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/upa/update/${upa.id}`}>
                                    <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => deleteSingleModal(upa.id)}>
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

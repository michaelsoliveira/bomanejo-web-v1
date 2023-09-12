import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { UmfType } from "types/IUMFType"
import { useModalContext } from "contexts/ModalContext"
import { styles } from "../utils/styles"
import Modal from "../Modal"

const Umfs = ({ currentUmfs, onPageChanged, changeItemsPerPage, orderBy, order, currentPage, perPage, loading, loadUmfs }: any) => {
    
    const [filteredUmf, setFilteredUmf] = useState<UmfType[]>(currentUmfs)
    const { client } = useContext(AuthContext)
    const [checkedUmfs, setCheckedUmfs] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store

    const umfById = (id?: string) => {
        return currentUmfs.find((ut: UmfType) => ut.id === id)
    }

    const deleteSingleModal = (id?: string) => showModal({ title: 'Deletar UMF', onConfirm: () => { deleteUmf(id) }, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem Certeza que deseja excluir a UMF ${umfById(id)?.nome} ?` })
    const deleteMultModal = () => showModal({ title: 'Deletar UMFs', onConfirm: deleteUmfs, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir as UMFs selecionadas' })

    useEffect(() => {
        setFilteredUmf(currentUmfs)
    }, [currentUmfs, currentPage])

    async function deleteUmf(id?: string) {
        try {
            client.delete(`/umf/single/${id}`)
                .then(() => {
                    alertService.success('A UMF foi deletada com SUCESSO!!!')
                    loadUmfs()
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
        onPageChanged(paginatedData)
    }

    const sortUmfs = () => {
        let sortedUmfs: any = []        
        sortedUmfs = filteredUmf.sort((a: any, b: any) => {
            return sorted
                ? a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
                : b.nome.toLowerCase().localeCompare(a.nome.toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredUmf(sortedUmfs)    
    }

    const handleSelectUmf = (evt: any) => {
        const umfId = evt.target.value

        if (!checkedUmfs.includes(umfId)) {
            setCheckedUmfs([...checkedUmfs, umfId])
        } else {
            setCheckedUmfs(checkedUmfs.filter((checkedUmfId: any) => {
                return checkedUmfId !== umfId
            }))
        }
    }

    const handleSelectAllUmfs = () => {
        if (checkedUmfs?.length < currentUmfs?.length) {
            setCheckedUmfs(currentUmfs.map(({ id }: any) => id));
        } else {
            setCheckedUmfs([]);
        }
    };

    const deleteUmfs = async () => {
        try {
            await client.delete('/umf/multiples', { data: { ids: checkedUmfs} })
                .then((response: any) => {
                    setCheckedUmfs([])
                    alertService.success('As UMFs foram deletadas com SUCESSO!!!')
                    loadUmfs()  
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Unidade de Manejo Florestal</h1>
                <Link
                    href='/umf/add'
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
                        <div className="w-60 px-4">Pesquisar UMF:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar UMF"
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
                            {checkedUmfs.length > 0 && (
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
                            <th>
                                <div className="flex justify-center">
                                <input  
                                    checked={checkedUmfs?.length === currentUmfs?.length}
                                    onChange={handleSelectAllUmfs}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                            <th
                                className="w-3/12"
                                onClick={() => sortUmfs()}
                            >
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Nome
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>        
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Município
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Endereço
                            </th>
                            <th
                                scope="col"
                                className="w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Estado
                            </th>           
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUmf?.map((umf: UmfType) => (
                        <tr key={umf.id}>
                            <td className="flex justify-center">
                                <input                 
                                    value={umf?.id}
                                    checked={checkedUmfs.includes(umf?.id)}
                                    onChange={handleSelectUmf}
                                    id="umfId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex flex-col items-starter">
                                    <div className="text-sm font-medium text-gray-900">{umf?.nome}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{umf?.municipio}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{umf?.localizacao}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{umf?.estado?.uf}</div>
                                </span>
                            </td>   
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/umf/update/${umf.id}`}>
                                    <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => deleteSingleModal(umf.id)}>
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

export default Umfs

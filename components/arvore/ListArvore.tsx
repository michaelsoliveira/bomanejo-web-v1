import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { AuthContext } from 'contexts/AuthContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import alertService from '../../services/alert'
import { useModalContext } from 'contexts/ModalContext'
import { Link } from "../Link"
import { LoadingContext } from 'contexts/LoadingContext'
import classNames from 'classnames'

type ListArvoreType = {
    currentArvores: any, 
    sortArvores: (sortBy: string) => void, 
    sorted: boolean; 
    loadArvores?: any, 
    callBack?: any,
    planejar?: boolean
}

const ListArvore = ({ 
            currentArvores, 
            sortArvores, 
            sorted, 
            loadArvores, 
            callBack,
            planejar = false 
        }: ListArvoreType) => {
    const upa = useAppSelector((state: RootState) => state.upa)
    const { client } = useContext(AuthContext)
    const { showModal, hideModal, store } = useModalContext()
    const { setLoading } = useContext(LoadingContext)
    const [checkedArvores, setCheckedArvores] = useState<any>([])

    const deleteArvores = async () => {
        setLoading(true)
        try {
            await client.delete('/arvore/multiples', { data: { ids: checkedArvores} })
                .then(() => {
                    setCheckedArvores([])
                    alertService.success('As espécies foram deletadas com SUCESSO!!!')
                    loadArvores()
                    hideModal()
                })
        setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMultModal = () => showModal({ title: 'Deletar Árvores', onConfirm: deleteArvores, styleButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500', iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Árvores Selecionadas?' })

    const handleSelectArvore = (evt: any) => {
        const arvoreId = evt.target.value

        if (!checkedArvores.includes(arvoreId)) {
            planejar &&  callBack([...checkedArvores, arvoreId])
            setCheckedArvores([...checkedArvores, arvoreId])
        } else {
            setCheckedArvores(checkedArvores.filter((checkedArvoreId: any) => {
                return checkedArvoreId !== arvoreId
            }))
            planejar && callBack(checkedArvores.filter((checkedArvoreId: any) => checkedArvoreId !== arvoreId))
        }

    }

    const handleSelectAllArvore = () => {
        if (checkedArvores.length < currentArvores.length) {
            planejar && callBack(currentArvores.map(({ id }: any) => id))
            setCheckedArvores(currentArvores.map(({ id }: any) => id));
        } else {
            planejar && callBack([])
            setCheckedArvores([]);
        }
    }

    const deleteArvore = useCallback(async (id?: string) => {
        try {
            await client.delete(`/arvore/single/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadArvores()
                        hideModal()
                    }
                })
        } catch (error) {
            console.log(error)
        }       
    }, [client, hideModal, loadArvores])

    const arvoreById = useCallback((id?: string) => {
        return currentArvores.find((arvore: any) => arvore.id === id)
    }, [currentArvores])

    const deleteSingleModal = useCallback((id?: string) => {
        const arvore = arvoreById(id)
        showModal({ title: 'Deletar Árvore', onConfirm: () => { deleteArvore(id) }, styleButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500', iconType: 'warn', confirmBtn: 'Deletar', content: `Tem certeza que deseja excluir a Árvore de número ${arvore?.numero_arvore}?`})
    }, [arvoreById, showModal, deleteArvore])

    return (
        <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
            <div className={classNames(
                "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg",
                planejar && 'h-64'
            )}>
                {!planejar && checkedArvores?.length > 0 && (
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
                <thead className={classNames(
                    "bg-gray-50 w-full",
                    planejar && "sticky top-0"
                )}>
                    <tr>
                        { planejar ? (
                            <>
                                <th>
                                    <div className="flex justify-center">
                                    <input  
                                        checked={checkedArvores?.length === currentArvores?.length}
                                        onChange={handleSelectAllArvore}                
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                    />
                                    </div>
                                </th>
                            </>
                        ) : (
                            <>
                                <th>
                                    <div className="flex justify-center">
                                    <input  
                                        checked={checkedArvores?.length === currentArvores?.length}
                                        onChange={handleSelectAllArvore}                
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                    />
                                    </div>
                                </th>
                            </>
                        )}
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('ut.numero_ut')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            UT
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('numero_arvore')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            Número
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('especie.nome')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            Espécie
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    {upa?.tipo === 1 && (
                        <>
                            <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('faixa')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Faixa
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('orient_x')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Orientação X
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                 
                        </th>
                        </>
                    )}
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('dap')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            CAP (cm)
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('dap')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            DAP (cm)
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('altura')}
                    >
                        <div className="flex flex-row w-full justify-between">
                            Altura (m)
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    <th
                        scope="col"
                        className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => sortArvores('volume')}
                    >
                        <div className="flex flex-row w-full">
                            Volume (m<sup>3</sup>)
                            {sorted
                                ? (<ChevronUpIcon className="w-5 h-5" />)
                                : (<ChevronDownIcon className="w-5 h-5" />)
                            }
                        </div>   
                    </th>
                    { planejar && (
                        <>
                            <th
                                scope="col"
                                className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => sortArvores('fuste')}
                            >
                                <div className="flex flex-row w-full justify-between">
                                    Fuste
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>   
                            </th>
                            <th
                                scope="col"
                                className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => sortArvores('area_basal')}
                            >
                                <div className="flex flex-row w-full justify-between">
                                    A. Basal
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>   
                            </th>
                        </>
                    ) }
                    { !planejar && (
                        <>
                            <th
                                scope="col"
                                className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => sortArvores('situacao_arvore.nome')}
                            >
                                <div className="flex flex-row w-full justify-between">
                                    Situação
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>   
                            </th>
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </>
                    ) }
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentArvores?.map((arvore: any) => (
                        <tr key={arvore.id}>
                        <td className="flex justify-center">
                        <input                 
                                value={arvore?.id}
                                checked={checkedArvores.includes(arvore?.id)}
                                onChange={handleSelectArvore}
                                id="arvoreId"
                                type="checkbox"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            />    
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                <div className="text-sm font-medium text-gray-900">{arvore?.ut?.numero_ut}</div>
                            </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex flex-col items-starter">
                            <div className="text-sm font-medium text-gray-900">{arvore?.numero_arvore}</div>
                        </div>
                        </td>                        
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore?.especie?.nome}</div>
                            </span>
                        </td>
                        {(upa?.tipo === 1) && (
                            <>
                                <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{arvore?.faixa}</div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore?.orient_x}</div>
                                </span>
                                </td>
                            </>
                        )}
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{(arvore?.dap * Math.PI).toFixed(2)}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore?.dap}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore?.altura}</div>
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore?.volume}</div>
                            </span>
                        </td>
                        { planejar && (
                            <>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.fuste}</div>
                                    </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.area_basal.toFixed(4)}</div>
                                    </span>
                                </td>
                            </>
                        ) }
                        
                        { !planejar && (
                            <>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore?.situacao_arvore?.nome}</div>
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/arvore/update/${arvore.id}`}>
                                    <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => deleteSingleModal(arvore.id)}>
                                    <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                </Link>
                            </td>
                        </>
                        ) }
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default ListArvore
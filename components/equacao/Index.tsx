import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "../Link" 
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { styles, stylesForm } from "../utils/styles"
import { useModalContext } from "contexts/ModalContext"
import { LinkBack } from "../LinkBack"
import { AddEdit } from "./AddEdit"
import React, { createRef } from 'react'
import { PlusIcon } from "@heroicons/react/outline"
import { ProjetoContext } from "contexts/ProjetoContext"

const Index = ({ currentEquacoes, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loading, loadEquacoes }: any) => {
    
    const [filteredEquacoes, setFilteredEquacoes] = useState<any[]>(currentEquacoes)
    const { client } = useContext(AuthContext)
    const [sorted, setSorted] = useState(false)
    const [checkedEquacoes, setCheckedEquacoes] = useState<any>([])
    const [eqModelos, setEqModelos] = useState<any>()
    const { showModal, hideModal } = useModalContext()
    const formRef = createRef<any>()
    const { projeto } = useContext(ProjetoContext)

    const loadEqModelos = useCallback(async () => {
        const response = await client.get(`/eq-modelo`)
        const { data } = response.data
        
        setEqModelos(data)
        
    },[client])

    useEffect(() => {
        loadEqModelos()
    }, [loadEqModelos])
    
    const equacaoById = (id?: string) => {
        return currentEquacoes.find((equacao: any) => equacao.id === id)
    }

    const formSubmit = () => {
        formRef.current.handleSubmit()

        if (formRef.current.isValid) {
            hideModal()
        }
    }

    const deleteSingleModal = (id?: string) => 
        showModal({ 
            size: 'max-w-lg',
            title: 'Deletar Equação', 
            onConfirm: () => { deleteEquacao(id) }, 
            styleButton: styles.redButton, 
            iconType: 'warn', 
            confirmBtn: 'Deletar', 
            content: `Tem Certeza que deseja excluir o Equação ${equacaoById(id)?.nome} ?` 
    })

    const updateEquacao = (id?: string) => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Editar Equação', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit eqModelos={eqModelos} sendForm={() => { loadEquacoes(10) }} ref={formRef} projetoId={projeto?.id} equacaoId={id} styles={stylesForm} redirect={false} />
        })    
    }

    const addEquacao = () => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Novo Equação', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit eqModelos={eqModelos} sendForm={() => { loadEquacoes(10) }} ref={formRef} projetoId={projeto?.id} styles={stylesForm} redirect={false} />
        })    
    }
    
    const deleteMultModal = () => showModal({ title: 'Deletar Equações', onConfirm: deleteEquacoes, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os equações selecionados' })

    useEffect(() => {
        setFilteredEquacoes(currentEquacoes)
    }, [currentEquacoes, currentPage])

    async function deleteEquacao(id?: string) {
        try {
            await client.delete(`/eq-volume/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadEquacoes()
                        hideModal()
                    } else {
                        alertService.error(message)
                        hideModal()
                    }
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

    const sortEquacoes = async (orderBy?: string) => {
        const paginatedData = {
            currentPage,
            perPage,
            orderBy,
            order: !sorted ? 'desc' : 'asc'
        }

        onPageChanged(paginatedData)
        setSorted(!sorted)
    }

    const handleSelectEquacoes = (evt: any) => {
        const equacaoId = evt.target.value

        if (!checkedEquacoes.includes(equacaoId)) {
            setCheckedEquacoes([...checkedEquacoes, equacaoId])
        } else {
            setCheckedEquacoes(checkedEquacoes.filter((checkedEquacaoId: any) => {
                return checkedEquacaoId !== equacaoId
            }))
        }
    }

    const handleSelectAllEquacoes = () => {
        if (checkedEquacoes.length < currentEquacoes.length) {
            setCheckedEquacoes(currentEquacoes.map(({ id }: any) => id));
        } else {
            setCheckedEquacoes([]);
        }
    };

    const deleteEquacoes = () => {
        try {
            client.delete('/eq-volume/multiples', { data: { ids: checkedEquacoes} })
                .then(() => {
                    alertService.success('As equações foram deletadas com SUCESSO!!!')
                    loadEquacoes()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* {visible && type === 'updateEquacao' ? (<Modal><RegisterForm projetoId={projetoId} userId={userId} styles={stylesButton} redirect={false} /></Modal>) : (<Modal />)} */}
            
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <div>
                    <LinkBack href="/" className="flex flex-col relative left-0 ml-4" />
                </div>
                <h1 className="font-medium text-2xl font-roboto">Equações de Volume</h1>
                
                <button
                // disabled={formState.isSubmitting}
                type="submit"
                className="flex flex-row justify-between group relative w-32 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={addEquacao}
              >
                <span className="flex items-center">
                  <PlusIcon className="h-5 w-5 text-green-200 group-hover:text-green-100" aria-hidden="true" />
                </span>
                <div>Novo</div>
              </button>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm text-gray-900 dark:text-gray-400">por Página</label>
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
                        <div className="w-60 px-4 text-sm">Pesquisar Equação:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Equações"
                                id="search"
                                name="search"
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedEquacoes?.length > 0 && (
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
                                checked={checkedEquacoes?.length === currentEquacoes?.length}
                                onChange={handleSelectAllEquacoes}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEquacoes('nome')}
                        >
                            <div className="flex flex-row items-center">
                                Nome
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEquacoes('expressao')}
                        >
                            <div className="flex flex-row items-center">
                                Expressão
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
                        {filteredEquacoes?.map((equacao: any) => (
                            <tr key={equacao.id}>
                            <td className="flex justify-center">
                            <input                 
                                    value={equacao?.id}
                                    checked={checkedEquacoes.includes(equacao?.id)}
                                    onChange={handleSelectEquacoes}
                                    id="id_equacao"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{equacao?.nome}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{equacao?.expressao}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href="#" onClick={() => updateEquacao(equacao.id)}>
                                <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(equacao.id)}>
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
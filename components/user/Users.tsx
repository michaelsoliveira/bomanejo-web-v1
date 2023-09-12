import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "../../components/Link"
import { Input } from "../../components/atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { UserType } from "types/IUserType"
import { styles, stylesForm } from "../utils/styles"
import { useModalContext } from "contexts/ModalContext"
import { LinkBack } from "../LinkBack"
import { AddEdit } from "./AddEdit"
import React, { createRef } from 'react'
import { UserAddIcon } from '@heroicons/react/solid'
import { ProjetoContext } from "contexts/ProjetoContext"

const Users = ({ currentUsers, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loading, loadUsers, roles }: any) => {
    
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>()
    const { client } = useContext(AuthContext)
    const [sorted, setSorted] = useState(false)
    const [checkedUsers, setCheckedUsers] = useState<any>([])
    const { showModal, hideModal, store } = useModalContext()
    const formRef = createRef<any>()
    const { projeto } = useContext(ProjetoContext)

    useEffect(() => {
        setFilteredUsers(currentUsers)
    }, [currentUsers])
    
    const userById = (id?: string) => {
        return currentUsers.find((user: UserType) => user.id === id)
    }

    const formSubmit = () => {
        formRef.current.handleSubmit()
    }

    const deleteSingleModal = (id?: string) => 
        showModal({ 
            size: 'max-w-lg',
            title: 'Deletar Usuário', 
            onConfirm: () => { deleteUser(id) }, 
            styleButton: styles.redButton, 
            iconType: 'warn', 
            confirmBtn: 'Deletar', 
            content: `Tem Certeza que deseja excluir o Usuário ${userById(id)?.username} ?` 
    })

    const updateUser = (id?: string) => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Editar Usuário', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit roles={roles} sendForm={() => { loadUsers(10) }} ref={formRef} projetoId={projeto?.id} userId={id} styles={stylesForm} redirect={false} />
        })    
    }

    const addUser = () => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Novo Usuário', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit roles={roles} sendForm={() => { loadUsers(10) }} ref={formRef} projetoId={projeto?.id} styles={stylesForm} redirect={false} />
        })    
    }
    
    const deleteMultModal = () => showModal({ title: 'Deletar Usuários', onConfirm: deleteUsers, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os usuário(s) selecionado(s)' })

    async function deleteUser(id?: string) {
        try {
            await client.delete(`/users/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadUsers()
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

    const sortUsers = async (orderBy?: string) => {
        const paginatedData = {
            currentPage,
            perPage,
            orderBy,
            order: !sorted ? 'desc' : 'asc'
        }

        onPageChanged(paginatedData)
        setSorted(!sorted)
    }

    const handleSelectUsers = (evt: any) => {
        const userId = evt.target.value

        if (!checkedUsers.includes(userId)) {
            setCheckedUsers([...checkedUsers, userId])
        } else {
            setCheckedUsers(checkedUsers.filter((checkedUserId: any) => {
                return checkedUserId !== userId
            }))
        }
    }

    const handleSelectAllUsers = () => {
        if (checkedUsers.length < currentUsers.length) {
            setCheckedUsers(currentUsers.map(({ id }: any) => id));
        } else {
            setCheckedUsers([]);
        }
    };

    const deleteUsers = () => {
        try {
            client.delete('/users/multiples', { data: { ids: checkedUsers} })
                .then(() => {
                    alertService.success('Os usuários foram deletadas com SUCESSO!!!')
                    loadUsers()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <div>
                    <LinkBack href="/projeto" className="flex flex-col relative left-0 ml-4" />
                </div>
                <h1 className="font-medium text-2xl font-roboto">Usuários</h1>
                
                <button
                // disabled={formState.isSubmitting}
                type="submit"
                className="flex flex-row justify-between group relative w-32 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={addUser}
              >
                <span className="flex items-center">
                  <UserAddIcon className="h-5 w-5 text-green-200 group-hover:text-green-100" aria-hidden="true" />
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
                        <div className="w-60 px-4 text-sm">Pesquisar Usuário:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Usuários"
                                id="search"
                                name="search"
                                // value={search}
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedUsers?.length > 0 && (
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
                                checked={checkedUsers?.length === currentUsers?.length}
                                onChange={handleSelectAllUsers}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortUsers('user.username')}
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
                            onClick={() => sortUsers('user.email')}
                        >
                            <div className="flex flex-row items-center">
                                Email
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                    
                        </th>
                        <th
                            scope="col"
                            className="w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Perfil
                        </th>
                        <th scope="col" className="relative w-1/12 px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers?.map((user: any) => (
                            <tr key={user.id}>
                            <td className="flex justify-center">
                            <input                 
                                    value={user?.id}
                                    checked={checkedUsers.includes(user?.id)}
                                    onChange={handleSelectUsers}
                                    id="userId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{user?.username}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user?.email}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{user.roles && user.roles.map((role: any) => { return role ? role.name : '' }).join(', ')}</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href="#" onClick={() => updateUser(user.id)}>
                                <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(user.id)}>
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

export default Users

import { OptionType, Select } from '@/components/Select'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '@/components/LinkBack'
import { Link } from '@/components/Link'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { styles } from '../utils/styles'
import { useModalContext } from 'contexts/ModalContext'
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    InboxInIcon,
    UsersIcon,
    CalculatorIcon
} from '@heroicons/react/outline'
import { AddEdit } from './AddEdit'
import { LoadingContext } from 'contexts/LoadingContext'

const Projetos = () => {
    
    const { client } = useContext(AuthContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const { data: session } = useSession()
    const { setLoading } = useContext(LoadingContext)

    const { showModal, hideModal } = useModalContext()

    const deleteSingleModal = () => 
        showModal({ 
            type: 'delete.projeto',
            title: 'Deletar Projeto', 
            onConfirm: () => { deleteProjeto() }, 
            styleButton: styles.redButton, 
            iconType: 'warn', 
            confirmBtn: 'Deletar', 
            content: `Tem Certeza que deseja excluir o Projeto ${projeto?.nome} ?` 
        })

    const editModal = () => showModal({ title: 'Editar Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar', 
    content: <AddEdit reloadData={loadProjetos} data={projeto} /> })
    const addModal = () => {
        showModal({ title: 'Novo Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar', 
        content: <AddEdit reloadData={loadProjetos} /> })
    }

    const loadProjetos = useCallback(async () => {
        setLoading(true)
        if (typeof session !== typeof undefined){
            
            const response = await client.get(`projeto`)
            const { projetos, error, message } = response.data
            
            const { data: { projeto } } = await client.get('/projeto/active/get')
            
            setProjeto(projeto ? projeto : null)
            
            if (error) {
                console.log(message)
            }

            
            setLoading(false)
            
        }
    }, [setLoading, session, client, setProjeto])

    useEffect(() => {
        
        loadProjetos()    
    }, [loadProjetos])

    async function deleteProjeto(){
        await client.put(`/projeto/single/${projeto?.id}`)
        .then((response: any) => {
            const { error, message } = response.data

            if (error) {
                alertService.error(message)
            } else {
                alertService.success(message)
            }
            
            hideModal()
            loadProjetos()
        })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-20 bg-gray-100 my-auto lg:h-[33.3em] h-[24em] p-2">
                
                <div className="relative py-3 w-full max-w-xl mx-auto h-full">
                    <div className='flex flex-row items-center justify-between border border-gray-400 shadow-lg bg-gray-100 py-4 rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            <h1 className='text-xl text-gray-800'>Gerenciar Projeto</h1>
                        </div>
                        <div className='flex items-center justify-center h-8 w-8 mr-4 bg-green-400 rounded-full'>
                        <Link href="#" className="" onClick={addModal}>
                            <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                        </div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm rounded-b-xl border-x border-b border-gray-400">
                    <div className='flex items-center justify-center bg-green-50 hover:bg-green-100 ease duration-300 transition-all py-2 rounded-lg'>
                        <div className='textr-sm inline-block align-bottom'>Projeto Ativo: <span className='font-medium'>{projeto ? projeto?.nome : '<=== Nenhum ===>'}</span></div>
                    </div>
                { projeto && (
                        <div className='flex flex-row items-center justify-between pt-5'>
                            <Link href={`/projeto/detentor`} className="text-center w-auto hover:bg-teal-600 bg-teal-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200">
                                <div className='flex flex-row items-center justify-center space-x-2'>
                                    <PencilIcon className="h-5 w-5" />
                                </div>
                            </Link>

                            <Link href={`/projeto/users`} className="text-center w-auto hover:bg-indigo-600 bg-indigo-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200">
                                <div className='flex flex-row items-center justify-center space-x-2'>
                                    <UsersIcon className="h-5 w-5" />
                                </div>
                            </Link>
                            
                            <Link href="#" className="text-center w-auto hover:bg-red-600 bg-red-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200" onClick={deleteSingleModal}>
                                <div className='flex flex-row items-center justify-center space-x-2'>
                                    <TrashIcon className="h-5 w-5" />
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>              
            </div>
        </div>
    )
}

export default Projetos
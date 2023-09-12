import { Link } from "components/Link"
import alertService from 'services/alert'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import { useContext } from "react"
import { useModalContext } from "contexts/ModalContext"
import { EmpresaType } from "types/IEmpresa"
import { AuthContext } from "contexts/AuthContext"
import { styles } from "../utils/styles"
import { LinkBack } from "../LinkBack"


const ListEmpresas = ({ empresas, isLoading, loadEmpresas, projetoId } : any) => {
    const { client } = useContext(AuthContext)

    const { showModal, hideModal } = useModalContext()

    async function deleteEmpresa(id?: string) {
        try {
            await client.delete(`/detentor/${id}`)
                .then(() => {
                    alertService.success('O detentor foi deletada com SUCESSO!!!')
                    loadEmpresas()
                    hideModal()
                })
            
        } catch (error) {
            console.log(error)
        }       
    }

    const empresaById = (id?: string) => {
        return empresas.find((empresa: EmpresaType) => empresa.id === id)
    }

    const deleteSingleModal = (id?: string) => showModal({ title: 'Deletar UPA', onConfirm: () => { deleteEmpresa(id) }, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem Certeza que deseja excluir a UPA ${empresaById(id)?.razao_social} ?` })


    return (
        <div className="lg:h-[33.3em] h-auto">
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <div>
                    <LinkBack href="/projeto" className="flex flex-col relative left-0 ml-4" />
                </div>
                <h1 className="font-medium text-2xl font-roboto">Empresas</h1>
                <Link
                    href={`/projeto/${projetoId}/detentor/add`}
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {isLoading ? (
                <div className="flex flex-row items-center justify-center h-full">Loading...</div>
            ): (
                <div className="flex flex-col p-6">
                    {empresas?.length ? (
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-auto lg:overflow-hidden border border-gray-400 shadow-lg bg-gray-100 py-4 lg:rounded-t-xl lg:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Razão Social / Nome Fantasia
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Responsável / CREA
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Registro Ambiental
                                </th>
                                
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    CNPJ
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {empresas.map((empresa: any) => (
                                <tr key={empresa.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col items-starter">
                                        
                                        <div className="text-sm font-medium text-gray-900">{empresa.nome}</div>
                                        <div className="text-sm text-gray-500">{empresa.tipo === 'J' &&  empresa.pessoaJuridica?.razao_social }</div>
                                        
                                    </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{empresa.resp_tecnico}</div>
                                    <div className="text-sm text-gray-500">{empresa.crea_resp}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{empresa.cnpj}</div>
                                    </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{empresa.reg_ambiental}</div>
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                    <Link href={`/projeto/${projetoId}/detentor/update/${empresa.id}`}>
                                        <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                    </Link>
                                    <Link href="#" onClick={() => deleteSingleModal(empresa.id)}>
                                        <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                    </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>    
                    ): (
                        <div className="flex flex-col items-center justify-center h-64">
                            <h1 className="font-roboto text-2xl font-medium">Nenhuma Empresa Cadastrada</h1>
                        </div>   
                    )}
            </div>    
            )}
        </div>
    )
}

export default ListEmpresas
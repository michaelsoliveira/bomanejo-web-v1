import { LinkBack } from '../LinkBack'
import CategoriaEspecie from './CategoriaEspecie'

const AddEdit = ({ id }: any) => {
    const isAddMode = !id

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50 text-sm">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto">
                    <div className='flex flex-row items-center justify-between border-x border-t border-gray-400 bg-gray-100 py-4 rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/categoria-especie" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastrar Categoria de Espécies</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar Categoria</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <CategoriaEspecie id={id} />
                </div>
            </div>
        </div>
    )
}

export default AddEdit
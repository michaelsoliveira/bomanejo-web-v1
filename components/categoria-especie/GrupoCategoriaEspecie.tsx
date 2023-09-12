import { useCallback, useContext, useEffect, useState } from "react"
import { LinkBack } from "../LinkBack"
import SelectableRowList from "../utils/SelectableRowList"
import { useAppSelector } from "store/hooks"
import { RootState } from "store"
import { OptionType, Select } from "../Select"
import { ProjetoContext } from "contexts/ProjetoContext"
import { AuthContext } from "contexts/AuthContext"
import { ArrowSmRightIcon } from "@heroicons/react/outline"

const GrupoCategoriaEspecie = () => {
    const [especies, setEspecies] = useState<any>()
    const [especiesCategories, setEspeciesCategories] = useState<any>()
    const [categorias, setCategorias] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedCategoria, setSelectedCategoria] = useState<OptionType>()
    const [novaCategoria, setNovaCategoria] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)
    const catDisponiveis = categorias?.filter((cat: any) => cat.id !== selectedCategoria?.value)
    const { client } = useContext(AuthContext)
    const [especiesResponse, setEspeciesResponse] = useState<any>()

    const loadEspecies = useCallback(async () => {
        const { especies } = await client.get(`/especie?poa=${poa?.id}&order=asc&orderBy=nome`)
        setEspecies(especies)
    }, [client, poa])

    const loadCategorias = useCallback(async () => {
        const { data } = await client.get(`/categoria/grupo`)
        const { categorias } = data
        setCategorias(categorias)
        
    }, [client])

    useEffect(() => {
        loadCategorias()
        loadEspecies()
    }, [loadCategorias, loadEspecies])
    
    function getCategoriasDefaultOptions() {

        const data = categorias?.map((categoria: any, idx: any) => {
            return {
                label: categoria.nome,
                value: categoria.id
            }
        })

        return data
    }

    const setCategoriaEspecies = async () => {
        await client.post(`/especie/categorias/`, { especies: especiesResponse, oldCategory: selectedCategoria?.value, newCategory: novaCategoria?.value })
            .then(async () => {
                const oldCategory = await client.get(`/especie/find-by-categoria?categoriaId=${selectedCategoria?.value}`)
                const { especies } = oldCategory.data
                setEspecies(especies)
                const newCategory = await client.get(`/especie/find-by-categoria?categoriaId=${novaCategoria?.value}`)
                const { especies: newEspecies } = newCategory.data
                setEspeciesCategories(newEspecies)
            })
    }

    function getNovasCategoriasDefaultOptions() {

        const data = catDisponiveis?.map((categoria: any, idx: any) => {
            return {
                label: categoria.nome,
                value: categoria.id
            }
        })

        return data
    }

    const loadCategoriasOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/categoria?nome=${inputValue}&order=asc&orderBy=nome`)
        const data = response.data
        
        callback(data?.map((categoria: any) => ({
            value: categoria.id,
            label: categoria.nome
        })))
    }

    const selectCategoria = async (categoria: any) => {

        setSelectedCategoria(categoria)
        const response = await client.get(`/especie/find-by-categoria?categoriaId=${categoria?.value}`)
        const { especies } = response.data
        setEspecies(especies)
    }

    const selectNovaCategoria = async (categoria: any) => {

        setNovaCategoria(categoria)
        const response = await client.get(`/especie/find-by-categoria?categoriaId=${categoria?.value}`)
        const { especies } = response.data
        setEspeciesCategories(especies)
    }

    const callBackEspecies = async (data: any) => {
        setEspeciesResponse(data)
    }
    
    return (
        <div className="py-6 flex flex-col justify-center sm:py-4 bg-gray-50 px-4">
            <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl '>
                    <div className="px-4">
                        Grupo de Categoria de Espécies
                    </div>
                </div>
                <div className="grid grid-cols-4 lg:grid-cols-4 gap-4 w-full px-4 py-2 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                    <div className="col-span-4 lg:col-span-2">
                        <label className="flex items-center ">Categoria atual das Espécies: </label>
                        <div className="col-span-2 lg:col-span-2">
                            <Select

                                placeholder='Selecione uma Categoria'
                                selectedValue={selectedCategoria}
                                defaultOptions={getCategoriasDefaultOptions()}
                                options={loadCategoriasOptions}
                                callback={selectCategoria}
                                initialData={{
                                    label: 'Entre com as iniciais da Categoria ...', value: ''
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-6 gap-6 w-full items-center justify-center mt-4">
                        <div className="relative col-span-5">
                            <SelectableRowList 
                                data={especies ? especies.map((especie: any) => { return { id: especie.id, label: especie.nome } }) : []} 
                                callBack={callBackEspecies}    
                            />
                        </div>
                        
                            <div 
                                className="flex items-center justify-center bg-gray-300 rounded-full hover:cursor-pointer h-8 w-8 focus:ring-green-200"
                                onClick={setCategoriaEspecies}    
                            >
                                <ArrowSmRightIcon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                    <label className="flex items-center">Nova Categoria de Espécie: </label>
                        <div className="">
                            <Select

                                placeholder='Selecione uma Categoria'
                                selectedValue={novaCategoria}
                                defaultOptions={getNovasCategoriasDefaultOptions()}
                                options={loadCategoriasOptions}
                                callback={selectNovaCategoria}
                                initialData={{
                                    label: 'Entre com as iniciais da Categoria ...', value: ''
                                }}
                            />
                        </div>
                        <div className="py-4">
                            <SelectableRowList 
                                data={especiesCategories ? especiesCategories.map((especie: any) => { return { id: especie.id, label: especie.nome } }) : []} 
                                callBack={callBackEspecies}  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GrupoCategoriaEspecie
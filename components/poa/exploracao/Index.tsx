import { OptionType, Select } from '@/components/Select';
import ListArvore from '@/components/arvore/ListArvore';
import classNames from 'classnames';
import { AuthContext } from 'contexts/AuthContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import alertService from '../../../services/alert'

const Exploracao = ({ ut, loadUts }:any) => {
    const { client } = useContext(AuthContext)
    const [data, setData] = useState<any>()
    const [totais, setTotais] = useState<any>()
    const [especies, setEspecies] = useState<any>([])
    const [inventario, setInventario] = useState<any[]>([])
    const [filteredArvores, setFilteredArvores] = useState<any[]>(inventario)
    const [selectedEspecie, setSelectedEspecie] = useState<any>({ label: 'Todos', value: 'todos' })
    const [sorted, setSorted] = useState(false)
    const [fuste, setFuste] = useState<any>(Number(0))
    const [checkedArvores, setCheckedArvores] = useState<any>([])
    const [volumePreservado, setVolumePreservado] = useState<any>()

    const sortArvores = (sortBy: string) => {
        const sortedBy = sortBy.split(".")
        const nElements = sortedBy.length

        let sortedArvores: any = []        
        const tiposNumericos = ['numero_arvore', 'dap', 'cap', 'fuste', 'area_basal']
        sortedArvores = filteredArvores.sort((a: any, b: any) => {
            if (!tiposNumericos.includes(sortBy)) {
                return sorted ?
                nElements > 1
                ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
            : nElements > 1 
                ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
            } else {
                return sorted ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
            }
        })
        
        setSorted(!sorted)
        setFilteredArvores(sortedArvores)    
    }

    const ajustarInventario = async () => {
        const { data } = await client.post('/poa/inventario', {
            arvores: checkedArvores
        })
        const { error, message } = data

        if (!error) {
            loadInventario()
            loadUts()
            loadData()
            alertService.success(message)
        } else {
            alertService.error(message)
        }
    }

    const loadData = useCallback(async () => {
        const result = await client.get(`/poa/get-volume-ut?ut=${ut?.id_ut}`)
        const { error, data } = result?.data
        setData(data)

        const esp = data.map((e: any) => {
          return {
            id_especie: e.id_especie,
            nome: e.especie
          }
        })
        setEspecies(esp)

        const totEspecies = data.reduce((acc: any, curr: any) => acc + curr.total_especie, 0)
        const totVolCorte = data.reduce((acc: any, curr: any) => acc + curr.volume_corte, 0)
        const totVolCorteHa = data.reduce((acc: any, curr: any) => acc + curr.volume_corte_ha, 0)
        console.log(totVolCorteHa)
        setTotais({
          total_individuos: totEspecies,
          total_corte: totVolCorte,
          total_corte_ha: totVolCorteHa
        })
    }, [client, ut])

    const loadEspecies = async (inputValue: string, callback: (options: OptionType[]) => void) => {
      const data = especies.filter((e: any) => e.nome.includes(inputValue))
      
      callback(data?.map((especie: any) => ({
          value: especie.id_especie,
          label: especie.nome
      })))
  }

    function getEspeciesDefaultOptions() {
        const data = especies?.map((especie: any, idx: any) => {
            return {
                label: especie.nome,
                value: especie.id_especie
            }
        })

        return [{ label: 'Todos', value: 'todos' }].concat(data)
    }

    const loadInventario = useCallback(async () => {
        const res = await client.get(`/poa/get-arvore-especie?order=asc&orderBy=numero_arvore&ut=${ut?.id_ut}`)
        const { error, data: inventario, total } = res
        setInventario(inventario.data)
        const filteredData = 
            selectedEspecie?.value 
                ? selectedEspecie?.value !== 'todos' 
                    ? fuste === 0
                        ? inventario.data?.filter((arvore: any) => arvore?.id_especie === selectedEspecie?.value) 
                        : inventario.data?.filter((arvore: any) => arvore?.id_especie === selectedEspecie?.value && arvore?.fuste === fuste) 
                    : fuste === 0
                        ? inventario.data 
                        : inventario.data?.filter((arvore: any) => arvore?.fuste === fuste)
                : inventario.data 

        setFilteredArvores(filteredData ? filteredData : inventario.data)
    }, [client, ut, setInventario, setFilteredArvores, selectedEspecie, fuste])

    useEffect(() => {
        loadData()
        loadInventario()
    }, [loadInventario, loadData])

    const handleSearch = (especie?: any) => {
        const filteredData = especie.value !== 'todos' ? inventario.filter((arvore: any) => {
            return fuste === 0 ? arvore?.id_especie === especie.value : arvore?.id_especie === especie.value && arvore?.fuste === fuste
        }) : fuste === 0 ? inventario : inventario.filter((arvore: any) => arvore?.fuste === fuste)
        setFilteredArvores(filteredData)
    }

    const selectEspecie = (especie: any) => {
        setSelectedEspecie(especie)
        handleSearch(especie)
    }

    const callBack = async (data: any) => {
        const selecionados = filteredArvores.filter((arv: any) => data.includes(arv?.id))
        const volumeSomado = selecionados.reduce((acc: any, curr: any) => acc + Number(curr.volume), 0)

        setVolumePreservado({
            total: Number(totais.total_corte - volumeSomado),
            area_util: Number(totais.total_corte - volumeSomado)/ut?.area_util
        })
        setCheckedArvores(data)
    }

    const filterByFuste = (e: any) => {
        setFuste(Number(e.target.value))
        const filteredData = 
            selectedEspecie && selectedEspecie?.value !== 'todos' 
            ? e.target.value === '0'
                ? inventario.filter((arvore: any) => arvore?.id_especie === selectedEspecie?.value) 
                : inventario.filter((arvore: any) => arvore?.id_especie === selectedEspecie?.value && arvore?.fuste === Number(e.target.value)) 
            : e.target.value === '0'
                ? inventario 
                : inventario.filter((arvore: any) => arvore?.fuste === Number(e.target.value))

        setFilteredArvores(filteredData)
    }

    return (
        <>
        <div className="border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Resumo</span>
            <div className='flex flex-col md:flex-row space-x-2'>
                <div className='w-full h-64 overflow-y-auto'>
                <table className="min-w-full divide-y divide-gray-200 w-full">
                    <thead className="bg-gray-50 w-full sticky top-0">
                        <tr>
                            <th
                                scope="col"
                                className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500"
                            >
                                <div className="flex flex-row justify-between">
                                    Indivíduos
                                </div>                 
                            </th>
                            <th
                                scope="col"
                                className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500"
                            >
                                <div className="flex flex-row justify-between">
                                    Total - Corte
                                </div>   
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                            >
                                <div className="flex flex-row justify-between">
                                    Volume - Corte
                                </div>   
                            </th>
                            <th
                                scope="col"
                                className="py-3 text-left text-xs font-medium text-gray-500"
                            >
                                <div className="flex flex-row">
                                    Volume - Corte (m<sup>3</sup>/ha)
                                </div>   
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-300 w-full h-48 overflow-y-auto" style={{height: '50vh'}}>
                        {data?.map((especie: any) => (
                            <tr key={especie.id_especie}
                            >
                                <td className="px-3 whitespace-nowrap">
                                    <div className="text-sm">{especie?.especie}</div>
                                </td>
                                <td className="px-3 whitespace-nowrap">
                                <span className="text-sm">
                                    <div className="text-sm">{especie?.total_especie}</div>
                                </span>
                                </td>
                                <td className="px-3 whitespace-nowrap">
                                    <span className="text-sm">
                                        <div className="text-sm">{especie?.volume_corte.toFixed(4)}</div>
                                    </span>
                                </td>
                                <td className="px-3 whitespace-nowrap">
                                    <span className="text-sm">
                                        <div className="text-sm">{especie?.volume_corte_ha.toFixed(4)}</div>
                                    </span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                    
                <tfoot className='sticky bottom-0 bg-gray-200'>
                    <tr className='px-2'>
                    <td scope="col"
                        className="justify-between items-center text-left text-xs font-medium text-gray-500">
                        <span className="text-sm">
                            <div className="text-sm">Total: </div>
                        </span>
                    </td>
                    <td className="px-3 whitespace-nowrap px-4">
                        <span className="text-sm">
                            <div className="text-sm">{totais?.total_individuos}</div>
                        </span>
                    </td>
                    <td className="px-3 whitespace-nowrap">
                        <span className="text-sm">
                            <div className="text-sm">{totais?.total_corte.toFixed(4)}</div>
                        </span>
                    </td>
                    <td className="px-3 whitespace-nowrap">
                        <span className="text-sm">
                            <div className="text-sm">{totais?.total_corte_ha.toFixed(4)}</div>
                        </span>
                    </td>
                </tr>

                </tfoot>
                </table>
                </div>
            </div>
        </div>
        <div className="border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Ajuste da UT</span>
            <div className='flex flex-col lg:flex-row'>
                <div className="lg:flex lg:flex-wrap lg:w-4/5 px-4">
                    <span className="w-3/12 flex items-center">Espécie: </span>
                    <div className="lg:w-3/4">
                        <Select

                            placeholder='Selecione uma Espécie'
                            selectedValue={selectedEspecie}
                            defaultOptions={getEspeciesDefaultOptions()}
                            options={loadEspecies}
                            callback={selectEspecie}
                            initialData={{
                                label: 'Entre com as iniciais da Espécie ...', value: ''
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row px-4 w-auto lg:items-center lg:space-x-4">
                    <div>
                        <label htmlFor="perPage" className="px-1 text-sm">Fuste</label>
                    </div>
                    <select
                        value={fuste}
                        onChange={filterByFuste}
                        id="fuste" 
                        className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="0">Todos</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className='flex flex-row w-full items-center justify-center'>
                    <button
                        disabled={checkedArvores.length === 0}
                        onClick={ajustarInventario}
                        className={classNames("px-6 py-2 bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white items-center text-center",
                            checkedArvores.length === 0 && "hover:cursor-not-allowed opacity-50"
                        )}
                    >
                        Executar Operação
                    </button>
                </div>
            </div>
            <div>
                <ListArvore 
                    currentArvores={filteredArvores}
                    sortArvores={sortArvores}
                    sorted={sorted} 
                    planejar
                    callBack={callBack}
                />
            </div>            
        </div>
        { volumePreservado && (
            <div className='mt-2'>
                <div className='flex flex-col w-full items-center justify-center'>
                    <span className='font-medium'>
                        Volume Total: {volumePreservado?.total.toFixed(4)}
                    </span>
                    <span className='font-medium'>
                        Volume / ha: {volumePreservado?.area_util.toFixed(4)}
                    </span>
                </div>
            </div>
        ) }
        </>
    );
};

export default Exploracao;
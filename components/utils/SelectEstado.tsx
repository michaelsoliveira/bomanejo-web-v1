import { AuthContext } from "contexts/AuthContext"
import { useSession } from "next-auth/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { OptionType, Select } from "../Select"

type SelectEstado = {
    callback: (data?: any) => void;
    value: any;
}

const SelectEstado = ({ callback, value } : SelectEstado) => {
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const [estados, setEstados] = useState<any>()

    const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/estado/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((estado: any) => ({
            value: estado.id,
            label: estado.nome
        })))
    }

    function getEstadosDefaultOptions() {
        return estados?.map((estado: any) => {
            return {
                label: estado.nome,
                value: estado.id
            }
        })
    }

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const response = await client.get(`/estado?orderBy=nome&order=asc`)
                const { estados } = response.data

                setEstados(estados)
            }
        }

        defaultOptions()  
    }, [session, client, value])

    return (<div>
        <Select
            initialData={
                {
                    label: 'Selecione um Estado',
                    value: ''
                }
            }
            placeholder='Selecione um Estado'
            selectedValue={value}
            defaultOptions={getEstadosDefaultOptions()}
            options={loadOptions}
            label="Estado"
            callback={callback}
        />
        </div>
        
    )
}

export default SelectEstado
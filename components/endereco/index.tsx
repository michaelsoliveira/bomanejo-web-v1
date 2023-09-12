import { useState } from "react"
import { OptionType } from "../Select"
import SelectEstado from "../utils/SelectEstado"
import { FormInput } from "../FormInput"

const Endereco = ({register, value, setValue, errors}: any) => {
    const [estado, setEstado] = useState<OptionType>()

    const selectedEstado = (data: any) => {
        setValue('endereco.id_estado', data?.value)
        setEstado(data)
    }

    return (<div className="grid grid-cols-6 gap-4">
    <div className="col-span-4 md:col-span-6 w-48">     
        <FormInput
            name="endereco.cep"
            label="CEP"
            register={register}
            errors={errors}
            id="cep"
            className="pb-4"
        />
    </div> 
    <div className="col-span-6 md:col-span-3">     
        <FormInput
            name="endereco.logradouro"
            label="Localidade"
            register={register}
            errors={errors}
            id="localidade"
            className="pb-4"
        />
    </div> 
    <div className="col-span-6 md:col-span-3">     
        <FormInput
            name="endereco.bairro"
            label="Complemento"
            register={register}
            errors={errors}
            id="bairro"
            className="pb-4"
        />
    </div> 
    <div className="col-span-4 md:col-span-4">     
        <FormInput
            name="endereco.municipio"
            label="Município"
            register={register}
            errors={errors}
            id="municipio"
            className="pb-4"
        />
    </div>
    <div className="col-span-2 md:col-span-2 pt-1 relative">
        <SelectEstado value={estado?.value ? estado : value} callback={selectedEstado} />
    </div> 
</div>)
}

export default Endereco
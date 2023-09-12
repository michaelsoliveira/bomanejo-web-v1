import { FormInput } from "../FormInput"

const PessoaFisica = ({register, errors}: any) => {
    return (<div className="grid grid-cols-6 gap-4">
                <div className="col-span-6 md:col-span-4">     
                    <FormInput
                        name="pessoaFisica.nome"
                        label="Nome"
                        register={register}
                        errors={errors}
                        rules={ {required: 'O campo nome é obrigatório'} }
                        id="nome"
                        className="pb-4"
                    />
                </div> 
                <div className="col-span-3 md:col-span-1">     
                    <FormInput
                        name="pessoaFisica.rg"
                        label="RG"
                        register={register}
                        errors={errors}
                        id="rg"
                        className="pb-4"
                    />
                </div> 
                <div className="col-span-3 md:col-span-1">     
                    <FormInput
                        name="pessoaFisica.cpf"
                        label="CPF"
                        register={register}
                        errors={errors}
                        id="cpf"
                        className="pb-4"
                    />
                </div> 
        </div>)
}

export default PessoaFisica
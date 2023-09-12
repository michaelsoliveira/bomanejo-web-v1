import { FormInput } from "../FormInput"

const PessoaJuridica = ({register, errors}: any) => {
    return (<div className="grid grid-cols-6 gap-4">
                <div className="col-span-6 md:col-span-3">
                    <FormInput
                        name="pessoaJuridica.razao_social"
                        label="Razão Social"
                        register={register}
                        errors={errors}
                        rules={ {required: 'O campo razão social é obrigatório'} }
                        id="nome"
                        className="pb-4"
                    />
                </div>   
                <div className="col-span-6 md:col-span-3">
                    <FormInput
                        name="pessoaJuridica.nome_fantasia"
                        label="Nome Fantasia"
                        register={register}
                        errors={errors}
                        id="nome"
                        className="pb-4"
                    />
                </div>    
                <div className="col-span-3 md:col-span-2">
                    <FormInput
                        name="pessoaJuridica.cnpj"
                        label="CNPJ"
                        register={register}
                        errors={errors}
                        id="cpnj"
                        className="pb-4"
                    />
                </div>   
                <div className="col-span-3 md:col-span-2">
                    <FormInput
                        name="pessoaJuridica.inscricao_estadual"
                        label="Inscrição Estadual"
                        register={register}
                        errors={errors}
                        id="inscricao_estadual"
                        className="pb-4"
                    />
                </div> 
                <div className="col-span-3 md:col-span-2">
                    <FormInput
                        name="pessoaJuridica.inscricao_federal"
                        label="Inscrição Federal"
                        register={register}
                        errors={errors}
                        id="inscricao_federal"
                        className="pb-4"
                    />
                </div> 
            </div>
        )
}

export default PessoaJuridica
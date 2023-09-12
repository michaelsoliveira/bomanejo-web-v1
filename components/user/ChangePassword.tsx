import { useContext } from "react"
import { useForm } from "react-hook-form"
import { FormInput } from '../FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'
import alertService from "../../services/alert"
import { useRouter } from "next/router"

export const ChangePassword = function ChangePassword() {
    const { client } = useContext(AuthContext)
    const router = useRouter()

    const onSubmit = async (data: any) => {
        const { oldPassword, newPassword } = data
        await client.post('/users/change-password', { oldPassword, newPassword })
            .then((response: any) => {
                const { message, error } = response.data
                if (!error) {
                    alertService.success(message)
                    router.push('/')
                } else {
                    alertService.error(message)
                }
                
            })
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Senha anterior é obrigatório'),
        newPassword: Yup.string()
            .required('Nova senha é obrigatório')
            .min(4, 'Senha deve ter no minímo 4 caracteres'),
        confirmPassword: Yup.string()
            .required('Cofirmação da senha é obrigatório')
            .oneOf([Yup.ref('newPassword')], 'Confirmação da senha não corresponde')
    })

    const validationOptions = { resolver: yupResolver(validationSchema) }

    const { handleSubmit, register, formState: { errors } } = useForm(validationOptions)
    return (
        <div className="flex flex-col items-center justify-between py-6 rounded-md bg-gray-100">
            <div className="relative py-3 w-11/12 max-w-xl sm:mx-auto">
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            
                            <FormInput
                                name="oldPassword"
                                label="Senha Atual"
                                register={register}
                                errors={errors}
                                type="password"
                                // rules={ {required: 'O campo nome é obrigatório'} }
                                // hasError={!!errors.nome}
                                // errorMessage={errors.nome?.message}
                                // forwardRef={inputNome}
                                id="nome"
                                className="pb-4"
                            />
                            <FormInput
                                id="newPassword"
                                name="newPassword"
                                label="Nova Senha"
                                register={register}
                                errors={errors}
                                type="password"
                                // rules={
                                //     {
                                //         minLength: {
                                //             value: 3,
                                //             message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                //         }
                                //     }}
                                className="pb-4"
                            />
                            <FormInput
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirmação"
                                register={register}
                                errors={errors}
                                type="password"
                                // rules={
                                //     {
                                //         minLength: {
                                //             value: 3,
                                //             message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                //         }
                                //     }}
                                className="pb-4"
                            />

                            {/* <div className='pb-4'>
                                <Select label="Categoria" value={ selectedCategoria } />
                            </div> */}
                            
                            <button className="w-full bg-green-600 text-white p-3 rounded-md">Salvar</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, forwardRef , useState } from 'react'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import alertService from '../../services/alert'
import { AuthContext } from 'contexts/AuthContext';
import FocusError from '../form/FocusError';
import { ListEqModelo } from './ListEqModelo';

type AddEditType = {
    styles?: any;
    equacaoId?: string;
    redirect?: boolean
    projetoId?: string;
    sendForm?: any;
    eqModelos?: any[];
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, equacaoId, sendForm, projetoId, eqModelos }, 
      ref
    ) {
        const isAddMode = !equacaoId
        const { client } = useContext(AuthContext)

        const validationSchema = Yup.object().shape({
            isAddMode: Yup.boolean(),
            nome: Yup.string()
                    .test(
                    "len",
                    "O nome tem que ter entre 3 e 40 caracteres.",
                    (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 40
                )
                .required("Campo obrigatório!"),
            expressao: Yup.string()
                    .test(
                        "len",
                        "A expressão tem que ter entre 3 e 200 caracteres.",
                        (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 200
                    )
                    .required("Campo obrigatório!")
            });

        async function handleRegister(data: any) {
            if (isAddMode) {
                await client.post(`/eq-volume`, data)
                    .then((response: any) => {
                        const { error, message } = response.data
                        
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            sendForm()
                            // hideModal()
                        }
                    })
            } else {
                await client.put(`/eq-volume/${equacaoId}`, data)
                    .then((response: any) => {
                        const { error, message } = response.data
                        
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            sendForm()
                        }
                    })
            }    
        }

        interface Values {
            nome: string;
            expressao: string;
            observacao: string;
            isAddMode: boolean;
            id_projeto: string;
        }
        
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        nome: '',
                        expressao: '',
                        observacao: '',
                        isAddMode,
                        id_projeto: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleRegister(values)
                    }}
                >
                    {({ errors, touched, isSubmitting, setValues, setFieldValue, setFieldTouched, setTouched, values }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const loadEquacao = useCallback(async () => {
                            if (!isAddMode) {
                                await client.get(`/eq-volume/${equacaoId}`)
                                    .then(({ data }: any) => {
                                        const fields = ['nome', 'expressao', 'observacao'];
                                        fields.forEach(field => {
                                            if (!!data[field]) setFieldValue(field, data[field], false)
                                        });
                                    });
                            }
                        }, [setFieldValue])

                        function callback(data?: any) {
                            setFieldValue('expressao', data?.expressao)
                        }

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            setFieldValue('id_projeto', projetoId)
                            loadEquacao()
                        }, [loadEquacao, setFieldValue]);
                        
                        return (
                            <div className="flex flex-col justify-center w-full">
                                <div className="relative h-full mx-0">
                                    <div className="relative pt-3 px-4 w-full">
                                        <div className='w-full'>
                                            <span className="text-md font-bold mb-2">Equações Modelo</span>
                                            <div>
                                                <ListEqModelo items={eqModelos} callback={callback} />
                                            </div>
                                        </div>
                                        <Form>
                                       
                                 <div className='flex flex-col'>
                                    <div>
                                        <label className={styles.label} htmlFor="nome">Nome</label>
                                        <Field 
                                            className={styles.field} 
                                            id="nome" 
                                            name="nome" 
                                            placeholder="Nome da Equação" />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="nome" component="div" />
                                    </div>
                                    <div>
                                        <label className={styles.label} htmlFor="expressao">Expressão</label>
                                        <Field
                                            className={styles.field}
                                            id="expressao"
                                            name="expressao"
                                            placeholder="0.7 * (3.141592 * (DAP ^ 2) / 40000 ) * ALTURA ..."
                                        />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="expressao" component="div" />
                                    </div>
                                    <div>
                                        <label className={styles.label} htmlFor="observacao">Observação</label>
                                        <Field
                                            component="textarea"
                                            className={styles.field}
                                            id="observacao"
                                            name="observacao"
                                        />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="observacao" component="div" />
                                    </div>
                            </div>
                            <FocusError />
                        </Form>
                    </div>
                </div>
            </div>)}}
        </Formik>
        </div>
    )
})
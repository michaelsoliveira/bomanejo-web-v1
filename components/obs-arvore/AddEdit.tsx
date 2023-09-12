import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, forwardRef , useState } from 'react'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import alertService from '../../services/alert'
import { AuthContext } from 'contexts/AuthContext';
import FocusError from '../form/FocusError';

type AddEditType = {
    styles?: any;
    obsId?: string;
    redirect?: boolean
    projetoId?: string;
    sendForm?: any;
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, obsId, sendForm }, 
      ref
    ) {
        const isAddMode = !obsId
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
                .required("Campo obrigatório!")
            });

        async function handleRegister(data: any) {
            if (isAddMode) {
                await client.post(`/obs-arvore`, data)
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
                await client.put(`/obs-arvore/${obsId}`, data)
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
            preservar: boolean;
        }
        
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        nome: '',
                        preservar: false
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleRegister(values)
                    }}
                >
                    {({ setFieldValue }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const loadObs = useCallback(async () => {
                            if (!isAddMode) {
                                await client.get(`/obs-arvore/${obsId}`)
                                    .then(({ data }: any) => {
                                        const fields = ['nome', 'preservar'];
                                        fields.forEach(field => {
                                            if (!!data[field]) setFieldValue(field, data[field], false)
                                        });
                                    });
                            }
                        }, [setFieldValue])

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            loadObs()
                        }, [loadObs]);
                        
                        return (
                            <div className="flex flex-col justify-center w-full">
                                <div className="relative h-full mx-0">
                                    <div className="relative pt-3 px-4 w-full">
                                        <Form>
                                       
                                        <div className='flex flex-col'>
                                            <div>
                                                <label className={styles.label} htmlFor="nome">Nome</label>
                                                <Field 
                                                    className={styles.field} 
                                                    id="nome" 
                                                    name="nome" 
                                                    placeholder="Nome da Observação" />
                                                <ErrorMessage className='text-sm text-red-500 mt-1' name="nome" component="div" />
                                            </div>
                                            <div>
                                            <label className={styles.label} htmlFor="preservar">Remanescente não substituível?</label>
                                            <Field 
                                                id="preservar" 
                                                name="preservar" 
                                                type="checkbox"
                                            />
                                            <ErrorMessage className='text-sm text-red-500 mt-1' name="preservar" component="div" />
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
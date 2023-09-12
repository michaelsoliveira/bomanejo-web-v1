import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, useState, forwardRef } from 'react'
import alertService from '../../services/alert'
import { AuthContext } from 'contexts/AuthContext'
import { useModalContext } from 'contexts/ModalContext'
import { OptionType, Select } from '../Select'
import { useSession } from 'next-auth/react'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup'
import { setPoa } from 'store/poaSlice';
import { RootState } from 'store';

type ChangeActiveType = {
    callback?: any;
}

export const ChangeActive = forwardRef<any, ChangeActiveType>(
    function ChangeActive({ callback }, ref) {
        const { client } = useContext(AuthContext)
        const { hideModal } = useModalContext()
        const { data: session } = useSession()
        const [selectedPoa, setSelectedPoa] = useState<any>()
        const [poas, setPoas] = useState<any>()
        const { projeto, setProjeto } = useContext(ProjetoContext)
        const dispath = useAppDispatch()
        const poa = useAppSelector((state: RootState) => state.poa)

        const loadPoas = useCallback(async () => {
            if (typeof session !== typeof undefined){
                
                const response = await client.get(`/poa`)
                const { poas, error, message } = response.data
                
                const { data: { poa } } = await client.get('/poa/active/get')
                
                if (poa) {
                    dispath(
                        setPoa({
                            id: poa?.id,
                            descricao: poa?.descricao,
                            data_ultimo_plan: poa?.data_ultimo_plan,
                            pmfs: poa?.pmfs
                        })
                    )
                } else {
                    dispath(
                        setPoa({
                            id: '',
                            descricao: 'Padrão',
                            data_ultimo_plan: null,
                            pmfs: ''
                        })
                    )
                }

                setPoas([{ descricao: 'Padrão', id: '' }, ...poas])
                if (poa) {
                    setSelectedPoa({
                        label: poa?.descricao,
                        value: poa?.id
                    })
                } else {
                    setSelectedPoa({
                        label: 'Padrão',
                        value: ''
                    })
                }
                
                if (error) {
                    console.log(message)
                }
                
            }
        }, [session, client, dispath])

        useEffect(() => {
            let isLoaded = false
            if (!isLoaded) {
                loadPoas()
                    .then(() => {
                        isLoaded = true
                    })
            }

            return () => {
                isLoaded = false
            }
        }, [loadPoas])

        const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/poa?search=${inputValue}&order=asc&orderBy=descricao`)
            const json = response.data
            
            callback(json?.map((poa: any) => ({
                value: poa.id,
                label: poa.nome
            })))
        };

        function getPoasDefaultOptions() {
            return poas?.map((poa: any) => {
                return {
                    label: poa.descricao,
                    value: poa.id
                }
            })
        }

        async function handleSubmit(dataRequest: any) {

            const { data } = await client.post(`/poa/active`, { poaId: dataRequest?.poa.value })
            const { poa } = data
            if (poa) {
                dispath(setPoa({
                    id: poa?.id,
                    descricao: poa?.descricao,
                    data_ultimo_plan: poa?.data_ultimo_plan,
                    pmfs: poa?.pmfs
                }))
            } else {
                dispath(setPoa({
                    id: '',
                    descricao: 'Padrão',
                    data_ultimo_plan: null,
                    pmfs: ''
                }))
            }

            hideModal()
        }

        const validationSchema = Yup.object().shape({
            poa: Yup.array().nullable()
        })

        interface Values {
            poa: any
        }
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        poa: {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleSubmit(values)
                    }}
                >
                    {({ setFieldValue }) => {

                        return (
                            <div className="relative py-3 w-full max-w-xl mx-auto h-full">
                                <div className='pb-4'>
                                    <Field name="poa">
                                        {() => (
                                            <Select
                                                placeholder='Entre com as iniciais...'
                                                selectedValue={selectedPoa}
                                                defaultOptions={getPoasDefaultOptions()}
                                                options={loadOptions}
                                                callback={(data) =>{ 
                                                    setSelectedPoa(data) 
                                                    setFieldValue('poa', data)
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <span className='font-semibold'>Poa Ativo: { poa?.descricao ? poa?.descricao : selectedPoa?.descricao }</span>
                                </div>
                            </div>
                            )
                }}
            </Formik>
            </div>
        )
})


export default ChangeActive
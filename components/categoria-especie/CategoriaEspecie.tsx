import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from 'services/alert'
import { AuthContext } from 'contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { useAppSelector } from 'store/hooks'
import { RootState } from 'store'
import { useModalContext } from 'contexts/ModalContext'
import classNames from 'classnames'

type CategoriaEspecie = {
    id: string;
    isModal? : boolean;
    loadCategorias: any
}

const CategoriaEspecie = forwardRef<any, any>(
    function AddEdit(
      { id, isModal, loadCategorias } : CategoriaEspecie, 
      ref
    ) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id
    const { projeto } = useContext(ProjetoContext)
    const poa = useAppSelector((state: RootState) => state.poa)
    const { showModal, hideModal, store } = useModalContext()
    const [fuste, setFuste] = useState(1)

    useEffect(() => {        
        async function loadCategoria() {
        
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: categoria } = await client.get(`/categoria/${id}`)
                setFuste(categoria?.criterio_fuste)
                for (const [key, value] of Object.entries(categoria)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })
                }
            }
        }
        
        loadCategoria()

    }, [session, isAddMode, client, id, setValue])

    async function onSubmit(data: any) {
        const preparedData = { ...data, id_projeto: projeto?.id, id_poa: poa.id, criterio_fuste: fuste }
        try {
            return isAddMode
                ? createCategoria(preparedData)
                : updateCategoria(id, preparedData)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createCategoria(data: any) {
        try {
            client.post('categoria', data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    if (!isModal) router.push('/categoria-especie')
                   
                } else {
                    alertService.error(message)
                }
            }).catch((error: any) => {
                alertService.error(error)
            })
        } catch(e) {
            console.log(e)
        }
    }

    async function updateCategoria(id: string, data: any) {
        
        client.put(`/categoria/${id}`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    if (!isModal) { 
                        router.push('/categoria-especie') 
                    } else {
                        loadCategorias()
                        hideModal()
                    }
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div className={
            classNames(
                !isModal && 'shadow-sm border border-gray-400 rounded-b-xl',
                'relative p-8 bg-white'
            )}>
            <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
                <div className='w-full'>
                    <FormInput
                        name="nome"
                        label="Nome"
                        register={register}
                        errors={errors}
                        rules={
                            {
                                required: 'O campo nome é obrigatório',
                                minLength: {
                                    value: 3,
                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                }
                            }
                        }
                        id="nome"
                        className="pb-4"
                    />
                </div>
                <div className='flex flex-col md:flex-row space-x-0 md:space-x-4'>
                    <div className="flex flex-col w-auto pt-2">
                        <div>
                            <label htmlFor="perPage" className="px-1 text-sm">Fuste</label>
                        </div>
                        <select
                            value={fuste}
                            onChange={(e) => setFuste(Number(e.target.value))}
                            id="fuste" 
                            className="w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="1">1</option>
                            <option value="2">1, 2</option>
                            <option value="3">1, 2 e 3</option>
                        </select>
                    </div>
                    <div>
                        <FormInput
                            id="criterio_dminc"
                            name="criterio_dminc"
                            label="Diâmetro Minímo"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4"
                        />
                    </div>
                    <div>
                        <FormInput
                            id="criterio_dmaxc"
                            name="criterio_dmaxc"
                            label="Diâmetro Máximo"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4"
                        />
                    </div>
                </div>  
                <div className='flex flex-col md:flex-row space-x-0 md:space-x-4'>
                    <div>
                        <FormInput
                            id="criterio_n_min"
                            name="criterio_n_min"
                            label="Mínimo / 100ha"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4"
                        />
                    </div>
                    <div>
                        <FormInput
                            id="criterio_perc_min"
                            name="criterio_perc_min"
                            label="Percentual Explorável"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4"
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between md:justify-start space-x-4 md:space-x-4'>
                    <div>
                        <FormInput
                            id="criterio_altura"
                            name="criterio_altura"
                            label="Altura máxima da árvore"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4 w-full"
                        />
                    </div>
                    <div>
                        <FormInput
                            id="criterio_volume"
                            name="criterio_volume"
                            label="Vol. máximo da árvore"
                            type="number"
                            register={register}
                            errors={errors}
                            rules={
                                {
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Por favor entre com um valor numérico'
                                    }
                                }}
                            className="pb-4"
                        />
                    </div>
                </div>
                <div className="flex justify-starter py-4">
                <input  
                    // checked={checkedEspecies?.length === currentEspecies?.length}
                    // onChange={handleSelectAllEspecies}   
                    {...register('preservar')}    
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="preservar"
                /> Remanescente ?
                </div>
                { (!isModal) && (
                    <div className='flex items-center justify-between pt-4'>
                        <Link href="/categoria-especie" className="text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md">Voltar</Link>
                        <button className="w-2/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                    </div>
                ) }
            </form>
        </div>
    )
})

export default CategoriaEspecie
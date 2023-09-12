import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import { setUt } from "../../store/utSlice"
import Map from '../maps/Map'
import { useJsApiLoader } from '@react-google-maps/api'

export const libraries = String(['places', 'geometry', 'drawing'])

type LatLngLiteral = google.maps.LatLngLiteral;

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { client } = useContext(AuthContext)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [arvores, setArvores] = useState<any>([])
    const { data: session } = useSession()
    const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral | null>(null)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAddMode = !id
    const [polygonPath, setPolygonPath] = useState<any>([])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        [libraries]: libraries
    })

    const callBackPolygon = (data: Array<LatLngLiteral>) => {
        setPolygonPath(data)
    }

    useEffect(() => {        
        async function loadUt() {
            
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: ut } = await client.get(`/ut/${id}`)
                const polygon_path = ut.polygon_path?.length > 0 ? JSON.parse(ut.polygon_path)?.coordinates[0].map((polygon: any) => {
                    return {
                        lat: polygon[1],
                        lng: polygon[0]
                    }
                }) : []

                const polygonValues = polygon_path.map((poly: any) => {
                    return {
                        lat: poly.lat, lng: poly.lng
                    }
                })

                for (const [key, value] of Object.entries(ut)) {
                    switch(key) {
                        case 'upa': setValue('upa', ut?.id_upa);
                        break;
                        case 'polygon_path': polygon_path.map((poly: any) => {
                            setPolygonPath(polygonValues)
                        })
                        break;
                        default: {
                            setValue(key, value, {
                                shouldValidate: true,
                                shouldDirty: true
                            })
                        }
                    }
                }
                const { data } = await client.get(`/arvore/get-all?utId=${id}`)
                const arvores = data.arvores?.map(({ lat, lng }: any) => {
                    return {
                        lat,
                        lng
                    }
                })

                setArvores(arvores)
            }
        }

        loadUt()

    }, [session, isAddMode, client, id, setValue, upa, setArvores])

    async function onSubmit(data: any) {
        try {
            console.log(data)
            return isAddMode
                ? createUt({...data, polygon_path: polygonPath})
                : updateUt(id, {...data, polygon_path: polygonPath})
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createUt(data: any) {
        await client.post('ut', {
            id_upa: upa.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, ut } = response.data
                if (!error) {
                    dispatch(setUt({
                        id: ut.id,
                        numero_ut: ut.numero_ut,
                    }))
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function setLocation(location: any) {
        setUtLocation(location)
        setValue('latitude', location.lat)
        setValue('longitude', location.lng)
    }

    async function updateUt(id: string, data: any) {
        
        await client.put(`/ut/${id}`, {
            id_upa: upa.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, ut } = response.data
                if (!error) {
                    dispatch(setUt({
                        id: ut.id,
                        numero_ut: ut.numero_ut,
                    }))
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="text-sm py-4 justify-center sm:py-12 bg-gray-50">                
                <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/ut" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar UT</h1>
                            ): (
                                <h1 className='text-xl'>Editar UT</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative border border-gray-400 p-4 rounded-md">
                                <span className="text-gray-700 absolute -top-3 bg-white px-2">Dados básicos da UT</span>
                                    <div className='w-1/2'>
                                        <FormInput
                                            name="numero_ut"
                                            label="Número UT"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="numero_ut"
                                            className="pb-4"
                                        />
                                    </div>
                                    <div className='flex flex-col lg:flex-row lg:space-x-4'>
                                    <div>
                                        <FormInput
                                            name="area_util"
                                            label="Área Útil"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="area_util"
                                            className="pb-4"
                                        />
                                    </div>
                                    <div>
                                        <FormInput
                                            name="area_total"
                                            label="Área Total"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="area_total"
                                            className="pb-4"
                                        />
                                    </div>
                                </div>
                            </div>  
                            {
                                (upa.tipo === 1) &&
                                (<>
                                    <div className="relative border border-gray-400 p-4 rounded-md">
                                        <span className="text-gray-700 absolute -top-3 bg-white px-2">Faixas</span>
                                        <div className="flex flex-col lg:flex-wrap">
                                            <FormInput
                                                name="quantidade_faixas"
                                                label="Quantidade"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="quantidade_faixas"
                                                className="pb-4"
                                            />
                                            <FormInput
                                                name="largura_faixas"
                                                label="Largura"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="largura_faixas"
                                                className="pb-4"
                                            />
                                            <FormInput
                                                name="comprimento_faixas"
                                                label="Comprimento"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="comprimento_faixas"
                                                className="pb-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="border border-gray-400 p-4 mt-4 rounded-md">
                                <span className="text-gray-700 block -mt-7 bg-white w-[7.5em] pb-1 px-2">Coordenadas</span>
                                    <div className="flex flex-col">
                                        <FormInput
                                            id="latitude"
                                            name="latitude"
                                            label="Latitude"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            className="pb-4"
                                            step="any"
                                        />
                                    
                                        <FormInput
                                            id="longitude"
                                            name="longitude"
                                            label="Longitude"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            className="pb-4"
                                            step="any"
                                        />
                                        <div className='w-full lg:w-1/3'>
                                            <FormInput
                                                name="azimute"
                                                label="Azimute"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="azimute"
                                                className="pb-4"
                                            />
                                        </div>
                                        <div className='w-full lg:w-1/3'>
                                            <FormInput
                                                name="quadrante"
                                                label="Quadrante"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="quadrante"
                                                className="pb-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                                </>)
                            }
                            <div className="col-span-2 relative border border-gray-400 p-4 rounded-md mt-6">
                                <span className="text-gray-700 absolute -top-3 bg-white px-2">Localização da UT</span>
                                <div className='flex flex-row items-center mx-auto'>
                                    {
                                        (!isLoaded) ? <div>Loading...</div> : 
                                        (
                                            <Map 
                                                setLocation={setLocation}
                                                arvores={arvores}
                                                callBackPolygon={callBackPolygon}
                                                polygonPath={polygonPath}
                                                shapeText='Definir área da UT'
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/ut" className="text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit
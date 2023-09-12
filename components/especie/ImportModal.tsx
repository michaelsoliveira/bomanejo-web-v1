import { AuthContext } from "contexts/AuthContext"
import { LoadingContext } from "contexts/LoadingContext"
import { useModalContext } from "contexts/ModalContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { CSSProperties, forwardRef, useContext, useEffect, useMemo, useState } from "react"
import { useCSVReader } from "react-papaparse"
import alertService from '../../services/alert'
import { Button } from "../utils/Button"
import Table from "../Table"
import { StepContext } from "contexts/StepContext"
import SelectFileStep from "./steps/SelectFileStep"
import Errors from "./steps/Errors"
import Finalizar from "./steps/Finalizar"
import Stepper from "../Stepper"
import StepperControl from "../StepperControl"

type ImportModalType = {
    loadEspecies?: any;
    steps: any;
    callback: any;
}

const ImportModal = forwardRef<any, ImportModalType>(
    function ImportModal({ loadEspecies, steps, callback }, ref) {
    const { client } = useContext(AuthContext)
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store
    const { setLoading } = useContext(LoadingContext)
    const { projeto } = useContext(ProjetoContext)
    const { CSVReader } = useCSVReader()
    const [encoding, setEncoding] = useState('iso-8859-1')
    
    const [uploading, setUploading] = useState<boolean>(false)
    const [duplicates, setDuplicates] = useState([])
    const [nomes_vazios, setNomesVazios] = useState([])
    const { step, nextStep, prevStep, data: dataStep, updateData, resetData, setStep } = useContext(StepContext)
    
    const [columnData, setColumnData] = useState([])
    const [rowData, setRowData] = useState([])
    const columns = useMemo(() => columnData, [columnData])
    const data = useMemo(() => rowData, [rowData])

    const styles = {
        csvReader: {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
        } as CSSProperties,
        progressBarBackgroundColor: {
          backgroundColor: 'green',
        } as CSSProperties,
    };

    useEffect(() => {
        setStep(1)
    }, [setStep])

    const isErrors = () => {
        return duplicates.length > 0 || nomes_vazios.length > 0
    }

    const getErrors = async () => {
        try {
            await client.post(`/especie/import/get-errors`, {
                columns: columns,
                data: data
            })
            .then((result: any) => {
                const { data } = result
                const { error, duplicates, nomes_vazios } = data
                setDuplicates(duplicates),
                setNomesVazios(nomes_vazios)
                updateData({
                    errors: {
                        duplicates: {
                            columns: [
                                {
                                    "Header": 'Linha',
                                    "accessor": 'linha'
                                },
                                {
                                    "Header": 'Nome Vulgar',
                                    "accessor": 'nome'
                                },
                                {
                                    "Header": 'Nome Orgão',
                                    "accessor": 'nome_orgao'
                                },
                                {
                                    "Header": 'Nome Científico',
                                    "accessor": 'nome_cientifico'
                                }
                            ],
                            data: duplicates
                        },
                        nomes_vazios: {
                            columns: [
                                {
                                    "Header": 'Linha',
                                    "accessor": 'linha'
                                },
                                {
                                    "Header": 'Nome Vulgar',
                                    "accessor": 'nome'
                                },
                                {
                                    "Header": 'Nome Orgão',
                                    "accessor": 'nome_orgao'
                                },
                                {
                                    "Header": 'Nome Científico',
                                    "accessor": 'nome_cientifico'
                                }
                            ],
                            data: nomes_vazios
                        }
                    }
                })

            }).catch((error: any) => {
                console.log('Esse error: ', error.message)
            })
        } catch(e: any) {
            alertService.error(e.message)
        }
    }
    
    const handleClick = async (direction?: string) => {
        try {
            let newStep = step
            
            if (step === 1 && data.length === 0 && direction === 'next') {
                return alertService.warn('É necessário selecionar um arquivo para importação')
            }

            if (step === 1 && data.length > 0 && direction === 'next') {
                await getErrors()
            }

            if (step === steps.length && isErrors() && direction === 'next') {
                return alertService.warn('Verifique as Incosistências para realizar a importação')
            }
        
            if (data.length > 0 && step < steps.length) {
                if (step === 2 && isErrors()) return alertService.warn('Verifique as Incosistências para realizar a importação')
                direction === 'next' ? newStep++ : newStep--
            } else {
                newStep--
            }

            if (step === steps.length && !isErrors() && direction === 'next') {
                await handleImportEspecies()
            }

            step === 1 && visible && !direction && hideModal()

            step > 0 && step <= steps.length && setStep(newStep)
        } catch (e: any) {

        }
        
    }

    const handleImportEspecies = async () => {
        try {
            setLoading(true)
            await client.post(`/especie/import`, {
                columns: columns,
                data: data
            })
            .then((result: any) => {
                const { data } = result
                setLoading(false)
                if (!data.error) {
                    alertService.success(data?.message)
                    loadEspecies()
                    hideModal()
                }
            }).catch((error: any) => {
                console.log('Esse error: ', error.message)
            })
        } catch(e: any) {
            alertService.error(e.message)
        }
    }

    const displayStep = () => {
        const renderStep = () => {
            switch (step) {
              case 1:
                return <SelectFileStep columns={columns} data={data} />;
              case 2:
                return duplicates || nomes_vazios
                        ? <Errors /> 
                        : 
                            <div className="mt-8">
                                <div className="flex flex-row items-center justify-center py-4 border rounded-md">
                                    <span className="font-medium text-lg">Nenhum Erro</span>
                                </div>
                            </div>;
              case 3:
                return <Finalizar />;
              default: <>Teste</>
            }
        }
        
        return renderStep()
    }

    const onUploadAccepted = async (result: any) => {
        const columns = result.data[0].map((col: any, index: any) => {
            const accessor = col.normalize("NFD").replace(/[^0-9a-zA-Z_\s]/g, "").split(" ").join("_").toLowerCase()

            return {
                Header: col,
                accessor
            }
        })

        const rows = result.data.slice(1).map((row: any) => {
            return row.reduce((acc: any, curr: any, index: any) => {
                acc[columns[index].accessor] = curr;
                return acc;
            }, {})
        })
        
        setColumnData(columns)
        setRowData(rows)
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-center px-4 py-2 bg-gray-100">
                <div className="flex flex-row justify-center items-center">
                    <CSVReader 
                        config={
                            {
                                skipEmptyLines: true,
                                encoding
                            }
                        }
                        onUploadAccepted={onUploadAccepted}
                    >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                    }: any) => (
                        <>
                        <div className="flex flex-col lg:flex-row items-center justify-center">
                            <div className="px-2 w-36">
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
                                    value={encoding}
                                    onChange={e => {
                                        setEncoding(String(e.target.value))
                                    }}
                                >
                                    {["iso-8859-1", "utf-8"].map(enconding => (
                                    <option key={enconding} value={enconding}>
                                        {enconding}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-center mt-2 lg:mt-0">
                                <a 
                                    {...getRootProps()} 
                                    className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold px-4 inline-flex align-middle hover:cursor-pointer"
                                >
                                    <svg className="fill-green-700 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                                    </svg>
                                    <span className="ml-2">{uploading ? "Abrindo..." : "Abrir Planilha"}</span>
                                </a>
                                </div>
                                <div className="flex flex-row items-center justify-center px-2 space-x-2">
                                   
                                    { acceptedFile && (
                                        <>
                                            <span>{acceptedFile.name}</span>
                                            <Button {...getRemoveFileProps()}
                                                className="text-red-700 hover:cursor-pointer justify-center w-24"
                                            >
                                                <span 
                                                    onClick={() => {  
                                                        setColumnData([])
                                                        setRowData([])
                                                        updateData([])
                                                        setStep(1)
                                                    }}
                                                >
                                                    Remove
                                                </span>
                                            </Button>
                                    </>
                                    )}
                                   
                                </div>
                                <div className="col-span-4 pt-1">
                                    <ProgressBar style={styles.progressBarBackgroundColor} />
                                </div>
                            </div>
                        </>
                    )}
                </CSVReader>  
                </div>
                
            </div>
            <div>
                <Stepper
                    steps= { steps }
                    currentStep={step}
                />
                <div>
                    {displayStep()}
                </div>
                <StepperControl steps={steps} handleClick={handleClick}/>
            </div>
            <span
                className="hidden"
                ref={ref}
                onClick={handleImportEspecies}
            >
                Importar
            </span>
           
        </div>
    )
})

export default ImportModal
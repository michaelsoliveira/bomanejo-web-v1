import Table from "@/components/Table"
import { StepContext } from "contexts/StepContext"
import { useContext, useEffect } from "react"

const Errors = () => {
    const { data } = useContext(StepContext)
    const { errors } = data
    const { duplicates, nomes_vazios }: any = errors

    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Errors</span>
            
            {
               duplicates.data?.length > 0 && (
                <>
                    <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 mb-2 rounded-md">Duplicidades</span>
                    <div className="overflow-x-hidden w-full">
                        <Table columns={duplicates?.columns} data={duplicates?.data} />
                    </div>
                </>
               )
            }
            {
               nomes_vazios.data?.length > 0 && (
                <div>
                    <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span>
                    <div className="overflow-x-hidden w-full">
                        <Table columns={nomes_vazios?.columns} data={nomes_vazios?.data} />
                    </div>
                </div>
               )
            }
        
        </div>
    )
}

export default Errors
import classNames from "classnames"
import { useModalContext } from "contexts/ModalContext"
import { StepContext } from "contexts/StepContext"
import { useContext } from "react"

const StepperControl = ({ steps, handleClick }: any) => {
    const { step, nextStep, prevStep, data: dataStep, updateData, setStep } = useContext(StepContext)
    const { hideModal, store } = useModalContext()
    const { visible } = store
    return (
        <div className="container flex justify-between mt-4">
            <button
                onClick={() => handleClick()}
                className={classNames("bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out",
                    !visible && step === 1 ? "opacity-50 cursor-not-allowed" : "")}
            >
                { visible && step === 1 ? "Fechar" : "Voltar"}
            </button>
            <button
                onClick={() => handleClick('next')}
                className={classNames(
                    "bg-green-700 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out",
                    )}
            >
                { step === steps.length? "Finalizar Importação" : "Prosseguir" }
            </button>
        </div>
    )
}

export default StepperControl
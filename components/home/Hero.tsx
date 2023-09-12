import { useModalContext } from "contexts/ModalContext"
import Tabs from "../Tabs"

const Hero = ({ session }: any) => {
    const { showModal } = useModalContext()

    const showLogin = () => {
        showModal({
            type: 'submit', hookForm: 'hook-form', options: false, content: <Tabs />
        })
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div>
                <h1 className="flex flex-col text-4xl tracking-tight font-bold text-gray-900 sm:text-2xl md:text-6xl lg:text-3xl xl:text-3xl">
                <span className="block text-green-800 xl:inline">BOManejo Web</span>{' '}
                <span className="block text-xl text-gray-600 xl:inline">Inventário Florestal Sustentável</span>
            </h1>
            <p className="font-roboto mt-3 text-justify text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 mb-4">
                O setor florestal brasileiro precisa – e demanda – de softwares que agilizem e aprimorem o processo de planejamento
                florestal, auxiliando na seleção de árvores de corte com base em critérios claros, proporcionando melhor controle
                sobre a produção de madeira e possibilitando o manejo florestal sustentável.
                </p>
            </div>
            {!session && (
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="">
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                        onClick={showLogin}
                    >
                        Iniciar
                    </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                        onClick={() => {}}    
                    >
                        Tutorial
                    </a>
                    </div>
                
                </div>
            )}
        </div>
    )
}

export default Hero
import { createContext, ReactNode, useState } from "react"

type ProjetoType = {
    projeto: any;
    setProjeto: (projeto: any) => void
}

type Props = {
    children: ReactNode
}

export const ProjetoContext = createContext({} as ProjetoType)

export function ProjetoProvider({ children }: Props) {
    const [projeto, setProjeto] = useState()
    
    return (
        <ProjetoContext.Provider value={{ projeto, setProjeto }}>
            { children }
        </ProjetoContext.Provider>
    )
}
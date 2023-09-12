import { createContext, ReactNode } from "react";
import useClient from "../services/client";

type AuthContextType = {
    client: any
}

type Props = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {

    const client = useClient()

    return (
        
        <AuthContext.Provider value={{ client }}>
            { children }
        </AuthContext.Provider>
        
    )    
}
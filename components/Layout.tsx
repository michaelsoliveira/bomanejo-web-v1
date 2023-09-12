import { ReactNode, useCallback, useContext, useEffect, useState, useLayoutEffect } from "react"
import Navigation from './Navigation'
import { useSession, signOut } from "next-auth/react"
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from "./Menus"
import { Loading } from "@/components/Loading"
import { LoadingContext } from "contexts/LoadingContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { ClipboardListIcon } from '@heroicons/react/outline'
import { AuthContext } from "contexts/AuthContext"
import { CogIcon, UserGroupIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useAppSelector } from "store/hooks"
import { RootState } from "store"
import Script from 'next/script'
import Footer from "./footer"
export type props = {
    children: ReactNode
}

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const { loading } = useContext(LoadingContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const { client } = useContext(AuthContext)
    const router = useRouter()
    const poa = useAppSelector((state: RootState) => state.poa)

    const getProjetoAtivo = useCallback(async () => {
        try {
            if (session) {
                const response = await client.get(`/projeto/active/get`)
                const { projeto } = response.data
                setProjeto(projeto ? projeto : { id: '', nome: 'Nenhum Projeto Cadastrado' })
            }
        } catch(error: any) {
            console.log(error.message)
        }
       
    }, [session, client, setProjeto])

    useEffect (() => {
        getProjetoAtivo()
        
    }, [getProjetoAtivo])

    const withProjeto = projeto ? 
        [
            {
                name: 'Gerenciar',
                description: 'Gerenciar Informações do Projeto',
                href: `/projeto`,
                icon: CogIcon
            },
            {
                name: 'Detentor',
                description: 'Gerenciar Detentor do Projeto',
                href: `/projeto/detentor`,
            },
            {
                name: 'Usuários',
                description: 'Gerenciar Permissões',
                href: `/projeto/users`,
                icon: UserGroupIcon
            }
        ]
     : [
        {
            name: 'Geral',
            description: 'Gerenciar Informações do Projeto',
            href: `/projeto`,
            icon: CogIcon
        }
     ]

    const menuProjeto = {
        name: 'Projeto',
        description: 'Dados Gerais dos Projetos',
        href: '/projeto',
        icon: ClipboardListIcon,
        subMenuItems: withProjeto
    }

    const defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: [ menuProjeto, ...resources] },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: planejamento },
        { name: 'Análise de Dados', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: reports }
    ]

    const userNavigation = [
        { name: `Perfil (${user?.username})`, href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: () => signOut({ callbackUrl: "/" }) },
    ]

    const processPath = router.pathname === 'process'

    return (
        <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6GKM1MGNL6" />
        <Script id="google-analytics"> 
            {
                `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', 'G-6GKM1MGNL6');
                `
            }
        </Script> 
    
            <div className="flex flex-col">
                <div className="lg:mb-16">
                    <Navigation
                        defaultNavigation={defaultNavigation}
                        userNavigation={userNavigation}
                    />
                </div>
                    { (processPath && !poa?.id) && (
                        <div className="lg:mt-16">
                            <span className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                                <p>Para realizar o processamento do inventário é necessário ativar um POA!</p>
                            </span>
                        </div>
                    )}
                
                <div className="relative">
                    {loading && (<Loading />)}
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
                
            </div>
        </>
    )
}

export default Layout
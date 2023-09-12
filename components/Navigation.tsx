/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { createRef, Fragment, SVGProps, useCallback, useContext, useEffect, useState, forwardRef, } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { Link } from './Link'
import Logo from './Logo'
import { useSession, signOut, getSession } from 'next-auth/react'
import { MenuIcon, XIcon, BellIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { AuthContext } from 'contexts/AuthContext'
import { useModalContext } from 'contexts/ModalContext'
import { ChangeActive as ChangeActiveProjeto } from './projeto/ChangeActive'
import { ChangeActive as ChangeActivePoa } from './poa/ChangeActive'
import { styles } from './utils/styles'
import { UserIcon } from '@heroicons/react/outline'

type SubMenuType = {
        name?: string,
        description?: string,
        href?: string,
        subMenuItems?: SubMenuType[],
        icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
        faIcon?: boolean;
    }
    type NavigationType = {
        name: string,
        href: string,
        current: boolean,
        visible: boolean,
        subMenu: boolean,
        subMenuItems?: SubMenuType[]
    }

export default function Navigation({ defaultNavigation, userNavigation }: any) {
    const { data: session } = useSession() as any
    
    const { showModal, hideModal } = useModalContext()
    const formRefProjeto = createRef<any>()
    const formRefPoa = createRef<any>()
    const { projeto } = useContext(ProjetoContext)
    const [ menuOpened, setMenuOpened ] = useState(false)

    // eslint-disable-next-line react/display-name
    const CustomMenuButton = forwardRef<any, HTMLButtonElement>(({ children }: any, ref) => (
        <button onClick={() => setMenuOpened(!menuOpened)} ref={ref}>
            {children}
        </button>
    ));

    const router = useRouter()

    const [navigation, setNavigation] = useState<NavigationType[]>(defaultNavigation)
    const [sticky, setSticky] = useState(false)

    const changeProjetoAtivo = async () => {
        formRefProjeto.current.handleSubmit()
    }

    const changePoaAtivo = async () => {
        formRefPoa.current.handleSubmit()
    }

    const changeProjetoModal = () => {
        showModal({ title: 'Alterar Projeto Ativo', onConfirm: changeProjetoAtivo ,styleButton: styles.greenButton, confirmBtn: 'Ativar Projeto', 
        content: <ChangeActiveProjeto ref={formRefProjeto} /> })
    }

    const changePoaModal = () => {
        showModal({ title: 'Alterar Poa Ativo', onConfirm: changePoaAtivo ,styleButton: styles.greenButton, confirmBtn: 'Ativar Poa', 
        content: <ChangeActivePoa ref={formRefPoa} /> })
    }

    const handleScroll = () => {
        if (scrollY > 72) {
          setSticky(true);
        } else if (scrollY < 72) {
          setSticky(false);
        }
    }

    useEffect(() => {
        addEventListener('scroll', handleScroll)

        return () => {
            removeEventListener('scroll', handleScroll)
        }
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeCurrentParent = useCallback((key: any, href?: string) =>  {
        
        const changeCurrentNav = defaultNavigation.map((nav: any, index: any) => {
            if (key !== index) {
                return {
                    ...nav,
                    current: false
                }
            } else {
                return {
                    ...nav,
                    current: true
                }
            }
            
        })
        
        setNavigation(changeCurrentNav)
        //if (href) router.push(href)
    }, [defaultNavigation])

    const checkCurrentNavigation = useCallback(() => {
            
            defaultNavigation?.map((nav: NavigationType, indexParent: number) => {
                if (nav?.subMenuItems) {
                    if (router.pathname === nav.href) {
                        return changeCurrentParent(indexParent)
                    }
                    nav?.subMenuItems?.map((subMenu: SubMenuType, indexSub: number) => {
                        if (router.pathname === subMenu.href) {
                            return changeCurrentParent(indexParent)
                        }

                        subMenu.subMenuItems?.map((subsubMenu: SubMenuType, indexSubsub: number) => {
                            if (router.pathname === subsubMenu.href) {
                                return changeCurrentParent(indexParent)
                            }
                        })
                    })
                }
            })
        
    }, [changeCurrentParent, defaultNavigation, router.pathname])

    const loadNavigation = useCallback(async() => {
        if (session) {
            checkCurrentNavigation()
        }
    }, [checkCurrentNavigation, session]) 
    

    useEffect(() => {
        let isLoaded = false
        if (!isLoaded)
            loadNavigation()

        return () => {
            isLoaded = true
        }

    }, [loadNavigation])

    return (
        <Disclosure as="nav" className={classNames(
                "lg:absolute items-center w-full opacity-100 z-40",
            )}
        >
          {({ open }) => (
            <>
              <div className={classNames(
                "px-4 sm:px-6 lg:px-8 bg-gray-50 shadow z-40",
                sticky ? 'lg:fixed w-full opacity-100 transition transition-ease duration-500 translate-y-0' : ''
              )
                }>
                <div className="flex items-center justify-between h-16">
                  <div className={classNames(
                    "flex items-center justify-between max-w-full w-full"
                  )}>
                    
                    <div className="flex-shrink-0 lg:-mr-16">
                        {
                            open ? (
                                <Disclosure.Button
                                    as={Link}
                                    href="/"
                                >
                                    <Logo width='w-10' height='h-10' />
                                </Disclosure.Button>
                            ) : (
                                <Link
                                    href="/"
                                >
                                    <Logo width='w-10' height='h-10' />
                                </Link>
                            )
                        }
                        
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">

                        {navigation?.map((item: any, key: any) => (
                            item.visible && (!item.subMenu  ?
                            (<a
                                key={key}
                                    href={item.href}
                                    onClick={(evt: any) => {
                                        evt.preventDefault()
                                        changeCurrentParent(key, item.href)
                                        open = !open
                                    }}
                                    className={classNames(
                                    item.current
                                    ? 'border-b-2 border-green-700 text-gray-700 bg-gray-100'
                                    : 'text-gray-700 hover:border-b-2 hover:border-green-700 hover:text-green-800 transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105',
                                'px-6 py-2 text-sm font-medium hover:bg-gray-100 in-line flex'
                                )}
                                    aria-current={item.current ? 'page' : undefined}
                            >
                                    {item.name}
                            </a>) :
                                (<Popover
                                    onClick={(evt: any) => {
                                        evt.preventDefault()
                                        changeCurrentParent(key)
                                    }}
                                    as="div" className={classNames(
                                    item?.current
                                    && 'border-b-2 border-green-700 text-gray-700 bg-gray-100',
                                    "relative inline-block text-left")} key={key}>
                                {({ open, close }) => (
                                <>
                                    <Popover.Button className={classNames(
                                        !item?.current && 'hover:border-b-2 hover:border-green-700 hover:text-green-800',
                                            "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105")}>
                                        {item.name}
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-green-700 rotate-180 transform' : 'text-gray-400',
                                                'w-5 h-5 ml-2 -mr-1'
                                            )}
                                            aria-hidden="true"
                                        />
                                        
                                    </Popover.Button>                               
                                    <Transition
                                        as={Fragment}
                                        show={open}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                    <Popover.Panel className={classNames(
                                        "z-30 absolute w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")}>
                                        {item.subMenuItems?.map((subMenu: SubMenuType, key: number) =>
                                        (!subMenu.subMenuItems ?
                                            (
                                            <div key={key} className='inline-flex px-2 py-2 w-full rounded-md text-sm text-gray-700 '>
                                                <Popover.Button
                                                    as={Link}
                                                    href={subMenu?.href}
                                                    className={classNames(
                                                    
                                                        router.pathname === subMenu?.href && 'bg-gray-100',
                                                        'group flex rounded-md text-start items-center w-full px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100'
                                                    )}
                                                >
                                                    {subMenu?.icon && (
                                                        <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                    )}
                                                    
                                                    <div className="ml-4" aria-hidden="true">
                                                        <p className="font-medium text-gray-900">{subMenu.name}</p>
                                                        {subMenu?.description && (
                                                            <p className="text-sm text-gray-500">{subMenu?.description}</p>
                                                        )}
                                                    </div>
                                                </Popover.Button>
                                        </div>  
                                    ) :
                                    (<div key={key}>
                                        <Popover>
                                            {({ open: menuOpen, close: menuClose}) => (
                                                <>
                                                    <div className='px-2 py-2 w-full text-start'>
                                                        <Popover.Button
                                                            className={classNames(
                                                            !subMenu.icon ? 'text-sm px-14' : '',
                                                            "inline-flex w-full rounded-md px-2 py-2 text-sm text-gray-700 transition duration-500 ease-in-out hover:bg-gray-100")}
                                                        >
                                                            {subMenu?.icon && (
                                                                <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                            )}
                                                            <div className="ml-4" aria-hidden="true">
                                                                <p className="text-base font-medium text-gray-900">{subMenu.name}</p>
                                                            </div>
                                                            <div className='flex absolute right-0 mr-6'>
                                                                <ChevronRightIcon
                                                                    className={classNames(
                                                                        menuOpen ? 'text-green-700 rotate-180 transform' : 'text-gray-400',
                                                                        'w-5 h-5 ml-2 -mr-1 transition-all'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                        </Popover.Button>
                                                    </div>
                                                    <Transition
                                                        show={menuOpen}
                                                        enter="transition duration-100 ease-out"
                                                        enterFrom="transform scale-95 opacity-0"
                                                        enterTo="transform scale-100 opacity-100"
                                                        leave="transition duration-75 ease-out"
                                                        leaveFrom="transform scale-100 opacity-100"
                                                        leaveTo="transform scale-95 opacity-0"
                                                    ></Transition>
                                                    <Popover.Panel className={classNames(
                                                        "z-30 absolute -mr-8 -mt-12 w-72 -right-60 origin-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")}>
                                                        {subMenu.subMenuItems?.map((subsubMenu: SubMenuType, subKey: number) => (
                                                            <div key={subKey} className='inline-flex px-2 py-2 w-full rounded-md text-sm text-gray-700'>
                                                                <Popover.Button
                                                                    as={Link}
                                                                    href={subsubMenu?.href}
                                                                    onClick={close}
                                                                    className={classNames(
                                                                        !subsubMenu?.icon && 'pl-8' ,
                                                                        router.pathname === subsubMenu?.href && 'bg-gray-100',
                                                                        'group flex rounded-md text-start items-center w-full px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100'
                                                                    )}
                                                                >
                                                                    {subsubMenu?.icon && (
                                                                        <subsubMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                                    )}
                                                                    <div className="ml-4" aria-hidden="true">
                                                                        <p className="text-sm font-medium text-gray-900">{subsubMenu.name}</p>
                                                                        {subsubMenu?.description && (
                                                                            <p className="mt-1 text-sm text-gray-500">{subsubMenu?.description}</p>
                                                                        )}
                                                                    </div>
                                                                </Popover.Button>
                                                            </div>  
                                                        ))}
                                                    </Popover.Panel>
                                                </>
                                            )}
                                        </Popover>
                                    </div>  
                                ))
                            )}
                    </Popover.Panel>
                </Transition>
            </>
        )}

        </Popover>
        ))))
        }
        </div>
        </div>
            <div className='hidden lg:flex lg:flex-row'>
                {!session && (
                <div className="px-2 lg:space-x-2">
                    <Link href="/login" className="bg-green-700 shadow text-sm px-6 py-3 
                    text-white rounded-lg hover:text-white transition duration-500 ease-in-out hover:bg-green-600
                    transform hover:-translate-y-1 hover:scale-105">
                        Fazer login
                    </Link>  
                    <Link href="/signup" className="bg-gray-100 shadow text-sm px-6 py-3
                    text-green-700 rounded-lg hover:text-green-600 transition duration-500 ease-in-out hover:bg-gray-200
                    transform hover:-translate-y-1 hover:scale-105">
                        Cadastre-se
                    </Link>           
                </div>            
            )}
        </div>
                
        </div>
            {session && (<div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                            <div
                                className="bg-gray-200 p-1 rounded-full text-gray-400 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                            >
                                <svg className='fill-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                        {["Mudar Projeto Ativo", "Mudar Poa Ativo"].map((item: any, key: any) => (
                            <Menu.Item key={key}>
                            {({ active }) => (
                                <Disclosure.Button
                                    as='a'
                                    href='#'
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                        onClick={() => { key === 0 ? changeProjetoModal() : changePoaModal() }}
                                        aria-hidden="true"
                                >
                                    {item}
                                </Disclosure.Button>
                            )}
                            </Menu.Item>
                        ))}
                        </Menu.Items>
                        
                    </Transition>
                    </Menu>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            { (session.user?.image) 
                                ? (
                                    <img className="h-8 w-10 rounded-full" src={session.user?.image} alt="" />
                                )
                                : (
                                    <div className='ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full'>
                                        <UserIcon className="block h-6 w-6 text-black" aria-hidden="true" />
                                    </div>
                                )
                            }
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                        {userNavigation.map((item: any, key: any) => (
                            <Menu.Item key={key}>
                            {({ active }) => (
                                <Disclosure.Button
                                as='a'
                                href={item.href}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                                        onClick={item.click}
                                        aria-hidden="true"
                                >
                                {item.name}
                                </Disclosure.Button>
                            )}
                            </Menu.Item>
                        ))}
                        </Menu.Items>
                        
                    </Transition>
                    </Menu>
                </div>
                </div>
                )}
                <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>
                </div>
            </div>
            </div>

            <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, key) => (
                item.visible &&
                (!item.subMenu ?    
                (<Disclosure.Button
                    key={key}
                    as="a"
                    href={item.href}
                    className={classNames(
                    item.current ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-sm font-medium transition-all'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </Disclosure.Button>) :
                    (<Popover as="div" className="w-full" key={key}>
                        {({ open }) => (
                        <>
                        <div>
                            <Popover.Button className="inline-flex w-full rounded-md px-3 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-green-700">
                                {item.name}
                                {open ? (
                                    <ChevronUpIcon
                                        className={classNames(
                                            open ? 'text-gray-400' : 'text-gray-400',
                                            'w-5 h-5 ml-4 -mr-1'
                                        )}
                                        aria-hidden="true"
                                    />                    
                                    ) : (
                                        <ChevronDownIcon
                                        className={classNames(
                                            open ? 'text-gray-400' : 'text-gray-400',
                                            'w-5 h-5 ml-4 -mr-1'
                                        )}
                                        aria-hidden="true"
                                    />                    
                                )}
                            
                            </Popover.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                        <Popover.Panel className="z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {item.subMenuItems?.map((subMenu, subkey) => (
                            <div className='px-2 py-2' key={subkey} aria-hidden="true">
                                {!subMenu.subMenuItems ? (
                                    <Disclosure.Button
                                        as={Link}
                                        href={subMenu.href}
                                        className={classNames(
                                            'hover:bg-gray-100',
                                            'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                        )}
                                        aria-hidden="true"
                                    >
                                        {subMenu?.icon && (
                                            <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                        )}
                                        <div className="ml-4">
                                            <p className="text-base font-medium text-gray-900">{subMenu.name}</p>
                                            {subMenu?.description && (
                                                <p className="mt-1 text-sm text-gray-500">{subMenu?.description}</p>
                                            )}
                                        </div>
                                    </Disclosure.Button>
                                ) : (
                                <Popover as="div" className="w-full" key={subkey}>
                                {({ open }) => (
                                    <>
                                    <div>
                                        <Popover.Button className="inline-flex w-full rounded-md px-2 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-gray-200">
                                            {subMenu?.icon && (
                                                <subMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                            )}
                                                <div className="ml-4">
                                                    <span className="text-base font-medium text-gray-900">{subMenu.name}</span>
                                                </div>
                                            {open ? (
                                                <ChevronUpIcon
                                                    className={classNames(
                                                        open ? 'text-gray-400' : 'text-gray-400',
                                                        'w-5 h-5 ml-4 -mr-1'
                                                    )}
                                                    aria-hidden="true"
                                                />                    
                                                ) : (
                                                    <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-400' : 'text-gray-400',
                                                        'w-5 h-5 ml-4 -mr-1'
                                                    )}
                                                    aria-hidden="true"
                                                />                    
                                            )}
                                        
                                        </Popover.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Popover.Panel className="z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {subMenu.subMenuItems?.map((subsubMenu, subsubKey) => (
                                                <Disclosure.Button
                                                    as={Link}
                                                    key={subsubKey}
                                                    href={subsubMenu.href}
                                                    className={classNames(
                                                        !subsubMenu?.icon && 'pl-10',
                                                        'hover:bg-gray-100 pl-4',
                                                        'group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    {subsubMenu?.icon && (
                                                        <subsubMenu.icon className="flex-shrink-0 h-6 w-6 text-green-700" aria-hidden="true" />
                                                    )}
                                                    <div className="ml-4">
                                                        <p className="text-base font-medium text-gray-900">{subsubMenu.name}</p>
                                                        {subsubMenu?.description && (
                                                            <p className="mt-1 text-sm text-gray-500">{subsubMenu?.description}</p>
                                                        )}
                                                    </div>
                                                </Disclosure.Button>))}
                                            </Popover.Panel>
                                        </Transition>
                                            </>
                                        )}
                                    </Popover>
                                )}
                            </div>))}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
    
            </Popover>
                ))
            ))}
                        
            </div>
            {
            //Mobile
            session ? (
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            {session && session.user?.image ? (
                                <img className="h-10 w-10 rounded-full" src={session.user?.image} alt="" />
                            ) : (
                                <div className='ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                    <UserIcon className="block h-6 w-6 text-black" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-gray-700">{session && session.user?.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-600">{session && session.user?.email}</div>
                        </div>
                    <Menu as="div" className="ml-3 relative flex items-center justify-end  w-full">
                    <div>
                        <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                            <div
                                className="bg-gray-200 p-1 rounded-full text-gray-400 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                            >
                                <svg className='fill-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                        {["Mudar Projeto Ativo", "Mudar Poa Ativo"].map((item: any, key: any) => (
                            <Menu.Item key={key}>
                            {({ active }) => (
                                <Menu.Button
                                    as='a'
                                    href='#'
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                        onClick={() => { key === 0 ? changeProjetoModal() : changePoaModal() }}
                                        aria-hidden="true"
                                >
                                    {item}
                                </Menu.Button>
                            )}
                            </Menu.Item>
                        ))}
                        </Menu.Items>
                        
                    </Transition>
                    </Menu>
                </div>
                <div className="mt-3 px-2 space-y-1" aria-hidden="true">
                    {userNavigation.map((item: any, key: any) => (
                        <Disclosure.Button
                            key={key}
                            as={Link}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-700"
                            onClick={item.click}
                            aria-hidden="true"
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </div>
            ) : (
                <div className="px-3 pb-2 -mt-1">
                    <Link href="/login" className="block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-green-700 hover:transition-all">Login</Link>            
                </div>            
            )}
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>
  )
}

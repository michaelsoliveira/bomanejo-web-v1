import withAuthentication from "components/withAuthentication"
import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { AuthContext } from "contexts/AuthContext"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import Observacoes from "@/components/obs-arvore/Index"
import { Pagination } from "components/Pagination"
import { LoadingContext } from "contexts/LoadingContext"
import { ProjetoContext } from "contexts/ProjetoContext"

const ObservacoesIndex = () => {

    const { client } = useContext(AuthContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentObservacoes, setCurrentObservacoes] = useState<any[]>([])
    const [orderBy, setOrderBy] = useState('nome')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { projeto } = useContext(ProjetoContext)
    
    const loadObservacoes = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/obs-arvore?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`)
        console.log(data)
        setTotalItems(data?.count)
        setCurrentObservacoes(data?.observacoes)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, router.pathname, setLoading])

    useEffect(() => {  
        loadObservacoes(itemsPerPage)
    }, [itemsPerPage, loadObservacoes])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            orderBy,
            order,
            search
        } = paginatedData

        if (search) {
            
            var { data } = await client.get(`/obs-arvore?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/obs-arvore?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        }
        
        dispatch(paginate(paginatedData))

        setCurrentPage(currentPage)
        setItemsPerPage(perPage)
        setOrderBy(orderBy)
        setOrder(order)
        setTotalItems(data?.count)
        setCurrentObservacoes(data?.users)
    }

    const changeItemsPerPage = (value: number) => {
        onPageChanged({
            name: router.pathname,
            currentPage: 1,
            perPage: value,
            orderBy,
            order
        })
    }

    return (
        <div>
            <Observacoes
                currentObservacoes={currentObservacoes}
                loading={loading}
                loadObservacoes={loadObservacoes}
                currentPage={currentPage}
                orderBy={orderBy}
                order={order}
                onPageChanged={onPageChanged}
                perPage={itemsPerPage}
                changeItemsPerPage={changeItemsPerPage}
            />
            <Pagination
                perPage={itemsPerPage}
                totalItems={totalItems}
                orderBy={orderBy}
                order={order}
                currentPage={currentPage}
                onPageChanged={onPageChanged}    
                pageNeighbours={3}
            />
        </div>
    )
}

export default withAuthentication(ObservacoesIndex)
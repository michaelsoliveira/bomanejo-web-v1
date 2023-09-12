import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "components/withAuthentication"
import { Pagination } from "components/Pagination"
import { AuthContext } from "contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import IndexCategory from "@/components/categoria-especie/Index"
import { useRouter } from "next/router"
import { RootState } from "store"
import { CategoriaEspecieType } from "types/ICategoriaEspecieType"
import { ProjetoContext } from "contexts/ProjetoContext"


const CategoriaIndex = () => {
    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentCategorias, setCurrentCategorias] = useState<CategoriaEspecieType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const poa = useAppSelector((state: RootState) => state.poa)
    const { projeto } = useContext(ProjetoContext)
    
    const loadCategorias = useCallback(async (itemsPerPage) => {
        setLoading(true)
        const currentPagePagination = pagination.name === 'categoria' && pagination.currentPage ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/categoria?page=${currentPagePagination}&perPage=${itemsPerPage}&order=asc&orderBy=nome&poa=${poa?.id}&projetoId=${projeto?.id}`)
        setTotalItems(data?.count)
        setCurrentCategorias(data?.categorias)
        setLoading(false)
    }, [client, pagination.currentPage, pagination.name, poa.id, projeto?.id])

    useEffect(() => {
        loadCategorias(itemsPerPage)
    }, [loadCategorias, itemsPerPage])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            search
        } = paginatedData

        if (search) {
            var { data } = await client.get(`/categoria?page=${currentPage}&perPage=${perPage}&search=${search.toLowerCase()}&poa=${poa?.id}&projetoId=${projeto?.id}`)
            paginatedData = {
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/categoria?page=${currentPage}&perPage=${perPage}&projetoId=${projeto?.id}`)
            paginatedData = { name, ...paginatedData }
        }

        dispatch(paginate(paginatedData))
        
        setCurrentPage(currentPage)
        setTotalItems(data?.count)
        setCurrentCategorias(data?.categorias)
        setTotalPages(totalPages ? totalPages : Math.ceil(data?.count / perPage))
    }

    const changeItemsPerPage = (perPage: any) => {
        setItemsPerPage(perPage)
        pagination.name === 'categoria' ?? setCurrentPagePagination(1)
        loadCategorias(perPage)
    }

    return (
    <div>
        <IndexCategory
            currentCategorias={currentCategorias}
            loading={loading}
            loadCategorias={() => loadCategorias(itemsPerPage)}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            perPage={itemsPerPage}
            changeItemsPerPage={changeItemsPerPage}
        />
        <Pagination
            perPage={itemsPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChanged={onPageChanged}    
            pageNeighbours={3}
        />
    </div>
    )
}

export default withAuthentication(CategoriaIndex)
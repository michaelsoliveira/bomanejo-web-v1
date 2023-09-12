import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import withAuthentication from "components/withAuthentication"
import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { AuthContext } from "contexts/AuthContext"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import Users from "components/user/Users"
import { Pagination } from "components/Pagination"
import { UserType } from "types/IUserType"
import useClient from "services/client"
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth"

type EmpresaUserType = {
    empresaId: string
}

const UserIndex = ({ empresaId }: EmpresaUserType) => {

    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUsers, setCurrentUsers] = useState<UserType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('user.username')
    const [order, setOrder] = useState('ASC')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadUsers = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/empresa/${empresaId}/users?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`)
        
        setTotalItems(data?.count)
        setCurrentUsers(data?.users)
        setLoading(false)
    }, [client, empresaId, order, orderBy, pagination.currentPage, pagination.name, router.pathname])

    useEffect(() => {  
        // loadUsers(itemsPerPage)
    }, [itemsPerPage, loadUsers])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            orderBy,
            order,
            search
        } = paginatedData

        if (search) {
            
            var { data } = await client.get(`/empresa/${empresaId}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/empresa/${empresaId}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
        setCurrentUsers(data?.users)
        setTotalPages(totalPages ? totalPages : Math.ceil(data?.count / perPage))
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
            test
            <Users
                currentUsers={currentUsers}
                loading={loading}
                loadUsers={loadUsers}
                currentPage={currentPage}
                orderBy={orderBy}
                order={order}
                onPageChanged={onPageChanged}
                perPage={itemsPerPage}
                changeItemsPerPage={changeItemsPerPage}
                empresaId={empresaId}
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

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    // const session = await unstable_getServerSession(req, res, authOptions)
    return {
        props: {
            // users
        }
    }
}

export default withAuthentication(UserIndex)
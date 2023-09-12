import { useContext } from "react"
import withAuthentication from "components/withAuthentication"
import Inventario from "@/components/inventario/Index"
import { AuthContext } from "contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { useRouter } from "next/router"

const InventarioIndex = () => {
    const { client } = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <>
            <Inventario />
        </>
    )
}

export default withAuthentication(InventarioIndex)

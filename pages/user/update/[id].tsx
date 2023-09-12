import { GetServerSideProps } from "next"
import withAuthentication from "components/withAuthentication"

const EmpresaUpdateUser = () => {
    return (
        <div>
            UPDATE EMPRESA
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const empresaId = params?.empresa
    const userId = params?.id
    
    return {
        props: {
            empresaId,
            userId
        }
    }
}

export default withAuthentication(EmpresaUpdateUser)
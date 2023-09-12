import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AddEdit from "@/components/categoria-especie/AddEdit";
import withAuthentication from 'components/withAuthentication'


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const session = await getSession(ctx)
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }  

    return {
        props: {
            localSession: session,
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(AddEdit);
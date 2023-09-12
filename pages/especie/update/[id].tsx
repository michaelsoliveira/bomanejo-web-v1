import { GetServerSideProps } from "next";
import Especie from "@/components/especie/AddEdit";
import withAuthentication from "@/components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(Especie);
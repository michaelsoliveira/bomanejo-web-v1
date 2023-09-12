import { GetServerSideProps } from "next";
import AddEdit from "components/ut/AddEdit";


import withAuthentication from "@/components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(AddEdit);
import GrupoCategoriaEspecie from "@/components/categoria-especie/GrupoCategoriaEspecie";
import withAuthentication from "@/components/withAuthentication";

const GrupoCategoriaIndex = () => {

    return (
        <div>
            <GrupoCategoriaEspecie />
        </div>
    )
}

export default withAuthentication(GrupoCategoriaIndex)
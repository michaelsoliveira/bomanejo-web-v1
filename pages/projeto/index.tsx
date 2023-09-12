import withAuthentication from "components/withAuthentication"
import Projetos from "components/projeto/index"

const ProjetoIndex = () => {

    return (
    <div>
        <Projetos />
    </div>
    )
}

export default withAuthentication(ProjetoIndex)

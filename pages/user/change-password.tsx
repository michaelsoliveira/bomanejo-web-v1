import { ChangePassword } from "components/user/ChangePassword"
import withAuthentication from "components/withAuthentication"

const ChangePasswordPage = () => {
    return (
        <div>
            <ChangePassword />
        </div>
    )
}

export default withAuthentication(ChangePasswordPage)
import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from "contexts/AuthContext"
import Index from "components/process/Index"

const PoaIndex = () => {

    return (
    <div>
        <Index />
    </div>
    )
}

export default withAuthentication(PoaIndex)

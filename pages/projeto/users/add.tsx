import { AddEdit } from "components/user/AddEdit"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from 'contexts/AuthContext';
import { GetServerSideProps } from "next";
import { useCallback, useContext, useEffect, useState } from "react";

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
  errorMsg: 'text-red-500 text-sm',
}

export const AddUserToProjeto = () => {
  const { client } = useContext(AuthContext)

  const [roles, setRoles] = useState<any[]>()

        const loadRoles = useCallback(async () => {
            const response = await client.get('role')
            const { roles } = response.data
            setRoles(roles)
        }, [client])
    
        useEffect(() => {
            loadRoles()
        }, [loadRoles])
    return (
        <div className="bg-white shadow-lg rounded-xl px-4 py-2 w-1/3 mx-auto my-6">
            <AddEdit roles={roles} redirect={false} />
        </div>
    )
}

export default withAuthentication(AddUserToProjeto)
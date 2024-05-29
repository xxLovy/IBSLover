import React from 'react'
import WithoutLogin from '../../../components/AddToiletWithoutLogin';
import AddToiletWithLogin from '../../../components/AddToiletWithLogin'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const page = async () => {
    const { isAuthenticated } = getKindeServerSession()
    const isLoggedIn = await isAuthenticated();

    return (
        <>
            {isLoggedIn ?
                <AddToiletWithLogin />
                :
                <WithoutLogin />
            }
        </>
    )
}

export default page
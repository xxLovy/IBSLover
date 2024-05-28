import React from 'react'
import { addToiletText1, addToiletText2, addToiletText3 } from '../../../constants'
import WithoutLogin from './AddToiletWithoutLogin';
import AddToiletWithLogin from './AddToiletWithLogin'
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
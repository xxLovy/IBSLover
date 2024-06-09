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
                <>
                    <div>
                        <p>Here you can choose the toilet to add by filling the form below. Thanks for your contribution</p>
                    </div>
                    <AddToiletWithLogin />
                </>
                :
                <WithoutLogin />
            }
        </>
    )
}

export default page
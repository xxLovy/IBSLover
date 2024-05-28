import AddToiletForm from '@/components/AddToiletForm'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const AddToiletWithLogin = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect("/api/auth/login")
    }
    return (
        <div>
            <AddToiletForm />
        </div>
    )
}

export default AddToiletWithLogin
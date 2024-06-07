import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import SubmitToiletForm, { TFormSchema } from './SubmitToiletForm';

const EditToiletWithLogin = async ({ toilet }: { toilet: Toilet }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect("/api/auth/login")
    }
    return (
        <div>
            <SubmitToiletForm toilet={toilet} />
        </div>
    )
}

export default EditToiletWithLogin
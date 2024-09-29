import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import SubmitToiletForm, { TFormSchema } from './SubmitToiletForm';

const EditToiletWithLogin = async ({ toiletId }: { toiletId: string }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
        redirect("/api/auth/login")
    }
    return (
        <div>
            <SubmitToiletForm toiletId={toiletId} />
        </div>
    )
}

export default EditToiletWithLogin
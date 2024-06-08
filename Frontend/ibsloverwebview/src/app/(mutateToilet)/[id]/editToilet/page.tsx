import WithoutLogin from '@/components/AddToiletWithoutLogin';
import EditToiletWithLogin from '@/components/EditToiletWithLogin';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import DeleteToilet from '@/components/DeleteToilet';

const page = async ({ params }: { params: { id: string } }) => {
    const { isAuthenticated } = getKindeServerSession()
    const isLoggedIn = await isAuthenticated();
    const { id } = params

    return (
        <>
            {isLoggedIn ?
                <div>
                    <EditToiletWithLogin toiletId={id} />
                    <DeleteToilet id={params.id} />
                </div>


                :
                <WithoutLogin />
            }
        </>
    )
}

export default page
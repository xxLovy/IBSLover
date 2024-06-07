"use client"
import WithoutLogin from '@/components/AddToiletWithoutLogin';
import EditToiletWithLogin from '@/components/EditToiletWithLogin';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import DeleteToilet from '@/components/DeleteToilet';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { useAppSelector } from '@/redux/hooks';

const page = async ({ params }: { params: { id: string } }) => {
    const { isAuthenticated } = getKindeServerSession()
    const isLoggedIn = await isAuthenticated();
    const toiletsFromUser = useAppSelector(selectToiletFromUser)
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle)
    const toilets = toiletsFromUser.concat(toiletsFromGoogle)
    const toilet: Toilet = toilets.filter((item) => (item._id === params.id))[0]

    return (
        <>
            {isLoggedIn ?
                <div>
                    <EditToiletWithLogin toilet={toilet} />
                    <DeleteToilet id={params.id} />
                </div>


                :
                <WithoutLogin />
            }
        </>
    )
}

export default page
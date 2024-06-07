import SubmitToiletForm from '@/components/SubmitToiletForm'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const AddToiletWithLogin = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    const {
        getUser
    } = getKindeServerSession();
    const user = await getUser();
    // {
    // family_name: 'Xu',
    // given_name: 'Xuan',
    // picture: 'https://lh3.googleusercontent.com/a/ACg8ocLsDV5ccjSNDT8z4FrPNa24W1rahNPivJ5kGZZJ6Lm0vp2Vnw=s96-c',
    // email: '1xxlovyxx1@gmail.com',
    // id: 'kp_a1bd393a1ab94087b3aa63312cea7c8e',
    //     properties: {
    //       city: undefined,
    //       industry: undefined,
    //       job_title: undefined,
    //       middle_name: undefined,
    //       postcode: undefined,
    //       salutation: undefined,
    //       state_region: undefined,
    //       street_address: undefined,
    //       street_address_2: undefined
    //     }
    //   }

    if (!isLoggedIn) {
        redirect("/api/auth/login")
    }
    return (
        <div>
            <SubmitToiletForm />
        </div>
    )
}

export default AddToiletWithLogin
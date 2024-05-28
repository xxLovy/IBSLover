import AddToiletWithLogin from '@/components/AddToiletWithLogin';
import WithoutLogin from '@/components/AddToiletWithoutLogin';
import EditToiletWithLogin from '@/components/EditToiletWithLogin';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { dummyToilets } from '../../../../../constants';
import { TFormSchema } from '@/components/SubmitToiletForm';

const page = async ({ params }: { params: { id: string } }) => {
    const { isAuthenticated } = getKindeServerSession()
    const isLoggedIn = await isAuthenticated();
    const toilet: Toilet = dummyToilets.filter((item) => (item._id === params.id))[0]
    const defaultForm: TFormSchema = {
        name: toilet.name,
        women: toilet.features!.women,
        men: toilet.features!.men,
        accessible: toilet.features!.accessible,
        children: toilet.features!.children,
        genderNeutral: toilet.features!.genderNeutral,
        free: toilet.features!.free,
        price: toilet?.price,
        notes: toilet.description,
    }

    return (
        <>
            {isLoggedIn ?
                <EditToiletWithLogin defaultForm={defaultForm} />
                :
                <WithoutLogin />
            }
        </>
    )
}

export default page
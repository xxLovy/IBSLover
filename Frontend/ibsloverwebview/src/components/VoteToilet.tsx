import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectSelectedToilets, selectToiletFromUser } from '@/redux/toilet/slice'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { voteToilet } from '@/redux/toilet/operations'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'


const VoteToilet = () => {
    const toiletIds = useAppSelector(selectSelectedToilets)
    const allToilets = useAppSelector(selectToiletFromUser)
    const toilets = allToilets.filter((item) => toiletIds.includes(item._id as string))
    const dispatch = useAppDispatch();
    const { user } = useKindeBrowserClient();

    function handleClick(_id: string): void {
        dispatch(voteToilet({ toiletId: _id, userId: user!.id }))
    }

    return (
        <Card className=' border-black'>
            <CardHeader>
                <CardTitle>Choose a Toilet to Vote</CardTitle>
                <CardDescription>There are already some toilets nearby</CardDescription>
            </CardHeader>

            <ul>
                {toilets.map((item, index) => (
                    <li className='flex justify-start rounded-sm' key={index * 1000}>
                        <CardContent className='flex hover:bg-gray-300 cursor-pointer items-center rounded-sm pl-5 border-black' onClick={() => handleClick(item._id!)}>
                            <p>{item.name}</p>
                        </CardContent>
                    </li>
                ))}
            </ul>
        </Card>

    )
}

export default VoteToilet
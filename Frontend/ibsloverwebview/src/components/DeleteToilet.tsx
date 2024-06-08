"use client";
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppDispatch } from '@/redux/hooks';
import { removeToilet } from '@/redux/toilet/operations';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Input } from './ui/input';

const DeleteToilet = ({ id }: { id: string }) => {
    const [msg, setMsg] = useState("")
    const dispatch = useAppDispatch()
    const { user } = useKindeBrowserClient();
    function handleDelete() {
        dispatch(removeToilet({ toiletId: id, userId: user?.id || "", msg: msg }))
    }


    return (
        <div className='flex flex-row p-10 w-full justify-center'>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        <Input
                            placeholder="If possible, tell us why you want to remove this toilet?"
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DeleteToilet
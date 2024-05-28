import React from 'react'
import { Button } from './ui/button'

const DeleteToilet = ({ id }: { id: string }) => {
    function handleDelete(): React.MouseEventHandler<HTMLButtonElement> | undefined {
        //TODO: dispatch
        return
    }

    return (
        <div className='flex flex-row p-10 w-full justify-center'>
            <Button onClick={handleDelete()}>
                Delete
            </Button>
        </div>
    )
}

export default DeleteToilet
"use client"
import React from 'react'
import { Button } from './ui/button'
import { useAppDispatch } from '@/redux/hooks';
import { fetchCurrentLocation } from '@/redux/pin/operations';

const PanicFooter = () => {
    const dispatch = useAppDispatch()
    const handleFind = () => {
        dispatch(fetchCurrentLocation());
    };
    return (
        <div>
            <Button onClick={() => handleFind()} className='flex w-full h-full py-2'>
                Panic!
            </Button>
        </div>
    )
}

export default PanicFooter
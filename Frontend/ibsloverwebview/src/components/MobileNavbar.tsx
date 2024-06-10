// components/MobileNavBar.tsx
import React, { useState } from 'react'
import { navlinks } from '../../constants'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const MobileNavBar = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    return (
        <header className="bg-gray-100 w-full md:hidden">
            <div className='flex justify-between items-center p-4'>
                <Link href={"/"}>
                    <Image
                        src="/icon.png"
                        alt='App Icon'
                        height={50}
                        width={50}
                    />
                </Link>
                <Sheet>
                    <SheetTrigger className='text-gray-800 focus:outline-none md:hidden'>
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d={'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </SheetTrigger>
                    <SheetContent className="sheet-content sm:w-64">
                        <ul className='flex flex-col items-center w-full h-full'>
                            {navlinks.map((item, index) => (
                                <Link href={item.route} key={index} className='flex py-5 w-2/3 justify-center rounded-md my-5 border-black bg-gray-200'>
                                    <li className='py-2 cursor-pointer' key={index}>{item.lable}</li>
                                </Link>
                            ))}

                            {isLoggedIn && <li className='flex py-5 w-2/3 justify-center rounded-md my-5 border-black bg-gray-200 mt-auto' key={-1}><LogoutLink>Logout</LogoutLink></li>}
                        </ul>

                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default MobileNavBar
import React from 'react'
import { navlinks } from '../../../constants'
import Image from 'next/image'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    return (
        <div className='flex bg-gray-100 w-full items-center'>
            <Link
                href={"/"}
            >
                <Image
                    src="/icon.png"
                    alt='App Icon'
                    height={50}
                    width={50}
                />
            </Link>
            {/* <div className='flex pl-20'>
                <ul className='flex flex-row'>
                    {isLoggedIn && <li className='pr-10 cursor-pointer hover:text-red-500 flex flex-row' key={-1}><LogoutLink>Logout</LogoutLink></li>}
                </ul>
            </div> */}


            <div className='flex w-full justify-end'>
                <ul className='flex flex-row'>
                    {isLoggedIn && <li className='pr-10 cursor-pointer hover:text-red-500 flex flex-row' key={-1}><LogoutLink>Logout</LogoutLink></li>}
                    {navlinks.map((item, index) => (
                        <Link
                            href={item.route}
                        >
                            <li className='pr-10 cursor-pointer hover:text-red-500' key={index}>{item.lable}</li>
                        </Link>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Navbar
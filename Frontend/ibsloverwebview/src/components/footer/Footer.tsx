import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { navlinks } from '../../../constants'

const Footer = () => {
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

            <div className='flex w-full justify-end'>
                <span className='pr-10 hover:text-red-500 cursor-pointer'>Private Policy</span>
                {/* <ul className='flex flex-row'>
                    {navlinks.map((item, index) => (
                        <Link
                            href={item.route}
                        >
                            <li className='pr-10 cursor-pointer hover:text-red-500' key={index}>{item.lable}</li>
                        </Link>
                    ))}
                </ul> */}
            </div>

        </div>
    )
}

export default Footer
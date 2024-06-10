import React from 'react'
import { Input } from "@/components/ui/input"

const SearchBox = () => {

    return (
        <div className='flex flex-col justify-center'>
            <span className=' font-bold'>Search</span>
            <div className="pt-2">
                <Input />
            </div>

        </div>
    )
}

export default SearchBox
import React from 'react'
import SidebarItems from './SidebarItems'
import SearchBox from './SearchBox'

const Sidebar = () => {
    return (
        <div className='bg-white w-[384px] h-auto mt-20 ml-10 rounded-2xl pt-5 pl-3 flex flex-col border-2'>
            <SearchBox />
            <SidebarItems />

        </div>
    )
}

export default Sidebar
import React from 'react'
import { addToiletText1, addToiletText2, addToiletText3 } from '../../../constants'

const WithoutLogin = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-center font-bold text-3xl p-10'>{addToiletText1}</h1>

            <p className='pl-20 lr-20'>{addToiletText2}</p>
            {/* <SigninButton/> */}
            <p className='pl-20 lr-20 text-red-600'>{addToiletText3}</p>
        </div>
    )
}

export default WithoutLogin
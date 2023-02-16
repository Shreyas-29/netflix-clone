import React from 'react'
import { CgSpinner } from 'react-icons/cg';


function Loading() {
    return (
        <div className='w-full flex items-center justify-center h-screen space-x-2'>
            <CgSpinner className='w-6 h-6 text-red-500 animate-spin' />
            <p className='text-white font-medium text-lg'>Loading...</p>
        </div>
    )
}

export default Loading

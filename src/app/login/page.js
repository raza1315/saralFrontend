import React from 'react'

function page() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[25rem] min-h-[50%] border border-slate-300 flex flex-col p-5 gap-5'>
                <p className='text-3xl text-center'>Login</p>
                <div className='w-full flex flex-col gap-2'>
                    <p className='text-xl'>Username</p>
                    <input type="text" placeholder='Enter username' className='border border-slate-300 bg-[transparent] p-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <p className='text-xl'>Password</p>
                    <input type="password" placeholder='Enter password' className='border border-slate-300 bg-[transparent] p-2' />
                </div>
                <button className='bg-blue-500 text-white p-2 hover:bg-blue-600'>SignIn</button>

            </div>
        </div>
    )
}

export default page
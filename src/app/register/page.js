"use client"
import React, { useState } from 'react'
function page() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = () => {
        if (!username || !email || !password) {
            alert('Please fill all the fields')
            return
        }
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[25rem] min-h-[70%] border border-slate-300 flex flex-col px-5 py-10 gap-5'>
                <p className='text-3xl text-center'>Register</p>
                <div className='w-full flex flex-col gap-2'>
                    <p className='text-xl'>Username</p>
                    <input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} className='border border-slate-300 bg-[transparent] p-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <p className='text-xl'>Email</p>
                    <input type="mail" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-slate-300 bg-[transparent] p-2' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <p className='text-xl'>Password</p>
                    <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-slate-300 bg-[transparent] p-2' />
                </div>
                <button onClick={handleRegister} className='bg-blue-500 text-white p-2 hover:bg-blue-600'>Signup</button>

            </div>
        </div>
    )
}

export default page
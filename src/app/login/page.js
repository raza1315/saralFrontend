"use client";
import React, { useState } from 'react';
function Page() {
    // Define state variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = () => {
        if (!username || !password) {
            alert('Please fill all the fields');
            return;
        }
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[25rem] min-h-[50%] border border-slate-300 flex flex-col p-5 gap-5">
                <p className="text-3xl text-center">Login</p>
                <div className="w-full flex flex-col gap-2">
                    <p className="text-xl">Username</p>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-slate-300 bg-[transparent] p-2"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <p className="text-xl">Password</p>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-slate-300 bg-[transparent] p-2"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white p-2 hover:bg-blue-600"
                    onClick={handleSignIn}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}
export default Page;

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignIn = async () => {
        if (!username || !password) {
            alert('Please fill all the fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                user_name: username,  // This should be 'username' or 'email'
                password: password
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                alert('Login successful');
                router.push('/');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        alert('Invalid credentials. Please check your username and password.');
                        break;
                    case 403:
                        alert('Access denied. You might not have permission to access this resource.');
                        break;
                    default:
                        alert('An unexpected error occurred. Please try again later.');
                }
                console.error('Error details:', data);
            } else {
                alert('Network error. Please check your connection.');
                console.error('Network error:', error.message);
            }
        }
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

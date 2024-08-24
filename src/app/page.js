"use client"
import React, { useEffect, useState } from 'react'

function page() {
  const [username, setUsername] = useState('')
  const [joinRoom, setJoinRoom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [passCode, setPassCode] = useState('');
  useEffect(() => {
    getUserName();
  }, [])
  const getUserName = () => {
    const loggedInUsername = localStorage.getItem('username');
    console.log(`local storage is set to : ${loggedInUsername}`);

    if (loggedInUsername) {
      setUsername(loggedInUsername);
    }
  }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5 '>
      <p className='text-5xl text-white'>Chat App</p>
      <div className='w-1/3 h-[5rem] flex bg-white justify-around items-center px-2 gap-2'>
        <p
          onClick={() => { setJoinRoom(true); setCreateRoom(false) }}
          className='text-3xl bg-gray-200 hover:text-white text-black cursor-pointer hover:bg-red-500 flex-1 text-center py-[1rem] transition-all duration-300 ease-in-out'>Join Room</p>
        <p
          onClick={() => { setCreateRoom(true); setJoinRoom(false) }}
          className='text-3xl bg-gray-200 text-black cursor-pointer hover:bg-green-400 hover:text-white flex-1 text-center py-[1rem] transition-all duration-300 ease-in-out'>Create Room</p>
      </div>
      {joinRoom && <div className='w-1/3 h-[2.5rem] bg-white flex items-center border border-white'>
        <input value={passCode} onChange={(e) => setPassCode(e.target.value)} type='text' placeholder='Enter the Room Code To Join' className='w-3/4 h-full text-xl text-black px-3 focus:outline-none' />
        <p className='w-1/4 h-full bg-red-500 text-white text-xl text-center cursor-pointer hover:bg-red-400 py-[0.4rem] border border-red-500' >Join</p>
      </div>
      }
      {createRoom &&
        <div className='w-1/3 h-[2.5rem] bg-white flex items-center border border-white'>
          <input value={passCode} onChange={(e) => setPassCode(e.target.value)} type='text' placeholder='Create Room Code' className='w-3/4 h-full text-xl text-black px-3 focus:outline-none' />
          <p className='w-1/4 h-full bg-green-500 text-white text-xl text-center cursor-pointer hover:bg-green-600 py-[0.4rem] border border-green-500' >Create</p>
        </div>
      }
    </div>
  )
}

export default page
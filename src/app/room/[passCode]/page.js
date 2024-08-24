// app/room/[passCode]/page.js
"use client";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:1337');

function Room() {
    const [roomCode, setRoomCode] = useState('');
    const [inp, setInp] = useState('');
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const { passCode } = useParams(); // Extract dynamic parameter

    useEffect(() => {
        // Get roomCode and userName from localStorage
        setRoomCode(localStorage.getItem('roomCode'));
        setUserName(localStorage.getItem('username'));

        // Join the room using the stored room code
        if (passCode) {
            socket.emit('joinRoom', passCode);
        }

        // Listen for messages from the server
        const handleNewMessage = (data) => {
            console.log("Message received: ", data.message, " by ", data.name, " in room ", data.roomCode);
            const { name, message } = data;

            // Only update the state if the message is from the correct room and is not from the current user
            if (data.roomCode === passCode && data.name !== userName) {
                setMessages((prevMessages) => [...prevMessages, { message, name }]);
            }
        };

        socket.on('frontendmessage', handleNewMessage);

        // Cleanup function to remove the event listener when the component unmounts or passCode changes
        return () => {
            socket.off('frontendmessage', handleNewMessage);
        };
    }, [passCode, userName]);

    if (!passCode) {
        return <div>Loading...</div>;
    }

    const sendMessage = () => {
        if (inp.trim() === '') return;

        const payload = {
            roomCode: passCode,
            message: inp,
            name: userName
        };

        // Emit the message to the server
        socket.emit('message', payload);

        // Add the message to the current user's message list
        setMessages((prevMessages) => [...prevMessages, { message: inp, name: userName }]);
        setInp('');
    };

    return (
        <div>
            <h1>Room Code: {passCode}</h1>
            <div className='w-1/2 flex items-center bg-white rounded absolute bottom-5 left-50% translate-x-[50%] overflow-hidden'>
                <input
                    value={inp}
                    onChange={(e) => setInp(e.target.value)}
                    type='text'
                    placeholder='Enter message'
                    className='p-2 w-3/4 h-10 bg-white text-black text-xl outline-none '
                />
                <button
                    onClick={sendMessage}
                    className='p-2 w-1/4 h-10 bg-red-500 transition-all duration-300 ease-in-out hover:bg-green-500 text-white text-xl outline-none rounded'
                >
                    Send
                </button>
            </div>
            {messages.length > 0 && messages.map((message, index) => (
                <div key={index} className="flex flex-col py-2 px-4">
                    {message.name === userName ? <p className='text-xl text-white text-right'><span className='text-red-500 font-bold'>You:</span> {message.message}</p> : <p className='text-xl text-white'><span className='text-green-500 font-bold'>{message.name}:</span>  {message.message}</p>}
                </div>
            ))}
        </div>
    );
}

export default Room;

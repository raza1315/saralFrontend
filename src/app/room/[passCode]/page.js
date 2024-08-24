"use client";
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useRouter, useParams } from 'next/navigation';

const socket = io('http://localhost:1337');

function Room() {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState('');
    const [inp, setInp] = useState('');
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { passCode } = useParams(); // Extract dynamic parameter

    const messagesEndRef = useRef(null); // Ref to the end of the messages container

    useEffect(() => {
        setRoomCode(localStorage.getItem('roomCode'));
        setUserName(localStorage.getItem('username'));

        // Join the room when the component mounts
        if (roomCode) {
            socket.emit('joinRoom', roomCode, userName);
        }

        // Listen for messages from the server
        const handleNewMessage = (data) => {
            console.log("Message received: ", data.message, " by ", data.name, " in room ", data.roomCode);
            const { name, message } = data;

            if (data.roomCode === passCode && data.name !== userName) {
                setMessages((prevMessages) => [...prevMessages, { message, name }]);
            }
        };

        // Listen for online users updates
        const handleUsersUpdate = (users) => {
            setOnlineUsers(users);
        };

        socket.on('frontendmessage', handleNewMessage);
        socket.on('updateUsers', handleUsersUpdate);

        // Cleanup function to remove event listeners when the component unmounts or passCode changes
        return () => {
            socket.off('frontendmessage', handleNewMessage);
            socket.off('updateUsers', handleUsersUpdate);
        };
    }, [passCode, roomCode, userName]);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const handleExit = () => {
        // Remove room code and redirect to home page
        localStorage.removeItem('roomCode');
        // remove user from online users
        socket.emit('leaveRoom', passCode, userName);
        router.push('/');
    };

    return (
        <div>
            <h1 className='text-3xl text-center mt-2 underline'>Room {passCode}</h1>
            <p
                onClick={handleExit}
                className='text-3xl absolute top-2 right-5 bg-red-500 text-white rounded px-2 cursor-pointer'>
                Exit
            </p>
            <div className='w-1/2 flex items-center bg-white rounded absolute bottom-5 left-50% translate-x-[50%] overflow-hidden'>
                <input
                    value={inp}
                    onChange={(e) => setInp(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type='text'
                    placeholder='Enter message'
                    className='p-2 w-3/4 h-10 bg-white text-black text-xl outline-none '
                />
                <button
                    onClick={sendMessage}
                    className='p-2 w-1/4 h-10 bg-red-500 transition-all duration-300 ease-in-out hover:bg-green-500 text-white text-xl outline-none rounded'>
                    Send
                </button>
            </div>
            <div className='flex flex-col w-1/2 h-[70vh] m-auto overflow-auto bg-gray-800 mt-2 hide-scrollbar'>
                {messages.length > 0 && messages.map((message, index) => (
                    <div key={index} className="flex flex-col py-2 px-4">
                        {message.name === userName ?
                            <div className='flex flex-col'>
                                <p className='text-red-500 font-bold text-xl text-right'>You:</p>
                                <p className='text-xl text-white text-right'>{message.message}</p>
                            </div> :
                            <div className='flex flex-col'>
                                <p className='text-green-500 font-bold text-xl text-left'>{message.name}: </p>
                                <p className='text-xl text-white text-left'>{message.message}</p>
                            </div>}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
            </div>
            <div className='w-1/2 mt-4 m-auto '>
                <h2 className='text-2xl font-bold mb-2'>Online Users</h2>
                <ul className='list-disc pl-5 gap-2 flex flex-row'>
                    {onlineUsers.map((user, index) => (
                        <p key={index} className='text-lg text-white'>{user}</p>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Room;

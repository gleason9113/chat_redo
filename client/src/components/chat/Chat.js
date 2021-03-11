import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client/dist/socket.io';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [channel, setChannel] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, channel } = queryString.parse(window.location.search);

        socket = io(ENDPOINT);
        
        setName(name);
        setChannel(channel);

        socket.emit('join', { name, channel }, ({ error }) => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, window.location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    
    return (
        <h1>Chat</h1>
    )
}

export default Chat;
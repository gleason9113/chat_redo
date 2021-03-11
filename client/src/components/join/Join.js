import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [channel, setChannel] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Register</h1>
                <div><input placeholder="Name" className="joinInput mt-20" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Channel" className="joinInput mt-20" type="text" onChange={(event) => setChannel(event.target.value)} /></div>
                <Link onClick={event => (!name || !channel) ? event.preventDefault() : null} to={`/chat?name=${name}&channel=${channel}`}>
                    <button className="button mt-20" type="submit">Join Channel</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you have axios installed
import '../styles/Spotify.css';

const Spotify = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/spotify/sampleData')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    return (
        <div>
            <h1>Spotify Integration Page</h1>
            <p>Here is some sample content:</p>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>Track: {item.Title}, Duration: {item.Duration}</li>
                ))}
            </ul>
        </div>
    );
}

export default Spotify;

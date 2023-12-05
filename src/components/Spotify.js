import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you have axios installed
import '../styles/Spotify.css';

const Spotify = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/spotify/sampleData')
            .then(response => {
                console.log('Received data from backend:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from backend:', error);
            })
    }, []);

    return (
        <div>
            <h1>Spotify Integration Page</h1>
            <p>Here is some sample content:</p>
            <ul>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <li key={index}>Track: {item.track}, Artist: {item.artist}, Album: {item.album}, Duration: {item.duration}</li>
                    ))
                ) : (
                    <p>No data to display.</p>
                )}
            </ul>
        </div>
    );
}

export default Spotify;

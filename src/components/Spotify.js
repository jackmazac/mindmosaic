import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you have axios installed
import '../styles/Spotify.css';

const Spotify = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/sampleData')
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
                        <li key={index}>Track: {item.Title}, Artist: {item.ArtistID}, Album: {item.AlbumID}, Duration: {item.Duration}</li> // Replace 'Title', 'ArtistID', 'AlbumID', and 'Duration' with the names of the columns in your table
                    ))
                ) : (
                    <p>No data to display.</p>
                )}
            </ul>
        </div>
    );
}

export default Spotify;

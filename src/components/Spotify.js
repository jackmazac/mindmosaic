import React from 'react';
import '../styles/Spotify.css';

class Spotify extends React.Component {
    render() {
        return (
            <div>
                <h1>Spotify Integration Page</h1>
                <p>Here is some sample content:</p>
                <ul>
                    <li>Track: Song 1, Duration: 00:03:30, Album: Album 1, Artist: Artist 1</li>
                    <li>Track: Song 2, Duration: 00:04:00, Album: Album 2, Artist: Artist 2</li>
                </ul>
            </div>
        );
    }
}

export default Spotify;

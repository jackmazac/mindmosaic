import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Spotify = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);

    // Pagination Logic
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    // Ensure at least 3 songs are displayed
    const currentSongs = songs.length >= 3 ? songs.slice(indexOfFirstSong, indexOfLastSong) : songs;

    // Update Pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Fetch songs with filters
    useEffect(() => {
        setLoading(true);
        const filterParam = searchTerm ? `?filter=${encodeURIComponent(searchTerm)}` : '';

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/spotify/songs${filterParam}`)
            .then(response => {
                setSongs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, [filter]);





    // UI for filtering songs
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Form submission handler for adding a song
    const handleAddSongFormSubmit = (event) => {
        event.preventDefault();
        const newSong = {
            title: event.target.title.value,
            albumId: event.target.albumId.value,
            duration: event.target.duration.value
            // other song properties
        };
        addSong(newSong);
    };

    // Add a song
    const addSong = (newSong) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/spotify/songs/add`, newSong)
            .then(response => {
                setSongs([...songs, response.data]);
                setSuccessMessage('Song added successfully'); // Updated to show success message
            })
            .catch(error => setError('Error adding song'));
    };

    // Function to update a song
    const updateSong = (updatedSong) => {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/spotify/songs/update/${updatedSong.id}`, updatedSong)
            .then(response => {
                setSongs(songs.map(song => song.id === updatedSong.id ? response.data : song));
                setSuccessMessage('Song updated successfully');
            })
            .catch(error => setError('Error updating song'));
    };

    // Soft delete a song
    const deleteSong = (songId) => {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/spotify/songs/delete/${songId}`)
            .then(() => {
                setSongs(songs.filter(song => song.id !== songId));
                setSuccessMessage('Song deleted successfully'); // Updated to show success message
            })
            .catch(error => setError('Error deleting song'));
    };

    // Export data
    const exportData = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/spotify/exportData`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SongsReport.csv');
                document.body.appendChild(link);
                link.click();
                setSuccessMessage('Data exported successfully'); // Updated to show success message
            })
            .catch(error => setError('Error exporting data'));
    };

    // Render songs
    const renderTopSongs = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        const topSongs = songs.slice(0, 3);
        return topSongs.map((song, index) => (
            <div key={song.id || index} className="song-entry">
                <span>{song.title}</span>
                <span>{song.artist}</span>
                <span>{song.duration}</span>
                <span>{song.album}</span>
                <button onClick={() => confirmEdit(song.id)}>Edit</button>
            </div>
        ));
    };

    const renderSongs = () => {
        // ... rest of the renderSongs function
    };

    // Implement Confirm Edit
    const confirmEdit = (songId) => {
        // ... implementation for editing a song
    };


        return currentSongs.map((song, index) => (
            <div key={song.id || index}>
                <h3>{song.title}</h3>
                {/* other song details */}
                <button onClick={() => confirmDelete(song.id)}>Delete</button> {/* Delete button next to song */}
            </div>
        ));
    };

    // Add Pagination Component
    const Pagination = ({ songsPerPage, totalSongs, paginate }) => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalSongs / songsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    // Implement Confirm Deletion
    const confirmDelete = (songId) => {
        if (window.confirm('Are you sure you want to delete this song?')) {
            deleteSong(songId);
        }
    };

    // Display success messages
    const renderSuccessMessage = () => {
        return successMessage ? <div className="success-message">{successMessage}</div> : null;
    };

    return (
        <div className="spotify-page">
            <h1 style={{ textAlign: 'center' }}>Spotify Integration Page</h1>
            <div className="spotify-layout">
                <div className="spotify-left-column">
                    <h2>Your Songs</h2>
                    {renderTopSongs()}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search Songs"
                    />
                </div>
                <div className="spotify-right-column">
                    <h2>Add New Song</h2>
                    <form onSubmit={handleAddSongFormSubmit}>
                        <input type="text" name="title" placeholder="Song Title" />
                        <input type="text" name="artist" placeholder="Artist" />
                        <input type="text" name="duration" placeholder="Duration" />
                        <input type="text" name="album" placeholder="Album" />
                        <button type="submit">Add Song</button>
                    </form>
                </div>
            </div>
            {renderSuccessMessage()}
            <div className="spotify-songs-list">
                {renderSongs()}
            </div>
            <button onClick={exportData}>Export Data</button>
            <Pagination songsPerPage={songsPerPage} totalSongs={songs.length} paginate={paginate} />
        </div>
    );
};

export default Spotify;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Spotify = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);

    // Pagination Logic
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    // Update Pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);


    // Fetch songs with filters
    useEffect(() => {
        setLoading(true);
        axios.get(`/sampleData?filter=${filter}`)
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
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Form submission handler for adding a song
    const handleAddSongFormSubmit = (event) => {
        event.preventDefault();
        const newSong = {
            title: event.target.title.value,
            // other song properties
        };
        addSong(newSong);
    };

    // Add a song
    const addSong = (newSong) => {
        axios.post('/songs/add', newSong)
            .then(response => {
                setSongs([...songs, response.data]);
            })
            .catch(error => setError('Error adding song'));
    };

    // Function to update a song
    const updateSong = (updatedSong) => {
        axios.put(`/songs/update/${updatedSong.id}`, updatedSong)
            .then(response => {
                setSongs(songs.map(song => song.id === updatedSong.id ? response.data : song));
                setSuccessMessage('Song updated successfully');
            })
            .catch(error => setError('Error updating song'));
    };

    // Soft delete a song
    const deleteSong = (songId) => {
        axios.put(`/songs/delete/${songId}`)
            .then(() => {
                setSongs(songs.filter(song => song.id !== songId));
            })
            .catch(error => setError('Error deleting song'));
    };

    // Export data
    const exportData = () => {
        axios.get('/exportData', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SongsReport.csv'); // or '.xlsx'
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => setError('Error exporting data'));
    };

    // Render songs
    const renderSongs = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return songs.map(song => (
            <div key={song.id}>
                <h3>{song.title}</h3>
                {/* other song details */}
                <button onClick={() => deleteSong(song.id)}>Delete</button>
                {/* Update form or button can be here */}
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

// Updated Delete Button in renderSongs
// <button onClick={() => confirmDelete(song.id)}>Delete</button>

// Display success messages
const renderSuccessMessage = () => {
    return successMessage ? <div className="success-message">{successMessage}</div> : null;
};


return (
    <div>
        <h1>Spotify Integration Page</h1>
        <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter Songs" />
        {renderSuccessMessage()}
        <form onSubmit={handleAddSongFormSubmit}>
            <input type="text" name="title" placeholder="Song Title" />
            {/* Other fields for song details */}
            <button type="submit">Add Song</button>
        </form>
        {renderSongs()}
        <button onClick={exportData}>Export Data</button>
        <Pagination songsPerPage={songsPerPage} totalSongs={songs.length} paginate={paginate} />
    </div>
);
};

export default Spotify;
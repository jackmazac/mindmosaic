import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Spotify.css';

const Spotify = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [exporting, setExporting] = useState(false);
    const [editingSong, setEditingSong] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;

    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchSongs();
    }, [searchTerm, currentPage]);

    const fetchSongs = () => {
        setLoading(true);
        const filterParam = searchTerm ? `?filter=${encodeURIComponent(searchTerm)}` : '';
        axios.get(`${apiUrl}/spotify/songs${filterParam}`)
            .then(response => {
                setSongs(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching songs');
                setLoading(false);
            });
    };

    const handleExportData = () => {
        setExporting(true);
        axios({
            url: `${apiUrl}/spotify/exportData`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'SongsData.csv'); // or any other extension
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();
            setExporting(false);
        }).catch(() => {
            setError('Could not export data.');
            setExporting(false);
        });
    };

    const handleAddSongFormSubmit = (event) => {
        event.preventDefault();
        const newSong = {
            title: event.target.title.value,
            artist: event.target.artist.value,
            duration: event.target.duration.value,
            album: event.target.album.value,
        };

        axios.post(`${apiUrl}/spotify/songs/add`, newSong)
            .then(response => {
                fetchSongs(); // Fetch the updated list of songs including the new one
                setSuccessMessage('Song added successfully');
                setError('');
            })
            .catch(err => {
                console.error('Error adding song:', err.response ? err.response.data : err);
                setError('Error adding song: ' + (err.response ? err.response.data.error : 'Unknown error'));
            });
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const updatedSong = {
            title: event.target.title.value,
            artist: event.target.artist.value,
            duration: event.target.duration.value,
            album: event.target.album.value,
        };

        axios.put(`${apiUrl}/spotify/songs/update/${editingSong.SongID}`, updatedSong)
            .then(response => {
                setSongs(prevSongs => prevSongs.map(song => song.SongID === editingSong.SongID ? { ...song, ...updatedSong } : song));
                setSuccessMessage('Song updated successfully');
                setError('');
                closeEditModal();
            })
            .catch(err => {
                setError('Error updating song');
                console.error('Error updating song:', err.response ? err.response.data : err);
            });
    };

    const handleDeleteSong = (songId) => {
        axios.delete(`${apiUrl}/spotify/songs/delete/${songId}`)
            .then(() => {
                setSongs(songs.filter(song => song.SongID !== songId));
                setSuccessMessage('Song deleted successfully');
                setError('');
            })
            .catch(err => setError('Error deleting song'));
    };

    const openEditModal = (song) => {
        setEditingSong(song);
        setIsEditModalOpen(true);
    };


    const EditSongModal = () => {
        if (!isEditModalOpen || !editingSong) return null;

        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={closeEditModal}>&times;</span>
                    <form onSubmit={handleEditFormSubmit}>
                        <input type="text" name="title" defaultValue={editingSong.Title} placeholder="Song Title" required />
                        <input type="text" name="artist" defaultValue={editingSong.Artist} placeholder="Artist" required />
                        <input type="text" name="duration" defaultValue={editingSong.Duration} placeholder="Duration" required />
                        <input type="text" name="album" defaultValue={editingSong.Album} placeholder="Album" required />
                        <button type="submit">Update Song</button>
                    </form>
                </div>
            </div>
            <div className="export-section">
                <button onClick={handleExportData} disabled={exporting}>
                    {exporting ? 'Exporting...' : 'Export Song Data'}
                </button>
            </div>
        );
    };


    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingSong(null);
    };

    const renderEditModal = () => {
        if (!isEditModalOpen || !editingSong) return null;
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={closeEditModal}>&times;</span>
                    <form onSubmit={handleEditFormSubmit}>
                        <input type="text" name="title" defaultValue={editingSong.title} placeholder="Song Title" />
                        {/* Add other fields for song properties */}
                        <button type="submit">Update Song</button>
                    </form>
                </div>
            </div>
            <div className="export-section">
                <button onClick={handleExportData} disabled={exporting}>
                    {exporting ? 'Exporting...' : 'Export Song Data'}
                </button>
            </div>
        );
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderSearchBar = () => {
        return (
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Songs"
            />
        );
    };

    const renderAddSongForm = () => {
        return (
            <form onSubmit={handleAddSongFormSubmit}>
                <input type="text" name="title" placeholder="Song Title" />
                <input type="text" name="artist" placeholder="Artist" />
                <input type="text" name="duration" placeholder="Duration" />
                <input type="text" name="album" placeholder="Album" />
                <button type="submit">Add Song</button>
            </form>
        );
    };


    const renderSongs = () => {
        const indexOfLastSong = currentPage * songsPerPage;
        const indexOfFirstSong = indexOfLastSong - songsPerPage;
        const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

        return currentSongs.map((song, index) => (
            <div key={song.SongID || index} className="song-item">
                <h3>{song.Title}</h3>
                <div>Artist: {song.Artist}</div>
                <div>Album: {song.Album}</div>
                <div>Duration: {song.Duration}</div>
                <button onClick={() => handleDeleteSong(song.SongID)}>Delete</button>
                <button onClick={() => openEditModal(song)}>Edit</button>
            </div>
        ));
    };

    const Pagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(songs.length / songsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => {
                                setCurrentPage(number);
                            }} href="#" className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    const renderSuccessErrorMessages = () => {
        return (
            <div>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="export-section">
                <button onClick={handleExportData} disabled={exporting}>
                    {exporting ? 'Exporting...' : 'Export Song Data'}
                </button>
            </div>
        );
    };

    return (
        <div className="spotify-page">
            <div className="spotify-layout">
                <div className="spotify-left-column">
                    {renderSearchBar()}
                    {renderSuccessErrorMessages()}
                    {renderSongs()}
                    <Pagination />
                <div className="export-section">
                    <button onClick={handleExportData} disabled={exporting}>
                        {exporting ? 'Exporting...' : 'Export Song Data'}
                    </button>
                </div>
                </div>
                <div className="spotify-right-column">
                    {renderAddSongForm()}
                </div>
            </div>
            {isEditModalOpen && <EditSongModal />}
        </div>
    );
    };

    export default Spotify;

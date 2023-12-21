import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`/api/search?term=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        console.log(results);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
        </form>
    );
}

export default SearchBar;

import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can handle the search term, for example, send it to the API
        const response = await fetch(`/api/search?term=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        // Now you have the search results, you can do something with them
        console.log(results);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
        </form>
    );
}

export default SearchBar;

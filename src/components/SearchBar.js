import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the search term, for example, send it to the API
        console.log(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
        </form>
    );
}

export default SearchBar;

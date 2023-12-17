import React from 'react';
import { Link } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import SearchBar from './SearchBar';
import logo from '../assets/tunify.png';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/spotify">Spotify</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <SearchBar />
        </nav>
    );
}

export default NavigationBar;

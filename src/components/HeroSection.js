import React from 'react';
import './HeroSection.css'; // Assuming you have a corresponding CSS file for styles

const HeroSection = () => {
    return (
        <div className="hero-section">
            <h1 className="hero-headline">Welcome to Tunify</h1>
            <p>Track and manage your content across various platforms like Spotify.</p>
            <button className="hero-cta-button">Get Started</button>
        </div>
    );
};

export default HeroSection;

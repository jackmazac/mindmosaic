import React from 'react';
import './HomePage.css';
import Footer from '../components/Footer';

import './HomePage.css';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            {/* <HeroSection /> */}

            <HeroSection />
            {/* Features Overview Section */}
            {/* <FeaturesOverview /> */}

            {/* Spotify Integration Highlight */}
            {/* <SpotifyIntegration /> */}

            {/* User Testimonials Carousel */}
            <TestimonialsCarousel />

            {/* Latest Content Display */}
            {/* <LatestContent /> */}

            {/* Registration CTA */}
            {/* <RegistrationCTA /> */}

            {/* Enhanced Footer */}
            <Footer />
        </div>
    );
}

export default HomePage;

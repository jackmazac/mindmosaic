import React from 'react';
import './FeaturesOverview.css'; // Make sure to create a corresponding CSS file for styles

const FeaturesOverview = () => {
    return (
        <div className="features-overview">
            <div className="feature-card">
                <h3>Unified Music Library</h3>
                <p>Combine your playlists and favorites from multiple platforms into one seamless experience.</p>
            </div>
            <div className="feature-card">
                <h3>Content Discovery</h3>
                <p>Discover new music and podcasts based on your listening habits and preferences.</p>
            </div>
            <div className="feature-card">
                <h3>Listening Analytics</h3>
                <p>Get insights into your listening trends and track your audio consumption over time.</p>
            </div>
        </div>
    );
};

export default FeaturesOverview;

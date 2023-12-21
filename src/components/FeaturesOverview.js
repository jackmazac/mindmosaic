import React from 'react';
import './FeaturesOverview.css'; // Make sure to create a corresponding CSS file for styles

const FeaturesOverview = () => {
    return (
        <div className="features-overview">
            <div className="feature-card">
                <h3>Feature One</h3>
                <p>Description of feature one.</p>
            </div>
            <div className="feature-card">
                <h3>Feature Two</h3>
                <p>Description of feature two.</p>
            </div>
            <div className="feature-card">
                <h3>Feature Three</h3>
                <p>Description of feature three.</p>
            </div>
        </div>
    );
};

export default FeaturesOverview;

import React from 'react';
import NavigationBar from '../components/NavigationBar';
import ContentCard from '../components/ContentCard';
import SocialInteraction from '../components/SocialInteraction';
import Footer from '../components/Footer';

const ContentPage = ({ content }) => {
    return (
        <div>
            <NavigationBar />
            <ContentCard title={content.title} content={content.content} />
            <SocialInteraction likes={content.likes} comments={content.comments} />
            <Footer />
        </div>
    );
}

export default ContentPage;

import React from 'react';
import './HomePage.css';
import NavigationBar from '../components/NavigationBar';
import ContentList from '../components/ContentList';
import Footer from '../components/Footer';

const HomePage = () => {
    const contents = [
        { title: 'Content 1', content: 'This is content 1' },
        { title: 'Content 2', content: 'This is content 2' },
        { title: 'Content 3', content: 'This is content 3' },
    ];

    return (
        <div>
            <p>MindMosaic is a platform that allows users to explore and interact with a variety of content in a unique and engaging way. Our goal is to provide a space where users can discover new ideas, connect with others, and express themselves creatively.</p>
            <ContentList contents={contents} />
            <Footer />
        </div>
    );
}

export default HomePage;

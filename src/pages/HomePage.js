import React from 'react';
import './HomePage.css';
import NavigationBar from '../components/NavigationBar';
import ContentList from '../components/ContentList';
import Footer from '../components/Footer';

const HomePage = () => {
    const contents = [
        { title: 'Tunify', content: 'Tunify is a platform that allows users to explore and interact with a variety of content in a unique and engaging way.' },
        { title: 'Our Goal', content: 'Our goal is to provide a space where users can discover new ideas, connect with others, and express themselves creatively.' },
        { title: 'Join Us', content: 'Join us in creating a community of creative minds and explorers.' },
    ];

    return (
        <div>
            <ContentList contents={contents} />
            <Footer />
        </div>
    );
}

export default HomePage;

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
        { title: 'Spotify Integration', content: 'With our Spotify integration, you can easily access your favorite tracks, albums, and artists. You can also search for new music and discover hidden gems.' },
        { title: 'User Registration', content: 'Our user registration feature allows you to create a personal account and save your preferences for a more personalized experience.' },
        { title: 'Contact Us', content: 'We hope you enjoy using our website. If you have any questions or feedback, please don\'t hesitate to contact us. We are always here to help!' },
    ];

    return (
        <div>
            <ContentList contents={contents} />
            <Footer />
        </div>
    );
}

export default HomePage;

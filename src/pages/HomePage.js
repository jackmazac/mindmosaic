import React from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
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
            <NavigationBar />
            <SearchBar />
            <ContentList contents={contents} />
            <Footer />
        </div>
    );
}

export default HomePage;

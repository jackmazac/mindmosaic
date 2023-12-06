import React from 'react';
import NavigationBar from '../components/NavigationBar';
import UserProfile from '../components/UserProfile';
import ContentList from '../components/ContentList';
import Footer from '../components/Footer';

const UserDashboard = ({ user, contents }) => {
    return (
        <div>
            <NavigationBar />
            <UserProfile name={user.name} email={user.email} />
            <ContentList contents={contents} />
            <Footer />
        </div>
    );
}

export default UserDashboard;

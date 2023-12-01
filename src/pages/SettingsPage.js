import React from 'react';
import NavigationBar from '../components/NavigationBar';
import UserSettings from '../components/UserSettings';
import Footer from '../components/Footer';

const SettingsPage = ({ user }) => {
    return (
        <div>
            <NavigationBar />
            <UserSettings name={user.name} email={user.email} />
            <Footer />
        </div>
    );
}

export default SettingsPage;

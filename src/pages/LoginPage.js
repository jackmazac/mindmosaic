import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/login', { username, password })
            .then(response => {
                // Handle successful login here, e.g., store the token, redirect to a dashboard, etc.
                console.log('Login successful:', response.data);
                history.push('/dashboard'); // Redirect to the dashboard page or wherever appropriate
            })
            .catch(error => {
                // Handle login error here, e.g., show an error message to the user
                console.error('Login error:', error.response ? error.response.data : error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={handleInputChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default LoginPage;

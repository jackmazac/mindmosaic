import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/users/login`, { username, password })
            .then(response => {
                // Handle successful login here, e.g., store the token, redirect to a dashboard, etc.
                console.log('Login successful:', response.data);
                navigate('/dashboard'); // Redirect to the dashboard page or wherever appropriate
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

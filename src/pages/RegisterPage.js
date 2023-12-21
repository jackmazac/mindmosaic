import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/users/register`, { username, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                setSuccessMessage('Registration successful');
                setError('');
                navigate('/login'); // Redirect to the login page after successful registration
            })
            .catch(err => {
                console.error('Registration error:', err.response ? err.response.data : err);
                setError('Registration failed. ' + (err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Unknown error'));
            });
    };

    const renderErrorMessage = () => {
        return error && <div className="error-message">{error}</div>;
    };

    const renderSuccessMessage = () => {
        return successMessage && <div className="success-message">{successMessage}</div>;
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            {renderErrorMessage()}
            {renderSuccessMessage()}
            <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={handleInputChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={handleInputChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={handleInputChange} required />
                </label>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
        </div>
    );
}

export default RegisterPage;

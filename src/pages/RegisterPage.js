import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/users/register', { username, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                navigate('/login'); // Redirect to the login page after successful registration
            })
            .catch(error => {
                setError('Registration failed. ' + (error.response ? error.response.data.error : 'Unknown error'));
                console.error('Registration error:', error.response ? error.response.data : error);
            });
    };

    const renderErrorMessage = () => {
        return error && <div className="error-message">{error}</div>;
    };

    return (
        <div>
            <h1>Register</h1>
            {renderErrorMessage()}
            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default RegisterPage;

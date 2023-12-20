import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default LoginPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginRegisterPage = () => {
    // State for login form
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // State for register form
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const history = useHistory();

    // Handle input change for login form
    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'loginUsername') setLoginUsername(value);
        if (name === 'loginPassword') setLoginPassword(value);
    };

    // Handle input change for register form
    const handleRegisterInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'registerUsername') setRegisterUsername(value);
        if (name === 'registerEmail') setRegisterEmail(value);
        if (name === 'registerPassword') setRegisterPassword(value);
    };

    // Handle login form submission
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/login', { username: loginUsername, password: loginPassword })
            .then(response => {
                // Handle successful login here
                console.log('Login successful:', response.data);
                history.push('/dashboard');
            })
            .catch(error => {
                // Handle login error here
                console.error('Login error:', error.response ? error.response.data : error);
            });
    };

    // Handle register form submission
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/register', { username: registerUsername, email: registerEmail, password: registerPassword })
            .then(response => {
                // Handle successful registration here
                console.log('Registration successful:', response.data);
                history.push('/login'); // Redirect to the login page or wherever appropriate
            })
            .catch(error => {
                // Handle registration error here
                console.error('Registration error:', error.response ? error.response.data : error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>
                    Username:
                    <input type="text" name="loginUsername" value={loginUsername} onChange={handleLoginInputChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="loginPassword" value={loginPassword} onChange={handleLoginInputChange} />
                </label>
                <input type="submit" value="Login" />
            </form>

            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
                <label>
                    Username:
                    <input type="text" name="registerUsername" value={registerUsername} onChange={handleRegisterInputChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="registerEmail" value={registerEmail} onChange={handleRegisterInputChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="registerPassword" value={registerPassword} onChange={handleRegisterInputChange} />
                </label>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default LoginRegisterPage;

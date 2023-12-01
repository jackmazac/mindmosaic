import React from 'react';

const LoginRegisterPage = () => {
    return (
        <div>
            <h1>Login/Register</h1>
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

export default LoginRegisterPage;

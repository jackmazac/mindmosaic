const UserModel = require('../models/UserModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = 'secret';

const UserController = {
    getAllUsers: function(req, res) {
        UserModel.get(function(err, users) {
            if (err) {
                res.status(500).json({ error: 'Error fetching users', details: err });
            } else {
                res.json(users);
            }
        });
    },

    register: function(req, res) {
        const { username, email, password } = req.body;
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
            }
            const hash = derivedKey.toString('hex');
            UserModel.register({ username, email, password: hash, salt }, function(err, user) {
                if (err) {
                    return res.status(500).json({ error: 'Error registering new user', details: err.message });
                } else {
                    const token = jwt.sign({ userId: user.id, username: username }, secretKey, { expiresIn: '1h' });
                    res.status(201).json({ message: 'User registered successfully', userId: user.id, token: token });
                }
            });
        });
    },

    loginUser: function(req, res) {
        const { username, password } = req.body;
        UserModel.getByUsername(username, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else if (user) {
                crypto.pbkdf2(password, user.Salt, 1000, 64, 'sha512', (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error verifying password' });
                    }
                    if (hash.toString('hex') === user.Password) {
                        const token = jwt.sign({ userId: user.UserID, username: username }, secretKey, { expiresIn: '1h' });
                        res.json({ message: 'Login successful', token: token });
                    } else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    },

    getUserById: function(req, res) {
        UserModel.getById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error fetching user', details: err });
            } else if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    },

    deleteUser: function(req, res) {
        UserModel.delete(req.params.id, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error deleting user', details: err });
            } else if (user) {
                res.json({ message: 'User deleted successfully', userId: user.id });
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
        );
    },

    updateUser: function(req, res) {
        UserModel.update(req.params.id, req.body, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                res.json(user);
            }
        });
    }
};

module.exports = UserController;


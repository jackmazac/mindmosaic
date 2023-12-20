const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = {
    getAllUsers: function(req, res) {
        UserModel.get(function(err, users) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                res.json(users);
            }
        });
    },

    register: function(req, res) {
        const { username, email, password } = req.body;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
            }
            UserModel.register({ username, email, password: hash }, function(err, user) {
                if (err) {
                    res.status(500).json({ error: 'Error registering new user', details: err });
                } else {
                    res.status(201).json({ message: 'User registered successfully', userId: user.id });
                }
            });
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                res.json(user);
            }
        });
        });
    },

    loginUser: function(req, res) {
        const { username, password } = req.body;
        UserModel.getByUsername(username, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            // TODO: Generate a token or session for the user
                            res.json({ message: 'Login successful', userId: user.id });
                        } else {
                            res.status(401).json({ error: 'Invalid credentials' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
        });
    },

    getUserById: function(req, res) {
        UserModel.getById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            // TODO: Generate a token or session for the user
                            res.json({ message: 'Login successful', userId: user.id });
                        } else {
                            res.status(401).json({ error: 'Invalid credentials' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
        });
    },

    addUser: function(req, res) {
        UserModel.add(req.body, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            // TODO: Generate a token or session for the user
                            res.json({ message: 'Login successful', userId: user.id });
                        } else {
                            res.status(401).json({ error: 'Invalid credentials' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
        });
    },

    deleteUser: function(req, res) {
        UserModel.delete(req.params.id, function(err, user) {
            if (err) {
                res.status(500).json({ error: 'Error logging in', details: err });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (result) {
                            // TODO: Generate a token or session for the user
                            res.json({ message: 'Login successful', userId: user.id });
                        } else {
                            res.status(401).json({ error: 'Invalid credentials' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
        });
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
    // ... other methods ...
};

module.exports = UserController;

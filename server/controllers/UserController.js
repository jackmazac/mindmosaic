const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = {
    getAllUsers: function(req, res) {
        UserModel.get(function(err, users) {
            if (err) {
                res.status(500).send(err);
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
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
        });
    },

    loginUser: function(req, res) {
        UserModel.login(req.body, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    },

    getUserById: function(req, res) {
        UserModel.getById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    },

    addUser: function(req, res) {
        UserModel.add(req.body, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    },

    deleteUser: function(req, res) {
        UserModel.delete(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    },

    updateUser: function(req, res) {
        UserModel.update(req.params.id, req.body, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    }
};

module.exports = UserController;

const db = require('../config/dbConfig');

const User = {
    get: function(callback) {
        return db.query('SELECT * from users', callback);
    },

    register: function(User, callback) {
        return db.query(
            'INSERT into users (username,password,email) values(?,?,?)',
            [User.username, User.password, User.email],
            callback
        );
    },

    login: function(User, callback) {
        return db.query(
            'SELECT * from users where username=? and password=?',
            [User.username, User.password],
            callback
        );
    },

    getById: function(id, callback) {
        return db.query('SELECT * from users where id=?', [id], callback);
    },

    add: function(User, callback) {
        return db.query(
            'INSERT into users (username,password,email) values(?,?,?)',
            [User.username, User.password, User.email],
            callback
        );
    },

    delete: function(id, callback) {
        return db.query('DELETE from users where id=?', [id], callback);
    },

    update: function(id, User, callback) {
        return db.query(
            'UPDATE users set username=?, password=?, email=? where id=?',
            [User.username, User.password, User.email, id],
            callback
        );
    }
};

module.exports = User;

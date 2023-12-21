const db = require('../db');

const User = {
    get: function(callback) {
        db.all('SELECT * FROM Users', callback);
    },

    register: function(user, callback) {
        const query = 'INSERT INTO Users (Username, Email, Password, Salt) VALUES (?, ?, ?, ?)';
        const params = [user.username, user.email, user.password, user.salt];
        db.run(query, params, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { id: this.lastID });
            }
        });
    },

    getByUsername: function(username, callback) {
        db.get('SELECT * FROM Users WHERE Username=?', [username], callback);
    },

    getById: function(id, callback) {
        db.get('SELECT * FROM Users WHERE UserID=?', [id], callback);
    },

    add: function(User, callback) {
        const query = 'INSERT INTO Users (Username, Password, Salt, Email) VALUES (?, ?, ?, ?)';
        const params = [User.username, User.password, User.salt, User.email];
        db.run(query, params, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { id: this.lastID });
            }
        });
    },

    delete: function(id, callback) {
        db.run('DELETE FROM Users WHERE UserID=?', [id], callback);
    },

    update: function(id, User, callback) {
        const query = 'UPDATE Users SET Username=?, Password=?, Salt=?, Email=? WHERE UserID=?';
        const params = [User.username, User.password, User.salt, User.email, id];
        db.run(query, params, callback);
    }
};

module.exports = User;

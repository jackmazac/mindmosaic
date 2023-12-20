const db = require('../config/dbConfig');

const User = {
    get: function(callback) {
        return db.all('SELECT * from users', callback);
    },

    register: function(user, callback) {
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        const params = [user.username, user.password, user.email];
        db.run(query, params, function(err) {
            if (err) {
                callback(err, { id: this.lastID });
            }
        });
    },

    getByUsername: function(username, callback) {
        return db.get(
            'SELECT * from users where username=?',
            [username],
            callback
        );
    },

    // ... other methods ...
    getById: function(id, callback) {
        return db.get('SELECT * from users where id=?', [id], callback);
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

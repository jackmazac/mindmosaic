const db = require('../config/dbConfig');

const Preference = {
    get: function(callback) {
        return db.query('SELECT * from preferences', callback);
    },

    getById: function(id, callback) {
        return db.query('SELECT * from preferences where id=?', [id], callback);
    },

    add: function(Preference, callback) {
        return db.query(
            'INSERT into preferences (userId,contentId,likes,comments) values(?,?,?,?)',
            [Preference.userId, Preference.contentId, Preference.likes, Preference.comments],
            callback
        );
    },

    delete: function(id, callback) {
        return db.query('DELETE from preferences where id=?', [id], callback);
    },

    update: function(id, Preference, callback) {
        return db.query(
            'UPDATE preferences set userId=?, contentId=?, likes=?, comments=? where id=?',
            [Preference.userId, Preference.contentId, Preference.likes, Preference.comments, id],
            callback
        );
    }
};

module.exports = Preference;

const db = require('../config/dbConfig')();

const Preference = {
    get: function(callback) {
        return db.all('SELECT * from preferences', callback);
    },

    getById: function(id, callback) {
        return db.get('SELECT * from preferences where id=?', [id], callback);
    },

    add: function(Preference, callback) {
        return db.run(
            'INSERT into preferences (userId,contentId,likes,comments) values(?,?,?,?)',
            [Preference.userId, Preference.contentId, Preference.likes, Preference.comments],
            function(err) {
                callback(err, { id: this.lastID });
            }
        );
    },

    delete: function(id, callback) {
        return db.run('DELETE from preferences where id=?', [id], callback);
    },

    update: function(id, Preference, callback) {
        return db.run(
            'UPDATE preferences set userId=?, contentId=?, likes=?, comments=? where id=?',
            [Preference.userId, Preference.contentId, Preference.likes, Preference.comments, id],
            callback
        );
    }
};

module.exports = Preference;

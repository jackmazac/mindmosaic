const db = require('../config/dbConfig')();

const SocialInteraction = {
    getAll: function(callback) {
        return db.all('SELECT * FROM social_interactions', callback);
    },

    getById: function(id, callback) {
        return db.get('SELECT * FROM social_interactions WHERE id = ?', [id], callback);
    },

    add: function(socialInteraction, callback) {
        return db.run(
            'INSERT INTO social_interactions (likes, comments) VALUES (?, ?)',
            [socialInteraction.likes, socialInteraction.comments],
            function(err) {
                callback(err, { id: this.lastID });
            }
        );
    },

    update: function(id, socialInteraction, callback) {
        return db.run(
            'UPDATE social_interactions SET likes = ?, comments = ? WHERE id = ?',
            [socialInteraction.likes, socialInteraction.comments, id],
            callback
        );
    },

    delete: function(id, callback) {
        return db.run('DELETE FROM social_interactions WHERE id = ?', [id], callback);
    }
};

module.exports = SocialInteraction;

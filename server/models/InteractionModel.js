const db = require('../config/dbConfig');

const Interaction = {
    get: function(callback) {
        return db.query('SELECT * from interactions', callback);
    },

    getById: function(id, callback) {
        return db.query('SELECT * from interactions where id=?', [id], callback);
    },

    add: function(Interaction, callback) {
        return db.query(
            'INSERT into interactions (contentId,userId,likes,comments) values(?,?,?,?)',
            [Interaction.contentId, Interaction.userId, Interaction.likes, Interaction.comments],
            callback
        );
    },

    delete: function(id, callback) {
        return db.query('DELETE from interactions where id=?', [id], callback);
    },

    update: function(id, Interaction, callback) {
        return db.query(
            'UPDATE interactions set contentId=?, userId=?, likes=?, comments=? where id=?',
            [Interaction.contentId, Interaction.userId, Interaction.likes, Interaction.comments, id],
            callback
        );
    }
};

module.exports = Interaction;

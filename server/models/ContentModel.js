const db = require('../config/dbConfig');

const Content = {
    get: function(callback) {
        return db.query('SELECT * from contents', callback);
    },

    getById: function(id, callback) {
        return db.query('SELECT * from contents where id=?', [id], callback);
    },

    add: function(Content, callback) {
        return db.query(
            'INSERT into contents (title,content,likes,comments) values(?,?,?,?)',
            [Content.title, Content.content, Content.likes, Content.comments],
            callback
        );
    },

    delete: function(id, callback) {
        return db.query('DELETE from contents where id=?', [id], callback);
    },

    update: function(id, Content, callback) {
        return db.query(
            'UPDATE contents set title=?, content=?, likes=?, comments=? where id=?',
            [Content.title, Content.content, Content.likes, Content.comments, id],
            callback
        );
    }
};

module.exports = Content;

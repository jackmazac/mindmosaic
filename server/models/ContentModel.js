const db = require('../config/dbConfig')();

const Content = {
    get: function(callback) {
        return db.all('SELECT * FROM contents', callback);
    },

    getById: function(id, callback) {
        return db.get('SELECT * FROM contents WHERE id = ?', [id], callback);
    },

    add: function(content, callback) {
        return db.run(
            'INSERT INTO contents (title, content, likes, comments) VALUES (?, ?, ?, ?)',
            [content.title, content.content, content.likes, content.comments],
            function(err) {
                callback(err, { id: this.lastID });
            }
        );
    },

    delete: function(id, callback) {
        return db.run('DELETE FROM contents WHERE id = ?', [id], callback);
    },

    update: function(id, content, callback) {
        return db.run(
            'UPDATE contents SET title = ?, content = ?, likes = ?, comments = ? WHERE id = ?',
            [content.title, content.content, content.likes, content.comments, id],
            callback
        );
    }
};

module.exports = Content;

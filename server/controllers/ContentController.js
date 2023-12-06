const ContentModel = require('../models/ContentModel');

const ContentController = {
    getAll: function(req, res) {
        ContentModel.get(function(err, contents) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Contents retrieved successfully",
                data: contents
            });
        });
    },

    getById: function(req, res) {
        let id = req.params.id;
        ContentModel.getById(id, function(err, content) {
            if (err) {
                res.json(err);
            }
            res.json({
                data: content
            });
        });
    },

    add: function(req, res) {
        let content = new ContentModel();
        content.title = req.body.title;
        content.content = req.body.content;

        ContentModel.add(content, function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "New content created!",
                data: content
            });
        });
    },

    delete: function(req, res) {
        ContentModel.delete(req.params.id, function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                status: "success",
                message: 'Content deleted'
            });
        });
    },

    update: function(req, res) {
        ContentModel.getById(req.params.id, function(err, content) {
            if (err) {
                res.send(err);
            }

            content.title = req.body.title;
            content.content = req.body.content;

            ContentModel.update(req.params.id, content, function(err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: 'Content Info updated',
                    data: content
                });
            });
        });
    }
};

module.exports = ContentController;

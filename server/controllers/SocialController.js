const SocialModel = require('../models/SocialModel');

const SocialController = {
    getAll: function(req, res) {
        SocialModel.findAll().then(socialInteractions => {
            res.json({
                status: "success",
                message: "Social interactions retrieved successfully",
                data: socialInteractions
            });
        }).catch(err => {
            res.json({
                status: "error",
                message: err,
            });
        });
    },

    getById: function(req, res) {
        let id = req.params.id;
        SocialModel.findByPk(id).then(socialInteraction => {
            if (socialInteraction) {
                res.json({
                    data: socialInteraction
                });
            } else {
                res.json({
                    status: "error",
                    message: "No social interaction found with this ID",
                });
            }
        }).catch(err => {
            res.json({
                status: "error",
                message: err,
            });
        });
    },

    add: function(req, res) {
        let socialInteraction = {
            likes: req.body.likes,
            comments: req.body.comments
        };

        SocialModel.create(socialInteraction).then(socialInteraction => {
            res.json({
                message: "New social interaction created!",
                data: socialInteraction
            });
        }).catch(err => {
            res.json({
                status: "error",
                message: err,
            });
        });
    },

    delete: function(req, res) {
        let id = req.params.id;
        SocialModel.destroy({
            where: { id: id }
        }).then(() => {
            res.json({
                status: "success",
                message: 'Social interaction deleted'
            });
        }).catch(err => {
            res.json({
                status: "error",
                message: err,
            });
        });
    },

    update: function(req, res) {
        let id = req.params.id;
        let updates = {
            likes: req.body.likes,
            comments: req.body.comments
        };

        SocialModel.update(updates, {
            where: { id: id }
        }).then(() => {
            res.json({
                message: 'Social interaction updated',
                data: updates
            });
        }).catch(err => {
            res.json({
                status: "error",
                message: err,
            });
        });
    }
};

module.exports = SocialController;

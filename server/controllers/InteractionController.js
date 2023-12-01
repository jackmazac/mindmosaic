const InteractionModel = require('../models/InteractionModel');

const InteractionController = {
    getAll: function(req, res) {
        InteractionModel.get(function(err, interactions) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Interactions retrieved successfully",
                data: interactions
            });
        });
    },

    getById: function(req, res) {
        let id = req.params.id;
        InteractionModel.getById(id, function(err, interaction) {
            if (err) {
                res.json(err);
            }
            res.json({
                data: interaction
            });
        });
    },

    add: function(req, res) {
        let interaction = new InteractionModel();
        interaction.contentId = req.body.contentId;
        interaction.userId = req.body.userId;
        interaction.likes = req.body.likes;
        interaction.comments = req.body.comments;

        InteractionModel.add(interaction, function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "New interaction created!",
                data: interaction
            });
        });
    },

    delete: function(req, res) {
        InteractionModel.delete(req.params.id, function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                status: "success",
                message: 'Interaction deleted'
            });
        });
    },

    update: function(req, res) {
        InteractionModel.getById(req.params.id, function(err, interaction) {
            if (err) {
                res.send(err);
            }

            interaction.contentId = req.body.contentId;
            interaction.userId = req.body.userId;
            interaction.likes = req.body.likes;
            interaction.comments = req.body.comments;

            InteractionModel.update(req.params.id, interaction, function(err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: 'Interaction Info updated',
                    data: interaction
                });
            });
        });
    }
};

module.exports = InteractionController;

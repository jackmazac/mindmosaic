const express = require('express');
const router = express.Router();

const InteractionController = require('../controllers/InteractionController');

router.get('/', InteractionController.getAll);
router.get('/:id', InteractionController.getById);
router.post('/', InteractionController.add);
router.delete('/:id', InteractionController.delete);
router.put('/:id', InteractionController.update);

module.exports = router;

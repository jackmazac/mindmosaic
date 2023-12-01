const express = require('express');
const router = express.Router();

const ContentController = require('../controllers/ContentController');

router.get('/', ContentController.getAll);
router.get('/:id', ContentController.getById);
router.post('/', ContentController.add);
router.delete('/:id', ContentController.delete);
router.put('/:id', ContentController.update);

module.exports = router;

const express = require('express');
const socialController = require('../controllers/SocialController');
const router = express.Router();

router.get('/', socialController.getAll);
router.get('/:id', socialController.getById);
router.post('/', socialController.add);
router.delete('/:id', socialController.delete);
router.put('/:id', socialController.update);

module.exports = router;

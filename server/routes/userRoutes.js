const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Registration endpoint
router.post('/register', UserController.register);
router.post('/login', UserController.loginUser);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

module.exports = router;

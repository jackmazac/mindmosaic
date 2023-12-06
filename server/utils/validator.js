const { check, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('username', 'Username is required').not().isEmpty(),
                check('email', 'Email is required').isEmail(),
                check('password', 'Password is required').not().isEmpty()
            ]
        }
        case 'updateUser': {
            return [
                check('username', 'Username is required').optional(),
                check('email', 'Email is required').optional().isEmail(),
                check('password', 'Password is required').optional()
            ]
        }
    }
}

module.exports = {
    validate,
    validationResult
};

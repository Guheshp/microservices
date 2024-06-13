const { body } = require('express-validator');

const validateRegister = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase(),
    body('password')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Password length is too short, minimum 2 characters required')
];

module.exports = {
    validateRegister
};
const { body } = require('express-validator');

// Validation rules
const registrationValidationRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password').notEmpty().withMessage('Password is required')
];

const loginValidations = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
];


const eventValidations = [
    body('available_tickets').notEmpty().withMessage('Enter how many tickets available'),
    body('venue').notEmpty().withMessage('Venue is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('name').notEmpty().withMessage('Name is required'),

];

module.exports = {
    registrationValidationRules,
    eventValidations,
    loginValidations
}


const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const validations = require('../validations/validations')
const authentication = require('../middleware/authmiddleware')


router.post('/register',validations.registrationValidationRules,userController.register)
router.post('/login',validations.loginValidations,userController.login)

router.get('/events',authentication.authMiddleware,userController.getEvents)
router.post('/bookEvent',authentication.authMiddleware,userController.bookEvent)



module.exports = router
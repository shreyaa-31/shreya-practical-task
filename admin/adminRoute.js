const express = require('express');
const router = express.Router();
const adminController = require('./adminController');
const validations = require('../validations/validations')
const authentication = require('../middleware/authmiddleware')

router.post('/login',validations.loginValidations,adminController.login)
router.post('/addEvent',authentication.authMiddleware,validations.eventValidations,adminController.addEvent)


module.exports = router

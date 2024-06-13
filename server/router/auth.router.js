const authcontroller = require('../controller/auth.controller')
const express = require("express")
const router = express.Router()
const { validateRegister } = require('../middleware/auth.validater/validation.registration')

router.post('/register', authcontroller.createRegister)

router.post('/login', authcontroller.createLogin)

module.exports = router;

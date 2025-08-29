const express = require('express')
const {login, signup} = require('../controller/UserController.js')
const {getOtp} = require('../controller/OtpConteroller.js')



const router = express.Router()

router.post('/signup', signup)
router.post('/otp', getOtp)
router.post('/login',login)

module.exports = router


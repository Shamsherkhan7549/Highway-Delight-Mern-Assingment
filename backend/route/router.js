const express = require('express')
const {login, signup,getOtp} = require('../controller/UserController.js')



const router = express.Router()

router.post('/signup', signup)
router.post('/otp', getOtp)
router.post('/login',login)

module.exports = router


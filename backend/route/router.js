const express = require('express')
const {login, signup} = require('../controller/UserController.js')
const {getOtp} = require('../controller/OtpConteroller.js')
const { createNote, viewNote } = require('../controller/TaskController.js')
const{varifyUser} = require('../middleware/varifyToken.js')



const router = express.Router()

router.post('/signup', signup)
router.post('/otp', getOtp)
router.post('/login',login)
router.post('/task', varifyUser, createNote)
router.get('/task', varifyUser, viewNote)

module.exports = router


const TaskModel = require('../model/TasksModel')
const UserModel = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const dotenv =  require('dotenv')
dotenv.config()


// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
}

const signup = async (req, res) => {
    try {
        const user = new UserModel(req.body)
        const exist = await UserModel.findOne({ email: user.email })
        if (exist) {
            return res.status(409).json({success:false, message: 'User already exists' })
        }
        const savedUser =  await user.save()

        const token = generateToken(savedUser)

        res.status(201).json({ success:true, token, user: savedUser,  message: `Welcome, ${savedUser.name}` })
    } catch (error) {
        res.status(400).json({ success:false, error: error.message })
    }
}




const login = async (req, res) => {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not registered' })
        }
        const token = generateToken(user)
        res.status(200).json({ success: true, token, user, message: `Welcome back, ${user.name}` })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



module.exports = {
    login,
    signup
}
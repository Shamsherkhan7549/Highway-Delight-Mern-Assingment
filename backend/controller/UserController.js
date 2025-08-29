const TaskModel = require('../model/TasksModel')
const UserModel = require('../model/UserModel')


const signup = async (req, res) => {
    try {
        const user = new UserModel(req.body)
        const exist = await UserModel.findOne({ email: user.email })
        if (exist) {
            return res.status(409).json({success:false, message: 'User already exists' })
        }
        await user.save()
        res.status(201).json({ success:true, user })
    } catch (error) {
        res.status(400).json({ success:false, error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email, password })
        if (!user) {
            return res.status(401).send('Invalid credentials')
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}



module.exports = {
    login,
    signup
}
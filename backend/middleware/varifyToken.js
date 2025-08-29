const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const varifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(500).json({ success: false, message: "Singin before add task" })

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return res.status(401).json({ success: false, message: "Invalid token" })    
            req.user = decoded
            next();
            
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { varifyUser }
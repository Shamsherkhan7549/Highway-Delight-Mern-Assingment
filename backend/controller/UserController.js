const TaskModel = require('../model/TasksModel')
const UserModel = require('../model/UserModel')
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

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

// otp

// let otpStore = {}; // In-memory store { email: { otp, expiry } }

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,   // your gmail
    pass: process.env.GMAIL_PASSWORD.replace(" ", "")      // your Gmail app password
  }
});

const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000)
    return otp
}

const getOtp = (req, res) => {
    try{
        const otp = generateOtp();
          const { email } = req.body;
          const expiry = Date.now() + 5 * 60 * 1000;
        // otpStore[email] = { otp, expiry };

        // Send OTP email
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
        };

        console.log(mailOptions)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("OTP sent: " + info.response);
            res.status(200).json({ success: true, message: 'OTP sent to email', otp });
        });

    }catch(e){
        console.log(e)
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
}

module.exports = {
    login,
    signup,
    getOtp
}
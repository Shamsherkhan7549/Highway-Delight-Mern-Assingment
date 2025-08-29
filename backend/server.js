const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./route/router')

const app = express()

app.use(express.json())
app.use(cors())


const main = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/delightdb')
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB:", error)
            })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}
main()

app.use('/', router)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
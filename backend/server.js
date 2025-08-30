const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./route/router')
const {main} = require('./configue/configue')
const app = express()


app.use(cors())
app.use(express.json())

// Connect to MongoDB
main()

app.use('/', router)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
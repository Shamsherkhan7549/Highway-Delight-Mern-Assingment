const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    task:[
        {
            type:Schema.Types.ObjectId,
            ref:'TASKS'
        }
    ]
    
})

module.exports = mongoose.model('USER', userSchema)
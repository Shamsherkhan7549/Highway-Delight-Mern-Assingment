const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    task: { type: String, required: true },
   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'USER'
    }
})

module.exports = mongoose.model('TASKS', taskSchema)

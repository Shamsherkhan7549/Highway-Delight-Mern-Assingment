const TaskModel = require('../model/TasksModel')
const UserModel = require('../model/UserModel')
const express = require('express')



const createNote = async(req, res) => {
    try{
        const id = req.user.id
        const {note} = req.body
        const newNote = new TaskModel({task:note, user:id})
        const saveNote = await newNote.save()
        if(saveNote){
            const existUser = await UserModel.findById(id)
            if(existUser){
                existUser.task.push(saveNote._id)
                await existUser.save()
            }
            res.status(200).json({success:true, message:"Note created successfully"})

        }else{
            res.status(500).json({success:false, message:"Failed to create note"})
            return
        }

    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const viewNote = async (req, res) => {
        try{
            const id = req.user.id
            const notes = await TaskModel.find({user:id})
            res.status(200).json({success:true, notes:notes})
        }catch(error){
            res.status(500).json({success:false, message:error.message})
        }
}

const deleteNote = async(req, res) => {
    try{
        const id = req.user.id
        const noteId = req.params.id
        const existUser = await UserModel.findOne({ _id: id, task: noteId })
        if(!existUser) return res.status(403).json({ success: false, message: "You are not authorized to delete this note" })
        await UserModel.findByIdAndUpdate(id, { $pull: { task: noteId } })
        const deletedNote = await TaskModel.findOneAndDelete({ _id: noteId, user: id })
       

        if (deletedNote) {
            res.status(200).json({ success: true, message: "Note deleted successfully" })
        } else {
            res.status(404).json({ success: false, message: "Note not found" })
        }
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

module.exports = { createNote,viewNote,deleteNote }
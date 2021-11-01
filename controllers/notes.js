const { response } = require("express");

// Require Own Modules
const Notes = require("../models/Notes");
const User  = require("../models/Users");

const getNotes = async(req, res = response ) => {
    try {
        const { _id : userId }  = res.locals.token;
        const user = await User.findById({ _id : userId }).exec();
       
        if (!user) {
            return res.status(404).json({
                ok : false,
                msg : "User not found",
            });
        }

        const notes = await Notes.find({ user }).exec();

        return res.status(200).json({
            ok    : true,
            notes : notes,
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please inform about this error with the admin"
        });
    }
};

const createNote = async(req, res = response) => {
    try {
        const { title, body }   = req.body;
        const { _id : userId }  = res.locals.token;

        const user = await User.findOne({ _id : userId }).exec();

        if (!user) {
            return res.status(404).json({
                ok : false,
                msg : "User not found",
            });
        }

        const newNote = {
            user : userId,
            note : {
                title,
                body,
            },
        };
        const note = new Notes(newNote);
        await note.save();

        return res.status(201).json({
            ok : true,
            note,
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please inform about this error with the admin",
            error
        });
    }
};


const updateNote = async (req, res = response) => {
    try {
        const { noteId }        = req.params;
        const { _id : userId }  = res.locals.token;

        const note = await Notes.findById({ _id : noteId });

        if(!note) {
            return res.status(404).json({
                ok: false,
                msg: "Note not found",
            });
        }
    
        if(note.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: "The user is not allowed to do this action",
            });
        }

        const newNote = {
            note : {
                title : req.body.title,
                body  : req.body.body, 
            },
            user: userId,
        };

        const noteUpdated = await Notes.findByIdAndUpdate( noteId, newNote, { new: true });

        return res.status(201).json({
            ok   : true,
            _id  : noteUpdated._id,
            note : { ...noteUpdated.note},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Inform about this problem to the admin"
        });
    }
};

const deleteNote = async(req, res = response) => {
    try {
        const { noteId }        = req.params;
        const { _id : userId }  = res.locals.token;

        const note = await Notes.findById({ _id : noteId });

        if (!note) {
            return res.status(404).json({
                ok  : false,
                msg : "Note not found",
            });
        }

        if(note.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: "The user is not allowed to do this action",
            });
        }
        await Notes.findOneAndDelete({ _id : noteId });
        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please inform about this error with the admin",
            error
        });
    }
};

module.exports = {
    getNotes,
    updateNote,
    createNote,
    deleteNote,
};
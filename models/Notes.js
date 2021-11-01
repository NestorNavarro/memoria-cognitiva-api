const { Schema, model } = require("mongoose");

const NotesSchema = new Schema({
    user : {
        required : true,
        ref      : 'user',
        type     : Schema.Types.ObjectId,
    },
    note : { 
        title : { type : String, required : true }, 
        body  : { type : String, required : true },
    },
});

module.exports = model("note", NotesSchema, "notes");
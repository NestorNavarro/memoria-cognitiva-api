const { Schema, model } = require("mongoose");

// Require own Modules
const { types } = require("../helpers/testTypes");

const resultsSchemas = {};

for (const type of types) {
    resultsSchemas[type] = {
        default : () => ({}),
        type    : new Schema({
            total   : { type : Number, default : 0 },
            average : { type : Number, default : 0 },
            best    : { type : Number, default : 0 },
        }),
    };
}

const UserSchema = new Schema({
    name     : { type : String, required : true },
    email    : { type : String, required : true, unique : true },
    age      : { type : Number, required : true },
    sex      : { type : String, required : true },
    password : { type : String, required : true },
    ...resultsSchemas,
});

module.exports = model("user", UserSchema, "users");

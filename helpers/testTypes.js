const types = ["cards", "numbers", "figures", "words", "phrases"];

const schemaField = { type : String, enum : types, required : true, index : true };

exports.types = types;

module.exports = schemaField;

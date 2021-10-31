const types = ["cards", "numbers", "figures", "words", "phrases"];

const schemaField = { type : String, enum : types, required : true, index : true };

module.exports = {
    types,
    schemaField,
};

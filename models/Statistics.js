const { Schema, model } = require("mongoose");

// Require own Modules
const { testTypes } = require("../helpers");

const StatisticsSchema = new Schema({
    type : testTypes,
    
});

module.exports = model("statistic", StatisticsSchema, "statistics");

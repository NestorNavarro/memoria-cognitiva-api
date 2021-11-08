const mongoose  = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log("db");
    }catch (error) {
        console.log(error)
        throw new Error("Error on init db");
    }
}
module.exports = {
    dbConnection,
}

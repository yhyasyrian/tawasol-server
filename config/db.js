const mongoose = require("mongoose");
const config = require("config");
const db = config.get("databaseString");
const connectDatabase = async () => {
    try {
        mongoose.connect(db);
        console.log("connect database successfully");
    } catch (error) {
        console.error(`error on connect database ${error.message}`);
    }
};

module.exports = connectDatabase;

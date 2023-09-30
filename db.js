const mongoose = require("mongoose")
require('dotenv').config();
const databaseURL = process.env.DataBaseURL;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(databaseURL)
        console.log("database connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectToDatabase


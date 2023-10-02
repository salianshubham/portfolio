const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: Date
})
const portfolioModel = new mongoose.model("portfolio", portfolioSchema)

module.exports = portfolioModel;
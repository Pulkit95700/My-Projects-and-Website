require("dotenv").config();
const mongoose = require("mongoose");
const connectDatabase = require("./../config/db");

connectDatabase() //connecting to the database..

const userSchema = new mongoose.Schema({

    userId: String,
    email: String,
    mobileno: Number,
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {     //for auth verification
        type: String,
        unique: true,
    }

})

const User = mongoose.model("User", userSchema);

module.exports = User;
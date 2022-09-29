const User = require("./../models/UserModel");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("./../services/Mail")


module.exports.sendUser = (data)=>{

    const token = jwt.sign({email: data.email}, process.env.JWT_SECRET);

    sendEmail(token, data.email);

    const newUser = new User({
        userId: data.userId,
        email: data.email,
        mobileno: data.mobileno,
        status: "Pending",
        confirmationCode: token,
    })

    newUser.save();
}
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const nodemailer= require("nodemailer");

const transport = nodemailer.createTransport({  
    // host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    }
});

//checking connection..

module.exports.sendEmail = async (token, email)=>{
    const templatePath = path.join(__dirname+'/../views/message.ejs');

    const data = await ejs.renderFile(templatePath, {
        port: process.env.port,
        token: token,
        mail: email
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: email.toString(), // List of recipients
        subject: 'Account Activation', // Subject line
        text: 'Hello People!, Welcome Pulkit!', // Plain text body
        html: data,
        attachments: [{
            filename: 'logo.png',
            path: __dirname + '/../assets/logo.png',
            cid: 'logo',
        }]
    };

    await transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
            console.log("sent");
        }
    });
}
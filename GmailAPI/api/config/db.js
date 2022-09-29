require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI)
        .then((data)=>{
            console.log(`Database connected with Server ${data.connection.host}`);
        })
        .catch((err)=>{
            console.log(err);  //catching the errors with database connectivity.
        });
};

module.exports = connectDatabase;
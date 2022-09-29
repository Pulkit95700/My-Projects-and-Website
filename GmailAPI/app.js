require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json())
const userRouter = require("./api/routes/users");
const authRouter = require("./api/routes/auth");

app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", userRouter);
app.use("/api/auth/users", authRouter);


app.listen(process.env.PORT, ()=>{
    console.log("Server is up and started...");
});
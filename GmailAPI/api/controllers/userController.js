const User = require("./../models/UserModel");
const {checkValidation} = require("./../validations/validator");
const {sendUser} = require('./../services/userServices')

module.exports.registerUser = async (req, res)=>{

    if(checkValidation(req.body)){
        
        User.findOne({email: req.body.email}, (err, result)=>{
            if(err){
                console.log(err);
                res.status(400).send("Database connectivity Problem.");
            }
            else{
                if(result){
                    res.status(400).send("Email already Present")
                }
                else{
                    sendUser(req.body);  //saving the user if it is not present...
                    res.status(200).send("confirmation message sent to your email");
                }
            }
        })
    }
    else{
        res.status(400).send("invalid data");
    }

}

const User = require("./../models/UserModel");
module.exports.verifyToken = (req, res)=>{
    
    const token = req.params.token;
    User.findOne({confirmationCode: token}, (err, result)=>{
        if(err){
            console.log(err);
            res.status(400).send("Low Database connectivity.")
        }
        else{
            if(result){
                if(result.confirmationCode === token){
                    User.updateOne({confirmationCode: token}, {status: "Active"}, (err)=>{
                        if(err){
                            console.log(err);
                            res.status(400).send("No response");
                        }
                        else{
                            res.send("confirmed successfully")
                        }
                    })
                }
                else{
                    res.send("invalid token");
                }
            }
            else{
                res.send("Email not found. Please register first.")
            }
        }
    })
}
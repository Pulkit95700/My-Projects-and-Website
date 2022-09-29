const validator = require("validatorjs");

//data for verification by the user on the api.

const rules = {
    userId: "required",
    email: "required|email",
    mobileno: "required|size:10"
};

module.exports.checkValidation = (data)=>{
    let validation = new validator(data, rules);
    return validation.passes();
}
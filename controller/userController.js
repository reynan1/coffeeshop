const bcryt = require("bcrypt");
const User = require("../models/User.js");
const validator = require('validator');
const auth = require("../auth");

module.exports.registerUser = (reqBody) => {
        return User.findOne({email: reqBody.email}).then( result => {
                       
                  if(result != null && result.email == reqBody.email){
                      return "Duplicate User Found";
                  } else if(reqBody.firstName == "") {
                      return "Firstname is required!";
                  } else if(reqBody.lastName == "") {
                      return "Lastname is required!";
                  } else if(reqBody.birthDay == "") {
                      return "Birthday is required!";
                  } else if(reqBody.mobileNo == "") {
                      return "Mobile number is required!";
                  } else if(reqBody.email == "") {
                      return "Email is required!";
                  } else if (!validator.isEmail(reqBody.email)) {
                      return 'Email is invalid'
                  }else if(reqBody.password == "") {                      
                      return "Password is required!";
                  } else {
                    const lowerCase = new RegExp('(?=.*[a-z])');
                    const upperCase = new RegExp('(?=.*[A-Z])');
                    const number = new RegExp('(?=.*[0-9])');
                    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
                    const eightChar = new RegExp('(?=.{8,})');
                          
                          if(!eightChar.test(reqBody.password)){
                             return "The password length must be greater than or equal to 8";
                          } else if(!lowerCase.test(reqBody.password)) {
                             return "The password must contain one or more lowercase characters";
                          } else if(!upperCase.test(reqBody.password)) {
                             return "The password must contain one or more uppercase characters";
                          } else if(!number.test(reqBody.password)) {
                             return "The password must contain one or more numeric values";
                          } else if(!special.test(reqBody.password)) {
                             return "The password must contain one or more special characters";
                          }  else {  

                            console.log("user saving");
                            let newUser = new User({
                                    firstName: reqBody.firstName,
                                    lastName: reqBody.lastName,
                                    email: reqBody.email,
                                    birthDay: reqBody.birthDay,
                                    mobileNo: reqBody.mobileNo,
                                    password: bcryt.hashSync(reqBody.password, 10) 
                            })
                            
                            return newUser.save().then((user,saveError) => {
                                    if(saveError) {
                                    return false;
                                    } else if(user) {
                
                                    return `Hi! ${reqBody.firstName} welcome to Gogo Caffee enjoy your visiting to my coffeeshop.`;
                                    }
                            })
                    }
                 }
        })

}


module.exports.loginUser = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(result => {
            console.log(result)
            if(result == null){
                return "Password and Username Combination is not match!";
            } else {
                const isPasswordCorrect = bcryt.compareSync(reqBody.password, result.password);

                if(isPasswordCorrect) {
                    return { access: auth.createAccessToken(result) }
                }else {
                    return 'Password and Username Combination is not match!'
                }
            }
    })
}
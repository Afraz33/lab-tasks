const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")


let signup = (req , res)=>{
    let {name , password ,email, contact, type } = req.body;

    let user = new userModel({
        name,
        password,
        email,
        contact,
        type
    })

    user.save().then((user)=>{
        res.status(200).json({"Message":"User Created" , user:user})
    }).catch(err=>{
        res.status(500).json({"Message":"User Not Created" , err:err})
    })

}

let login = (req , res)=>{
    let {name , password} = req.body;

    Users.findOne({name:name}).then((user)=>{
        if(user.password == password){
            let token = jwt.sign({
                id:user._id,
                role: user.type} , 
                process.env.SECRET_KEY, {
                    expiresIn: "24h"
                }
                )
            res.status(200).json({"Message":"Login Successfull" , user:user, token})
        }else{
            res.status(500).json({"Message":"Login Failed"})
        }
    }
    ).catch(err=>{
        res.status(500).json({"Message":"Login Failed" , err:err})
    }
    )
}

module.exports = {
    signup,
    login 
}
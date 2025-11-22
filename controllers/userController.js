const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerController = async(req,res)=>{
    console.log("Inside register controller")
    const {username,email,password} = req.body

    try{

        const existingUser = await users.findOne({email})

        if(existingUser){
            res.status(409).json("User Already exist.")
        }
        else{
            const encryptPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptPassword,profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.loginController = async (req,res)=>{
    console.log("Inside login controller")

    const {email,password} = req.body
    
    try{
        const existingUser = await users.findOne({email})

        if(existingUser){
          let isUserLoggedIn = existingUser.role=="user"? await bcrypt.compare(password,existingUser.password) : password==existingUser.password 
          

          if(isUserLoggedIn){
            const token = jwt.sign({email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
          }
          else{
            res.status(404).json("Invalid Password")
          }


        }
        else{
            res.status(404).json("Account does not exist.")
        }

    }
    catch(err){
        res.status(500).json(err)
    }

}
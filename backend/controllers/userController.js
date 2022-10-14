const expressAsyncHandler = require("express-async-handler");
const User=require('../models/userModel')
const generateToken=require('../config/generateToken')

//Register

const userRegisterCtrl= expressAsyncHandler(async(req,res)=>{

    //check if user exist
    const userExist=await User.findOne({email:req?.body?.email});
    if(userExist)throw new Error('user is already exists')

    try {
        const user=await User.create({
          name:req.body && req.body.name,
          email:req.body && req.body.email,
          password:req?.body?.password,  
        });
        res.json({user})
    } catch (error) {
      res.json(error)  
    }
});

//login User

const loginUserCtrl=expressAsyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    const userFound=await User.findOne({email});
    
    //check if password is match
    if(userFound && (await userFound.isPasswordMatched(password))){
        res.json({
            _id:userFound?._id,
            name:userFound?.name,
            email:userFound?.email,
            token:generateToken(userFound?._id)

        });
    }else{
        res.status(401);
        throw new Error('invalid Login Credentials')
    }
 
})


module.exports={
    userRegisterCtrl,loginUserCtrl
}
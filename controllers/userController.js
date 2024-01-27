const User = require('../database/model/user.model');
const {sendScheduledEmail}=require('../service/email.service')


const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
        }catch(err){
            console.log("getAllUserError",err.message)
            res.status(500).json({message:err.message});
            }
}
const sendEmail=async(req,res)=>{
    try{
       await sendScheduledEmail()
        res.status(200).json("sent");
        }catch(err){
            console.log("sendEmailerror",err.message)
            res.status(500).json({message:err.message});
            }}
module.exports={getAllUsers,sendEmail}

        
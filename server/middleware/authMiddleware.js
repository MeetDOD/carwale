const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireLogin = async (req,res,next) => {
    try{
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode
        next()
    }catch(err){
        console.log(err)
    }
}

const isAdmin = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(200).send({
                success:false,
                message:"UnAuthorized Access, Only Admin can access"
            })
        }else{
            next()
        }
    }catch(err){
        res.status(401).send({
            success:false,
            message:"Error in Admin Middleware"
        })
    }
}

module.exports = {requireLogin,isAdmin}
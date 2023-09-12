const { hashPassword, comparePassword } = require("../auth/auth")
const userModel = require("../models/userModel")
const JWT = require('jsonwebtoken')

const registerUser = async (req,res) => {
    try{
        const {name,email,password,phone,address} = req.body

        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone is Required'})
        }
        if(!address){
            return res.send({message:'Address is Required'})
        }

        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.status(200).send({
                success:false,
                message:'Already a User, Please Login !'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:'User Registration SUccessfull',
            user
        })
    }catch(err){
        console.log('Failed to Register a User',err);
        res.status(500).send({
            success:false,
            message:'Failed to Register a User',
            err
        })
    }
}

const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body

        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Inavild email or password'
            })
        }

        
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(200).send({
                success:false,
                message:'Invalid Email !'
            })
        }

        const match = await comparePassword(password,user.password);

        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password !'
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});

        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:'Error during Login',
            err
        })
    }
}

const test = (req,res) => {
    res.status(200).send({
        success:true,
        message:'Protected Routes'
    })
} 

const adminAuth = (req,res) => {

}

module.exports = {registerUser,loginUser,test,adminAuth}
const { default: slugify } = require('slugify')
const brandModel = require('../models/carBrand')
const fs = require('fs')

const getBrand = async (req,res) => {
    try{
        const brand = await brandModel.find({}).populate('carInvoleInThisBrand')

        res.status(200).send({
            success:true,
            totalBrand:brand.length,
            message:"All Brands",
            brand
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Getting Brand",
            err
        })
    }
}

const getBrandById = async (req,res) => {
    try{
        const brand = await brandModel.findOne({slug:req.params.slug}).populate('carInvoleInThisBrand')

        res.status(200).send({
            success:true,
            message:"Brands By this Id",
            brand
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Finding Brand Id",
            err
        })
    }
}

const createBrand = async (req,res) => {
    try{
        const {name} = req.body
        const brandPictures = req.file.path.replace('uploads/', '')

        if(!name){
            return res.send({message:'Brand Name is Required'})
        }
        if(!brandPictures){
            return res.send({message:'Brand Image is Required'})
        }

        if(!name || !brandPictures){
            return res.send({message:'Please fill all the fields'})
        }

        const existCategory = await brandModel.findOne({name})

        if(existCategory){
            return res.status(200).send({
                success:true,
                message:"Name is Already Exist"
            })
        }

        const brand = new brandModel({name,brandPictures,slug:slugify(name)})
        await brand.save()
        console.log(brand)
        res.status(201).send({
            success:true,
            message:'Brand Created Successfully',
            brand,
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in creating Brand",
            err
        })
    }
}

const updateBrand = async (req,res) => {
    try{
        const {name} = req.body
        const {id} = req.params

        const brand = await brandModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Brand Updated Successfully",
            brand
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Updating Brand",
            err
        })
    }
}

const deleteBrand = async (req,res) => {
    try{
        const {id} = req.params
        try{
            for(const x of carModel_.brandPictures){
                fs.unlink(path.join(__dirname, '../uploads/',x), (err)=> {
                    if(err){
                        throw err;
                    }
                })                
            }
        }catch(e){
            console.log("Delte: " +e)
        }
        await brandModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Brand Deleted Successfully"
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Deleting Brand",
            err
        })
    }
}

module.exports = {getBrand,getBrandById,createBrand,updateBrand,deleteBrand}
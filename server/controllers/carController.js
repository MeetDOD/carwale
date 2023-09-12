const { default: slugify } = require("slugify")
const carModel = require("../models/carModel")
const fs = require('fs')

const getAllCar = async (req,res) => {
    try{
        const car = await carModel.find({}).populate('brand').select('-photo')

        res.status(200).send({
            success:true,
            totalCar:car.length,
            message:"All cars",
            car
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Getting Car",
            err
        })
    }
}

const getCarById = async (req,res) => {
    try{
        const car = await carModel.findOne({slug:req.params.slug}).populate('brand').select('-photo')

        res.status(200).send({
            success:true,
            message:"Car By this Id",
            car
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Finding Car Id",
            err
        })
    }
}

const getPhotoById = async (req,res) => {
    try{
        const car = await carModel.findById(req.params.pid).populate('brand').select('productPictures')

        if(car.productPictures.data){
            res.set('Content-type',car.productPictures.contentType)
            res.status(200).send(car.productPictures.data)
        }
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Finding Photo Car Id",
            err
        })
    }
}
const createCar = async (req, res) => {
    try {
        const { name, description, shipping, brand } = req.body;
        
        // Check for required fields
        if (!name || !description || !brand) {
            return res.status(400).send({ message: "Name, description, and brand are required." });
        }
        
        // Assuming your file paths are correct, no need for modification
        const productPictures = req.files.map(file => file.path);

        const slug = slugify(name); // Make sure slugify function is defined

        const car = new carModel({
            name: name,
            slug: slug,
            description: description,
            brand: brand,
            productPictures: productPictures
        });

        await car.save();

        res.status(201).send({
            success: true,
            message: 'Car Created Successfully',
            car
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in creating Car",
            error: err.message // Provide a more detailed error message
        });
    }
};

const deleteCar = async (req,res) => {
    try{
        await carModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Car Deleted Successfully"
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in Deleting Car",
            err
        })
    }
}

const updatecar = async (req,res) => {
    try{
        const {name,description,shipping,brand} = req.fields
        const {photo} = req.files

        switch(true){
            case !name : return res.status(500).send({message:"Name is required"})
            case !description : return res.status(500).send({message:"Description is required"})
            case !brand : return res.status(500).send({message:"Brand is required"})
            // case !photo : return res.status(500).send({message:"Photo is required and should be less than 1Mb"})
        }

        const car = await carModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            car.photo.data = fs.readFileSync(photo.path)
            car.photo.contentType = photo.type
        }
        await car.save()
        res.status(201).send({
            success:true,
            message:'Car Updated Successfully',
            car
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in Updating Car",
            err
        })
    }
}

module.exports = {createCar,getAllCar,getCarById,getPhotoById,deleteCar,updatecar}
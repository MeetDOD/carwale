const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    transmission:{
        type:String,
        required:true
    },
    engineSize:{
        type:String,
        required:true
    },
    mileage:{
        type:String,
        required:true
    },
    safetyrating:{
        type:String,
        required:true
    },
    warranty:{
        type:String,
        required:true
    },
    seater:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    fuelTank:{
        type:String,
        required:true
    },
    brand:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand'
    },
    productPictures:[
        {
            type:String
        }
    ],
    shipping:{
        type:Boolean
    }
},{
    timestamps:true
})

const carModel = mongoose.model('car',carSchema)

module.exports = carModel
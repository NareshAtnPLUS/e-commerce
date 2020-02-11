const mongoose = require('mongoose');
const MobileSchema = mongoose.Schema({
    general: {
        brand: {
            type:String,
            required:true
        },
        modelName: {
            type:String,
            required:true
        },
        modelNumber:{
            type:String,
            required:true,
            //unique:true
        },        
    },
    colors: {
        type:Array
    },
    variants: [
        {
            price:{
                type:Number,
                required:true
            },
            expandableMemory: {
                type:Number,
                required:true
            },
            available:{
                type:Number,
                required:true,
            },
            internalStorage: {
                type:Number,
                required:true
            },
            ram: {
                type:Number,
                required:true
            }
        }
    ],
    displayFeatures: {
        size:{
            type:Number,
            required:true
        },
        resolution: {
            type:String,
            required:true
        },
    },
    osAndProcessor: {
        os: {
            type:String,
            required:true
        },
        version: {
            type:Number,
            required:true
        },
        psrName: {
            type:String,
            required:true
        },
        psrBrand: {
            type:String,
            required:true
        },
        core: {
            type:Number,
            required:true
        }
        
    },
    camera: {
        primaryCamera: {
            type:String,
        },
        secondaryCamera: {
            type:String,
        }
    },
    networkFeatures: {
        networkGen: {
            type:String,
            required:true
        },
        connectivity: {
            type:String,
            required:true
        },
    },
    dimension: {
        width: {
            type:Number,
            required:true
        },
        height: {
            type:Number,
            required:true
        },
        thickness: {
            type:Number,
            required:true
        },
        weight: {
            type:Number,
            required:true
        },
    },
    brandWarranty:{
        brandWarranty:{
            type:String,
            required:true
        },
    },
    seller:[
        {
            name:{
                type:String,
                required:true
            },
            address:{
                type:String,
                required:true
            },            
        }
    ]
});
const Mobile = module.exports = mongoose.model('Mobile',MobileSchema);
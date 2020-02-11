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
            unique:true
        },
        color: {
            type:Array
        },
        variant: [
        {
            color:{
                type:String,
                required:true
            },
            price:{
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
    },
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
            type:Number,
            required:true
        },
        psrType: {
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
    expandableMemory: {
        type:Number,
        required:true
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
        type: {
            type:String,
            required:true
        },
        internetConnectivity: {
            type:String,
            required:true
        },
    },
    dimensions: {
        width: {
            type:Number,
            required:true
        },
        height: {
            type:Number,
            required:true
        },
        depth: {
            type:Number,
            required:true
        },
        weight: {
            type:Number,
            required:true
        },
    },
    brandWarranty:{
        type:Number,
        required:true
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
const mongoose=require('mongoose')
const asyncHandler=require('express-async-handler')

const busSchema=mongoose.Schema({
    busName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    currentPosition:{
        type:[[Number]]
    },
    busRoute:{
        type:[[Number]]
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Bus',busSchema)
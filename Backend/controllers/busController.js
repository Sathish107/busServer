const asyncHandler=require('express-async-handler')
const Bus=require('../models/busModel')

const registerBus= asyncHandler(async (req,res)=>{
    if(!(req.body.busName && req.body.password)){
        res.status(400).json({message:"Enter the required fields"})
    } 

    const newBus=await Bus.create({
        busName:req.body.busName,
        password:req.body.password
    })

    res.status(200).json(newBus)
})

const updateRoute=asyncHandler(async (req,res)=>{ 
    const coordinates=JSON.parse(req.body.coordinates) 

    const updatedRoute=await Bus.findOneAndUpdate({_id:req.body.id},
        {
            currentPosition:coordinates,
            $push:{busRoute:coordinates}
        },{
            new:true
        })

    if(updatedRoute){
        res.status(200).json(updatedRoute)
    }
})

const getBus=asyncHandler(async (req,res)=>{
    const response=await Bus.findById(req.params.id)

    res.status(200).json(response)
})

module.exports={
    registerBus,
    getBus,
    updateRoute
}
const dotenv=require('dotenv').config()
const express=require('express')
const path=require('path')
const port=process.env.PORT
const connectDB=require('./config/db.js')
const cors=require('cors')

connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, '../public')));

app.use('/bus',require('./routes/busRoutes')) 

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
})
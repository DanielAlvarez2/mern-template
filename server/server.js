import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Name from './models/Name.js'
dotenv.config({path:'../.env'})
const app = express()
const PORT = process.env.PORT || 7070;
(async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()
app.listen(PORT,()=> console.log(`Server Listening on Port: ${PORT}`))
app.use(express.json())
app.use(express.static('../dist'))
const items = [
    {name:'Laptop', price:500},
    {name:'Desktop', price:700}
]
app.post('/api/names', async(req,res)=>{
    try{
        await Name.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        res.json('Added to Database')
    }catch(err){
        console.log(err)
    }
})
app.delete('/api/names/:id',async(req,res)=>{
    try{
        await Name.findByIdAndDelete(req.params.id)
        res.json('Deleted from Database')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/names',async(req,res)=>{
    try{
        const allNames = await Name.find()
        res.json(allNames)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/names/:id',async(req,res)=>{
    try{
        const name = await Name.findById(req.params.id)
        res.json(name)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/names/:id',async(req,res)=>{
    try{
        await Name.findByIdAndUpdate({_id:req.params.id},{
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        res.json('Updated in Database')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/items',(req,res)=>res.send(items))

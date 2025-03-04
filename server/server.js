import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
const app = express()
const PORT = process.env.PORT || 7070
app.listen(PORT,()=> console.log(`Server Listening on Port: ${PORT}`))
app.use(express.static('../dist'))
const items = [
    {name:'Laptop', price:500},
    {name:'Desktop', price:700}
]
app.get('/api/items',(req,res)=>res.send(items))
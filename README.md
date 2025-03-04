GitHub:  
 Your repositories  
 Click Green Button: 'New'  
 Fill in 'Repository name *'  
 [ ]Add a README file (leave unchecked)  
 Click Green Button 'Create Repository'  
 Copy URL  

VS Code:  
 File > New Window  
 $ cd desktop  
 $ git clone cmd-v (paste URL)  
 (Folder Icon) Open...  
 Open newly created folder  
 $ git config user.name 'Daniel Alvarez'  
 $ git config user.email 'daniel.yllanes@hotmail.com'  
 $ npm create vite@ latest .  
 ● React  
 ● JavaScript  
 $ npm i  
 package.json: ensure v19+ for react + react-dom
 $ npm i dotenv express mongoose  
 $ touch .env  
 .gitignore: add '.env'  
 DO NOT DELETE 'src/assets/react.svg' FILE / WILL THROW AN ERROR  
 Delete /public  
 Delete src/App.css  
 src/App.jsx: delete all imports except for useState  
 src/App.jsx: delete everything in function and replace with 'test'  
 src/App.jsx: move export default function App(){}  
 src/index.css: delete everything  
 $ npm run dev (check that React is working)  
 $ ctrl-c  
 $ mkdir server  
 $ cd server  
 /server$ touch server.js  
 

 /server/server.js:  
 ```js
import express from 'express'
const app = express()
const PORT = process.env.PORT || 8080 (write # down)
app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))
app.use(express.static('../dist'))
const items = [
    {name:"Laptop",price: 500},
    {name:"Desktop",price: 700}
]
app.get('/api/items',(req,res)=>res.send(items))
 ```
 
 vite.config.js:
 ```js
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:8080'
    }
  },
  plugins: [react()],
})
 ```
 
 App.jsx (REPLACE ENTIRE FILE CONTENTS): 
```js
import { useState, useEffect } from 'react'
export default function App() {
  const [items, setItems] = useState([])
  useEffect(()=>{
    fetch('/api/items')
      .then(res=>res.json())
      .then(data=>setItems(data))
  },[])
  function renderItems(){
    return items.map((item,i)=>{
      return <div key={i}>
        <h3>{item.name}</h3>
        <p>Price: {item.price}</p>
      </div>
    })
  }
  return (
    <main>
      <h1>EXAMPLE WEB SHOP</h1>
      {renderItems()}
    </main>
  )
}
```
add another 2 bash terminals, rename 1 react / 2 express / 3 git  
express$ cd server  
express/server$ node --watch server.js (start express before react)  
react$ npm run dev  
click link to open browser  
App.jsx: modify h1 to check hot-reload working  
ctrl+c both servers  


/server/server.js: 
```js
    import dotenv from 'dotenv'
    dotenv.config({path:'../.env'})
```  
.env: PORT=8081 (write# down)  
.vite.config.js: change PORT to 8081  
restart both servers (express 1st)  
ensure new port# being used  
/package.json: "start":"cd server && node server.js"  
Push to GitHub  

Render.com:  
 Push Button '+ New'  
 Select 'Web Service'  
 Select GitHub Repo from Dropdown Menu  
 Click Button 'Connect'  
 Free $0/month  
 Click Button 'Deploy Web Service'  
 Maximize Log Screen  
 Wait for: 'Your service is live'  
 Minimize Log Screen  
 URL 'Copy to clipboard'  
 Visit URL to ensure app is working online  
 /server/server.js: setInterval(()=>fetch('cmd+v/paste',600000))  
 push to github  
 click button: 'Manual Deploy'  
 select: 'Deploy Latest Commit'  
 Maximize Log Screen  
 Wait for 'Your service is live'  
 Check in 30min intervals  

---
## Create API  

/server/server.js: import mongoose from 'mongoose'  
mongodb.com login with email/password  
click: 'Connect'  
click: 'Drivers'  
connection string / copy to clipboard  
.env: MONGODB_URI=(cmd+v/paste)  
replace <db_password> with actual password  
between /? write name of new database / or will be set to default 'test'  
use database called 'names' for initial setup  
/server$ mkdir models  
/server$ cd models  
/server/models$ touch Name.js

/server/models/Name.js:  
```js
    import mongoose from 'mongoose'
    const NameSchema = new mongoose.Schema({
        firstName:{type:String},
        lastName:{type:String}

    },{
        timestamps:true
    })
    export default mongoose.model('Name', NameSchema)
```

/server/server.js: import Name from './models/Name.js'  
MUST HAVE A SEMICOLON BEFORE NEXT LINE OF CODE!!!(IIFE)  
```js
    (async()=>{
        try{
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Database Connected')
        }catch(err){
            console.log(err)
        }
    })()
    app.post('/api/names, async (req,res)=>{
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
```
server/server.js: app.use(express.json())  

Postman:  
POST http://localhost:7071/api/names/  
Body > raw  
```
  "firstName":"Daniel",
  "lastName":"Alvarez"
```
click: 'Send'  
Confirm new entry on mongodb.com  






  
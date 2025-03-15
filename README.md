GitHub:  
 Your repositories  
 Click Green Button: 'New'  
 Fill in 'Repository name *'  
 [ ]Add a README file (leave unchecked)  
 Click Green Button 'Create Repository'  
 Copy URL (https://github.com/DanielAlvarez2/reponame.git)

VS Code:  
 File > New Window  
 $ cd desktop  
 $ git clone cmd-v (paste URL)  
 (Folder Icon) Open...  
 Open newly created folder  
 $ git config user.name 'Daniel Alvarez'  
 $ git config user.email 'daniel.yllanes@hotmail.com'  
 $ npm create vite@ latest .  (PERIOD='in current directory')  
 ● React  
 ● JavaScript  
 $ npm i  
 package.json: ensure v19+ for react + react-dom  
 $ npm i express mongoose react-icons  
 $ touch .env  
 .gitignore: add '.env'  
 DO NOT DELETE 'src/assets/react.svg' FILE / WILL THROW AN ERROR  
 Delete /public/vite.svg  
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
 
 ---

 /server/server.js:  
 ```js
import express from 'express'
const app = express()
const PORT = process.env.PORT || 8080 (write # down _ _ _ _)
app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))
app.use(express.static('../dist'))
const items = [
    {name:"Laptop",price: 500},
    {name:"Desktop",price: 700}
]
app.get('/api/items',(req,res)=>res.send(items))
 ```

---

 vite.config.js:
 ```js
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:8080' (sub port# from above _ _ _ _)
    }
  },
  plugins: [react()],
})
 ```
 
 ---

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
add another 2 bash terminals, rename 1 express / 2 react / 3 git    
express/server$ node --watch --env-file=../.env server.js (start express before react)  
react$ npm run dev  
click link to open browser  
App.jsx: modify h1 to check hot-reload working  
ctrl+c both servers  
.env: PORT=8081 (current port+1 write# down _ _ _ _)  
.vite.config.js: change PORT to 8081 (port# from above)  
restart both servers (express 1st)  
ensure new port# being used  
change h1 to ensure hot-reloading is working  
/package.json: "start":"cd server && node server.js"  
update README.md  
index.html: <title>NEW TITLE</title>  
Push to GitHub  

---

Render.com:  
 Push Button '+ New'  
 Select 'Web Service'  
 Select GitHub Repo from Dropdown Menu  
 Free $0/month  
 Click Button 'Deploy Web Service'  
 Maximize Log Screen  
 Wait for: 'Your service is live'  
 Minimize Log Screen  
 URL 'Copy to clipboard'  
 Visit URL to ensure app is working online  
 /server/server.js: setInterval(()=>fetch('cmd+v/paste',600000))  
 push to github  
 Render.com:  
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

/server/server.js:  
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
    app.post('/api/names', async (req,res)=>{
        try{
            await Name.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName
            })
            console.loG('Added to Database: ___)
            res.json('Added to Database: ___')
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

server/server.js:  
```js
  app.delete('/api/names/:id',async(req,res)=>{
    try{
      await Name.findByIdAndDelete(req.params.id)
      console.log('Deleted from Database: ___')
      res.json('Deleted from Database: ___'))
    }catch(err){
      console.log(err)
    }
  })
```

mongodb.com: copy ID# of document  
Postman:  
DELETE http://localhost:7071/api/names/(cmd+v/paste)  
click: 'Send'  
confirm entry deleted on mongodb.com  
Postman: add 3 entries to database  

server/server.js:  
```js
  app.get('/api/names', async(req,res=>{
    try{
      const allNames = await.find()
      console.log('All Names From Database: ___')
      res.json(allNames)
    }catch(err){
      console.log(err)
    }
  }))
```
Postman: GET http://localhost:7071/api/names  
click: 'Send'  
confirm response of all names from database  

server/server.js:  
```js
  app.get('/api/names/:id', async(req,res)=>{
    try{
      const name = await Name.findById(req.params.id)
      console.log('1 Wine from Database: ___')
      res.json(name)
    }catch(err){
      console.log(err)
    }
  })
```
copy 1 id# to clipboard  
Postman: GET http://localhost:7071/(cmd+v/paste)  
click: 'Send'  
confirm response of ONE entry from database  

server/server.js:  
```js
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
```
copy 1 id# to clipboard  
Postman: PUT http://localhost:7071/(cmd+v/paste)  
click: 'Send'  
confirm entry updated in mongodb.com  
git push  

## Connect API to React 
/src/App.jsx REPLACE ENTIRE FILE CONTENTS:
```js
  import {useEffect,useState} from 'react'
  import { FaPlusCircle } from 'react-icons/fa'
  import { VscSave } from "react-icons/vsc"

  export default function App(){
    const [names, setNames] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [hiddenID setHiddenID] = useState('')
    const getNames = ()=>{
      fetch('/api/names')
        .then(res=>res.json())
        .then(json=>setNames(json))
        .catch(err=>console.log(err))
    }
    useEffect(()=>getNames(),[])

    async function deleteName(id){
      await fetch(`/api/names/${id}`,{method:'DELETE'})
              .then(console.log('Deleted from Database: ___'))
              .then(async()=> await getNames())
              .catch(err=>console.log(err))
    }
    async function addName(formData){
      await fetch('/api/names'),{ method:'POST,
                                  headers:{'Content-Type':'application/json'},
                                  body: JSON.stringify({
                                    firstName: formData.get('firstName'),
                                    lastName: formData.get('lastName')
                                    )}
            )}
              .then(console.log('Submitted to Database: ___'))
              .then(async()=>await getNames())
              .catch(err=>console.log(err))
    }
    async function updateName(formData){
      await fetch(`/api/names/${formData.get('id')}`,{method:'PUT',
                                                      headers:{'Content-Type':'application/json'},
                                                      body: JSON.stringify({
                                                        firstName:formData.get('firstName'),
                                                        lastName:formData.get('lastName')
                                                      })
      })
        .then(console.log('Name Updated: ___'))
        .then(setEditForm(false))
        .then(async()=>await getNames())
        .catch(err=>console.log(err))
    }
    function updateForm(id,firstName,lastName){
      setHiddenID(id)
      document.querySelector('#firstName').value = firstName
      document.querySelector('#lastName').value = lastName
      setEditForm(true)
    }
    return(
      <>
        <form action={editFrom ? updateName : addName}>
          <input type='hidden' id='id' name='id' value={hiddenID} />
          <label>
            First Name:
            <input id='first-name' name='firstName' placeholder='John' type='text' />
          </label>
          <label>
            LastName:
            <input id='last-name' name='lastName' placeholder='Smith' type='text' />
          </label>
          <button style={editForm ? {background:'blue'} : {background:'black'}}>
            {editForm ? <><VscSave /> Save Changes</> : <><FaPlusCircle /> Add Name</>}
          </button>
        </form>
        {names.map(data=>{
          return(
            <div key={data._id}>{data.firstName} {data.lastName}
              <i  className="fa-solid fa-trash-can" 
                  onClick={()=>deleteName(data._id)}></i>
              <i  className='fa-solid fa-pen'
                  onClick={()=>updateForm(data._id,data.firstName,data.lastName)}></i>
            </div>
          )
        })}
      </>
    )
  }
```
ensure list of names is displaying in React Browser  
git push (READ/DELETE working)  
Render.com dashboard: Overview > Projects  
Click on 'SERVICE NAME'  
MANAGE > Environment  > Environment Variables > '+ Add' > '+ New Variable'  
.env: copy MONGODB_URI environment variable  
Render.com: 'Key' MONGODB_URI 'Value' (cmd+v/paste) 'Save, rebuild, and deploy'   
confirm list of names displaying online 
index.html <head>:  
<script src="https://kit.fontawesome.com/21ef82ed30.js" crossorigin="anonymous"></script>  











  
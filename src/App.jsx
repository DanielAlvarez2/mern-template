import {useEffect,useState} from 'react'
export default function App(){
  const [names, setNames] = useState([])
  const getNames = ()=>{
    fetch('/api/names')
      .then(res=>res.json())
      .then(json=>setNames(json))
      .catch(err=>console.log(err))
  }
  const deleteName = async (id)=>{
    await fetch(`/api/names/${id}`, {method:'DELETE'})
            .then(console.log('Deleted from Database'))
            .then(async()=> await getNames())
            .catch(err=>console.log(err))
  }
  useEffect(()=> getNames(),[])
  async function addName(formData){
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    console.log(formData.get('firstName'))
    console.log(formData.get('lastName'))
    await fetch('/api/names', { method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  firstName:firstName,
                                  lastName:lastName
                                })
          })
      .then(console.log('Submitted to Database'))
      .then(async()=>await getNames())
      .catch(err=>console.log(err))
  }
  return(
    <>
      <form action={addName}>
        <label>
          First Name:
          <input id='first-name' name='firstName' placeholder='John' type='text' />
        </label>
        <label>
          Last Name:
          <input id='last-name' name='lastName' placeholder='Smith' type='text' />
        </label>
        <input type='submit' />
      </form>
      {names.map(data=>{
        return(
          <div key={data._id}>{data.firstName} {data.lastName} <i className="fa-solid fa-trash-can" onClick={()=>deleteName(data._id)}></i></div>
        )
      })}
    </>
  )
}

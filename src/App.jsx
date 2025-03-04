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
            .then(getNames())
            .catch(err=>console.log(err))
  }
  useEffect(()=>getNames(),[])
  return(
    <>
      <form>
        <label>
          First Name:
          <input id='first-name' name='firstName' type='text' />
        </label>
        <label>
          Last Name:
          <input id='last-name' name='lastName' type='text' />
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

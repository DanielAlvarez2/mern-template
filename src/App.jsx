import {useEffect,useState} from 'react'
export default function App(){
  const [names, setNames] = useState([])
  const getNames = ()=>{
    fetch('/api/names')
      .then(res=>res.json())
      .then(json=>setNames(json))
      .catch(err=>console.log(err))
  }
  useEffect(()=>getNames())
  return(
    <>
      {names.map((data,i)=>{
        return(
          <div key={i}>{data.firstName} {data.lastName}</div>
        )
      })}
    </>
  )
}

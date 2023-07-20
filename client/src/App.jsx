import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  useEffect(() =>{
    fetchtodos()
  },[])
  const fetchtodos = async()=>{
    const respons = await fetch("http://localhost:4000/todo");
    const data = await respons.json()
    setTodos(data)
  }
  return (
    
      <div className='App'>
        <h1>hello</h1>
        {todos.map((t)=>(
          <div key = {t.id}>{t.title} </div>
        ))}
      </div>
     
   
  )
}

export default App

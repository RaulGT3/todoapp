import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  useEffect(() =>{
    fetchtodos()
  },[]);
  const fetchtodos = async()=>{
    const respons = await fetch("http://localhost:4000/todo");
    const data = await respons.json()
    setTodos(data)
  };
  const createTodo = async(e)=>{
    e.preventDefault();
    if (!todo) {
      alert("Todo input is empty. Please enter a todo.");
      return;
    }
    const respons = await fetch("http://localhost:4000/todo", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({todo}),
    });
    setTodo("");
    fetchtodos();
    };
  const handleTodoDe =async(id)=>{
    console.log("Removing todo with ID:", id); 
    const respons = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

    }); 
    fetchtodos();
  }
  
  
  return (
    
      <div className='App'>
        <h1>To do List</h1>
        <form action="" onSubmit={createTodo}>
          <input class="inp"type="text" placeholder='Enter todo' onChange={(e)=>setTodo(e.target.value)}value={todo}/>
        </form>
        {todos.map((t)=>(
          <div key = {t.id}>
            <span>{t.title}</span>
            
            <button onClick={() => handleTodoDe(t.id)}>remove</button>
           </div>

          
          
        ))}
        
      
      </div>
     
   
  )
}

export default App

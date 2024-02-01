import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './Todo.css';

function Todo({todoUpdated, setTodoUpdated}) {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState('Namaste Guest');
  
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get('http://localhost:8000/', {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}});
      const {data: {todos: userTodos, username}} = res
      setUsername(username)
      setTodos(userTodos);
      setTodoUpdated(false)
    }
    getTodos();
  }, [todoUpdated])
  console.log(todos)

  const handleDelete = async (id) => {
    setTodoUpdated(false)
    await axios.delete(`http://localhost:8000/delete/${id}`, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}});
    setTodoUpdated(true)
  }
  
  return (
    <div style={{position: 'relative', justifyContent: 'center'}}>
      <h1 style={{textAlign: 'center', color: 'turquoise'}}>{username}'s Todo  List</h1>
      <button style={{color: 'red', backgroundColor: 'yellow', borderRadius: '10px', position: 'absolute', left: '85%', top: '5%'}} onClick={() => {localStorage.removeItem('token'); window.location.href = '/thanks';}} >Logout</button>
      {todos.length ? (
        <table style={{width: '80%', margin: 'auto', textAlign: 'center'}}>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
        {todos.map(todo => (
          <tr key={todo._id} >
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.status ? "Done" : "Not Done "}</td>
            <td>{todo.priority}</td>
            <td style={{textAlign: 'center'}} ><button style={{color: 'red', backgroundColor: 'yellow'}} onClick={() => handleDelete(todo._id)} >X</button></td>
          </tr>
        ))}
      </table>
      ) : (
        <h1>Please add Todos to continue</h1>
      )}
    </div>
  )
}

export default Todo
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './Todo.css';

function Todo({todoUpdated, setTodoUpdated}) {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get('http://localhost:8000/');
      setTodos(res.data.todos);
      setTodoUpdated(false)
    }
    getTodos();
  }, [todoUpdated])
  console.log(todos)
  return (
    <>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
        {todos.map(todo => (
          <tr>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.status ? "Done" : "Not Done "}</td>
            <td>{todo.priority}</td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default Todo
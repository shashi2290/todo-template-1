import React, {useState} from 'react'
import axios from 'axios';
// import Todo from '../models/Todo.js';
function TodoForm({setTodoUpdated}) {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    status: false,
    priority: 'low'
  });
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'title':
        setFormState({
          ...formState,
          title: e.target.value
        })
        break;
      case 'description':
        setFormState({
          ...formState,
          description: e.target.value
        })
        break;
      case 'status':
        setFormState({
          ...formState,
          status: e.target.checked
        })
        break;
      case 'priority':
        setFormState({
          ...formState,
          priority: e.target.value
        })
    
      default:
        break;
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/create', formState);
      setFormState({title: '', description: '', status: false, priority: 'low'});
      setTodoUpdated(true);
    } catch (error) {
      console.log(error);
    }
    
  }
  console.log(formState);
  return (
    <>
    <form>
      <div>
        Title: 
        <input type="text" value={formState.title} name="title" onChange={handleChange} ></input>
      </div>

      <div>
        Description: 
        <input type="text" value={formState.description} name="description" onChange={handleChange} ></input>
      </div>

      <div>
        Is it done?
        <input type="checkbox" value={formState.status} name="status" onChange={handleChange}></input>
      </div>

      <div>
        Priority:
        Low<input type="radio" value='low' name="priority" onChange={handleChange}></input>
        MED<input type="radio" value='med' name="priority" onChange={handleChange}></input>
        HIGH<input type="radio" value='high' name="priority" onChange={handleChange}></input>
      </div>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
    </>
  )
}

export default TodoForm
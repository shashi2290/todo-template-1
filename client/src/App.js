import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Login from './components/Login/Login';
import Thanks from './components/Thanks/Thanks';
// TODO: Make this app with user authenticaion

function App() {
  const [todoUpdated, setTodoUpdated] = React.useState(false);
  const renderTodo = () => {
    return (
      <>
        
        <Todo todoUpdated={todoUpdated} setTodoUpdated={setTodoUpdated} />
        <h2>Create new todo here</h2>
        <TodoForm setTodoUpdated={setTodoUpdated} />
      </>
    )
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/todo-page" element={renderTodo()} />
          <Route path='/thanks' element={<Thanks />} />
        </Routes>
      </Router>
    </>
    );
}

export default App;

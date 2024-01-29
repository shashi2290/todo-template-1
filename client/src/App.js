import React from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
// TODO: Make this app with user authenticaion

function App() {
  const [todoUpdated, setTodoUpdated] = React.useState(false);
  return (
    <>
      <h1>Your Todo  List</h1>
      <Todo todoUpdated={todoUpdated} setTodoUpdated={setTodoUpdated} />

      <h2>Create new todo here</h2>
      <TodoForm setTodoUpdated={setTodoUpdated} />
    </>
    );
}

export default App;

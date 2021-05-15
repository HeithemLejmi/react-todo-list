import React, { useEffect, useRef, useState } from 'react';
import ToDoList from './ToDoList';
import { uuid } from 'uuidv4';

const todoList = 
[
  {
    id: "1",
    name : "Todo 1",
    complete: true
  },
  {
    id: "2",
    name : "Todo 2",
    complete: false
  }
];
function App() {

  const LOCAL_STORAGE_KEY = 'todoApp.todos';
  
  const [todos, setTodos] = useState(todoList);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos && storedTodos.size !== 0){
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  // Mark the todo as completed based on its id
  function handleToggle(id) {
    const newTodos = [...todos];
    // Find the todo by its id
    const todo = newTodos.find(todo => todo.id === id);
    // Mark it as completed
    todo.complete = !todo.complete;
    // Save the updated todos
    setTodos(newTodos);
  }

  function handleAddToDo() {
    // Use the useRef to access the element input and store the name text
    const newName = todoNameRef.current.value;
    // Add the new todo to the original array and store it in the state
    if(newName){
      setTodos( prevTodos => {
        return [
          ...prevTodos, 
          {
            name: newName,
            complete: false,
            id: uuid()
          }
        ]
      });
    }
    // Clean the ref value and restore it to null
    todoNameRef.current.value = null;
  }

  function handleCleanTodos() {
    const incompleted = todos.filter(todo => !todo.complete);
    setTodos(incompleted);
  }

  return (
    <>
      <ToDoList todos={todos} handleToggle={handleToggle}/>
      <input type='text' ref={todoNameRef}/>
      <button onClick={handleAddToDo}> Add </button>
      <button onClick={handleCleanTodos}> Clear Completed ToDo </button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;

import React from 'react';
import ToDo from './ToDo';

export default function ToDoList({todos, handleToggle}) {
    return (
        <div>
            {todos.map(todo => {
                return <ToDo key={todo.id} todo={todo} handleToggle={handleToggle}/>})}
        </div>
    )
}

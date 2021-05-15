import React from 'react'

export default function ToDo({todo, handleToggle}) {
    const handleToggleClick = () => handleToggle(todo.id);
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleToggleClick}/>
                {todo.name}
             </label>
        </div>
    )
}

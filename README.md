# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- To create/init the project : 

Run this command, to create the react-app inside the current folder :
> npx create-react-app .

- To run the project locally : 

Run the following command, in the project directory :
>npm start


# New Tips :

## Tip 1 : <> ... </>
- A javascript function can return only one thing (one element), that why, this code won't work because we are returning two elements (the ToDoList compo and the input html).

```javascript
function App() {
  return (
     <ToDoList />
     <input type='text' />
  );
}

```

==> error msg :

```
 Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
```
- To fix this, we include both these two elemnts inside one parent elment :

```javascript
function App() {
  return (
    <>
      <ToDoList />
      <input type='text' />
    </>
  );
}
```
## Tip 2 : State

- Set state in our react-app : the way that React works, is that React manages the state in the application and when that state changes, it re-render the app

--> Stores these todos in the state, so whenever we change/ad/delete a todo, it will re-render the component tree
--> In order to use state in a functional comp, we need to use a hook called "useState"

```javascript
const [todos, setToDos] = useState([]);
```


## Tip 3: using key when mapping a list of children components inside a parent:

- Sometimes, we encounter a bug, when we try to render a list of children components inside of the parent component:

```javascript
export default function ToDoList({todos}) {
    return (
        <div>
            {todos.map(todo => <ToDo todo={todo} />)}
        </div>
    )
}
```

---> error msg :
```
index.js:1 Warning: Each child in a list should have a unique "key" prop.
Check the render method of `ToDoList`. 
```

- The reason behind this bug is that react doesn't know how to update these children components, properly : everytime the main list (the todos list here) changes, react will re-render every single todo item in that list (even the ones that didn't change)
===> We want React to render only the ones that changes

- Solution: add a `key` attribute in the child component, and set it to a unique value (for example the `todo.id`)
This key attribute will help react to know which child component to render (only the one that changes) ==> which improves te efficiency of the app.


## Tip 4 : How to store data/state in the local storage :
- Context: we can store data in the state of our component, but once we re-render that component after refreshing the page for example, the data stored in its state will dissapear, and it will be replaced by the default value (that we used in the useState hook).
So, how can we persist the data of the todos that we add, without fearing that it will be removed from the state when we referesh the page ??

- Solution: we can store these data in the localStorage, and then retrieve it once we mount our component again :

```javascript

// Unique Key to use to be able to access the localStorage for the specific data related to todos 
const LOCAL_STORAGE_KEY = 'todoApp.todos';

// Using hook to recover data from the localStorage using the key, and then setting the State with the retrieved data
// The array of dependency of useEffect is empty, which means that the effect in this hook is called only one time when we mount the component.
useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos && storedTodos.size !== 0){
      setTodos(storedTodos);
    }
  }, [])

// Using hook to store data in the localStorage (the dep. array contains the todos list, which means that the effect of storing of data is done everytime the todos list changes) 
useEffect(() => {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
   }, [todos])
```

Remarks: the data stored in the localStorage in a string format => we need to call JSON.stringfy(data) when storing data and call the JSON.parse(data) when we recover it from the localStorage.

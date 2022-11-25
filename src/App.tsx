import { useState } from 'react'

import './App.css'

import Button from './components/reuseable_components/button'
import Input from './components/reuseable_components/input'

function App() {
  const data = [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
      priority: 'medium',
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: true,
      priority: 'high',
    },
  ]

  const [todos, setTodos] = useState(data)
  const [newTodo, setNewTodo] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [newCompleted, setNewCompleted] = useState(false)

  // A function to add a new todo
  const addTodo = () => {
    const newTodoObj = {
      id: todos.length + 1,
      title: newTodo,
      completed: newCompleted,
      priority: newPriority,
    }
    setTodos([...todos, newTodoObj])
    setNewTodo('')
    setNewPriority('')
    setNewCompleted(false)
  }

  // A function to delete a todo
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // A function that checks how many todos are completed
  const completedTodos = data.filter((todo) => todo.completed === true)
  const completedTodosCount = completedTodos.length

  return (
    <div className="App">
      <div className="todo_header">
        <h1>Todo List</h1>
        <Button className="add_button" onClick={addTodo} text="+" />
        <Input
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Feed the cat..."
          className="add_input"
        />
        <div className="todo_stats">
          <p>Total todos {todos.length}</p>
          <p>Completed todos {completedTodosCount} </p>
        </div>
      </div>
      {todos.map(({ title, priority, id }) => {
        return (
          <Button key={id} onClick={() => {}} className="todo_item">
            <Input onChange={() => {}} value={title} className="todo_input" />
            {priority}
            <Button
              className="delete_button"
              onClick={() => {
                deleteTodo(id)
              }}
              text="X"
            />
          </Button>
        )
      })}
    </div>
  )
}

export default App

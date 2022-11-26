import { useCallback, useMemo, useRef, useState } from 'react'

import './App.css'

import Button from './components/reuseable_components/button'
import Input from './components/reuseable_components/input'

function App() {
  const data = [
    {
      id: 1,
      title: 'Todo Example 1 ',
      completed: false,
      priority: 'medium',
    },
    {
      id: 2,
      title: 'Todo Example 2 Completed',
      completed: true,
      priority: 'high',
    },
  ]

  const [todos, setTodos] = useState(data)

  console.log(todos)
  const [newTodo, setNewTodo] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [newCompleted, setNewCompleted] = useState(false)
  const [error, setError] = useState('')

  const noTodos = todos.length === 0

  // A function to add a new todo
  const addTodo = () => {
    if (newTodo === '') {
      setError('Todo cannot be empty')

      return
    }
    const newTodoObj = {
      id: todos.length + 1,
      title: newTodo,
      completed: newCompleted,
      priority: newPriority,
    }
    setTodos([...todos, newTodoObj])
    setNewTodo('')
    setError('')
    setNewCompleted(false)
  }

  // A function to set a todo as completed
  const setCompleted = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  // A function to delete a todo
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // A function that checks how many todos are completed
  // I will use useMemo to memoize this function because it has the potential to
  // become expensive, although it is unlikely in this case, however, I like to prepare for
  // future problems if I can see them coming.
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed === true),
    [todos]
  )
  const completedTodosCount = completedTodos.length

  return (
    <div className="App">
      <div className="todo_header">
        <h1>Todo List</h1>
        <Button className="add_button" onClick={addTodo} text="+" />
        <Input
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Feed the cat..."
          className={error ? 'add_input_error' : 'add_input'}
          value={newTodo}
          error={error}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo()
          }}
        />

        <div className="todo_stats">
          <p>Total todos {todos.length}</p>
          <p>Completed todos {completedTodosCount} </p>
        </div>
      </div>
      <Button text="Name" onClick={() => {}} />
      <Button text="Priority" onClick={() => {}} />
      {noTodos && (
        <h1 className="noTodos">ADD A TODO ABOVE, AND IT WILL APPEAR HERE</h1>
      )}
      {todos.map(({ title, priority, id, completed }) => {
        return (
          <div
            key={id}
            className={`todo_item ${completed && 'todo_completed'} `}
          >
            <Input onChange={() => {}} value={title} className="todo_input" />
            {priority}
            <div className="todo_buttons">
              <Button
                className="complete_button"
                onClick={() => setCompleted(id)}
                text="/"
              />
              <Button
                className="delete_button"
                onClick={() => {
                  deleteTodo(id)
                }}
                text="X"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App

import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Todo } from '../types/types'
import useDebounce from './hooks/useDebounce'

import './App.css'

import Button from './components/reuseable_components/button'
import Input from './components/reuseable_components/input'
import Select from './components/select/select'

function App() {
  const [todos, setTodos] = useState<Todo>(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem('todos')
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos)
      // otherwise
    } else {
      // return an empty array
      return []
    }
  })
  const [newTodo, setNewTodo] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [filterPriority, setFilterPriority] = useState('Show All')
  const [search, setSearch] = useState('')
  const [newCompleted, setNewCompleted] = useState(false)
  const [error, setError] = useState('')

  const noTodos = todos.length === 0

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    // add the todos as a dependancy because we want to update the
    // localstorage anytime the todos state changes
  }, [todos])

  // A function to add a new todo
  const addTodo = () => {
    if (newTodo === '') {
      setError('Todo cannot be empty')
      return
    }
    const newTodoObj = {
      id: uuidv4(),
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
  const setCompleted = (id: string) => {
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
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // A function to Edit a todo
  const editTodo = (id: string, newTitle: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  // Gets the value of the select input
  const selectedValue = (priorityValue: string) => {
    setFilterPriority(priorityValue)
  }

  // Search the todos based on title using a debounce hook
  const debouncedSearch = useDebounce(search, 200)
  const filteredTodos =
    debouncedSearch === ''
      ? todos
      : todos.filter((todo: any) => todo.title.toString().includes(search))

  // Combine the search and filter
  const combinedFilter = useMemo(() => {
    return filteredTodos.filter((todo: any) => {
      if (filterPriority === 'Show All') {
        return filteredTodos
      } else if (filterPriority === 'High') {
        return todo.priority === 'high'
      } else if (filterPriority === 'Medium') {
        return todo.priority === 'medium'
      } else if (filterPriority === 'Low') {
        return todo.priority === 'low'
      }
    })
  }, [filteredTodos, filterPriority])

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
          placeholder="Create a new task..."
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
      {noTodos ? (
        ''
      ) : (
        <div className="search_container">
          <Input
            placeholder="Search for a name"
            onChange={(e) => setSearch(e.target.value)}
            className="search_input"
          />

          <select
            defaultValue={'Select'}
            onChange={(e) => selectedValue(e.target.value)}
          >
            <option disabled>Select</option>
            <option value="Show All">Show all</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      )}
      {noTodos && (
        <h1 className="noTodos">ADD A TODO ABOVE, AND IT WILL APPEAR HERE</h1>
      )}

      {combinedFilter.map(({ title, priority, id, completed }) => (
        <div key={id} className={`todo_item ${completed && 'todo_completed'} `}>
          <Input
            onChange={(e) => editTodo(id, e.target.value)}
            value={title}
            className="todo_input"
          />
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
      ))}
    </div>
  )
}

export default App

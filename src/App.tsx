import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Todo } from '../types/types'
import Search from './components/search/search'
import Todoitem from './components/todoItem/todoitem'
import useDebounce from './hooks/useDebounce'

import './App.css'

import Header from './components/header/header'

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
  const [newPriority, setNewPriority] = useState('Medium')
  const [filterPriority, setFilterPriority] = useState('Show All')
  const [search, setSearch] = useState('')
  const [newCompleted, setNewCompleted] = useState(false)
  const [error, setError] = useState('')

  // A variable to help hide componentes when there are no todos
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

  //  A function to update the priority of a todo
  const updatePriority = (id: string, newPriority: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          priority: newPriority,
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
        return todo.priority === 'High'
      } else if (filterPriority === 'Medium') {
        return todo.priority === 'Medium'
      } else if (filterPriority === 'Low') {
        return todo.priority === 'Low'
      } else if (filterPriority === 'Completed') {
        return todo.completed === true
      } else if (filterPriority === 'Not Completed') {
        return todo.completed === false
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
    <div className="container">
      <Header
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        newTodo={newTodo}
        error={error}
        todos={todos}
        completedTodosCount={completedTodosCount}
      />
      {noTodos ? (
        <h1 className="noTodos">
          CREATE A NEW TODO ITEM ABOVE, AND IT WILL APPEAR HERE
        </h1>
      ) : (
        <Search setSearch={setSearch} selectedValue={selectedValue} />
      )}

      {combinedFilter.map(({ title, priority, id, completed }) => (
        <Todoitem
          id={id}
          completed={completed}
          editTodo={editTodo}
          title={title}
          priority={priority}
          updatePriority={updatePriority}
          setCompleted={setCompleted}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  )
}

export default App

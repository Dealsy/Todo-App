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

  // A function that checks how many todos are completed
  const completedTodos = data.filter((todo) => todo.completed === true)
  const completedTodosCount = completedTodos.length

  return (
    <div className="App">
      <div className="todo_header">
        <h1>Todo List</h1>
        <Button className="add_button" onClick={() => {}} text="+" />
        <Input
          onChange={() => {}}
          placeholder="Feed the cat..."
          className="add_input"
        />
        <div className="todo_stats">
          <p>Total todos {data.length}</p>
          <p>Completed todos {completedTodosCount} </p>
        </div>
      </div>
      {data.map(({ title, priority }) => {
        return (
          <div className="todo_item">
            <Input onChange={() => {}} value={title} className="todo_input" />
            <Button className="delete_button" onClick={() => {}} text="X" />
          </div>
        )
      })}
    </div>
  )
}

export default App

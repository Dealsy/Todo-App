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
      completed: false,
      priority: 'high',
    },
  ]

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

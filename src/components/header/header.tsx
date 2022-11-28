import Plus from '@heroicons/react/24/outline/PlusIcon'

import { Todo } from '../../../types/types'
import Button from '../reuseable_components/button'
import Input from '../reuseable_components/input'

type HeaderProps = {
  addTodo: () => void
  setNewTodo: React.Dispatch<React.SetStateAction<string>>
  newTodo: string
  error: string
  todos: Todo
  completedTodosCount: number
}

const Header = ({
  setNewTodo,
  addTodo,
  newTodo,
  error,
  todos,
  completedTodosCount,
}: HeaderProps) => {
  return (
    <div className="todo_header">
      <h1>Todo App</h1>
      <Button className="add_button" onClick={addTodo} Icon={Plus} />
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
        <p>Total todos: {todos.length}</p>
        <p>Completed todos: {completedTodosCount} </p>
      </div>
    </div>
  )
}

export default Header

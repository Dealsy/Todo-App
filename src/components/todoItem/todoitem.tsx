import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import Button from '../reuseable_components/button'
import Input from '../reuseable_components/input'
import Select from '../select/select'

type todoItemProps = {
  id: string
  completed: boolean
  editTodo: (id: string, title: string) => void
  title: string
  priority: string
  updatePriority: (id: string, priority: string) => void
  setCompleted: (id: string) => void
  deleteTodo: (id: string) => void
}

const Todoitem = ({
  id,
  completed,
  editTodo,
  title,
  priority,
  updatePriority,
  setCompleted,
  deleteTodo,
}: todoItemProps) => {
  return (
    <div key={id} className={`todo_item ${completed && 'todo_completed'} `}>
      <Input
        onChange={(e) => editTodo(id, e.target.value)}
        value={title}
        className="todo_input"
      />

      <Select
        defaultValue={priority}
        onChange={(e) => updatePriority(id, e.target.value)}
        className="priority_select"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>

      <div className="todo_buttons">
        <Button
          className={`complete_button  ${completed && 'complete_button_done'}`}
          onClick={() => setCompleted(id)}
          Icon={CheckIcon}
          IconClassName="check_Icon"
        />
        <Button
          className="delete_button"
          onClick={() => {
            deleteTodo(id)
          }}
          Icon={XMarkIcon}
          IconClassName="xmark_Icon"
        />
      </div>
    </div>
  )
}

export default Todoitem

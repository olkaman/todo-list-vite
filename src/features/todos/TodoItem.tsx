import { Check, Trash, X } from 'lucide-react'
import IconButton from '../../components/IconButton'
import CustomCheckbox from './CustomCheckbox'
import { useState } from 'react'
import TextAreaField from '../../components/TextAreaField'
import { TodoItemType } from '../../utils/models'
import clsx from 'clsx'
import useListsStore from '../../stores/listStore'
import { removeTodo, updateTodo } from '../../services/todos.service'
import { useUserId } from '../../stores/userStore'
import { iconSize, strokeWidth } from '../../utils/settings'

type Props = {
  todo: TodoItemType
  listId: string
}

export default function TodoItem(props: Props) {
  const { todo, listId } = props

  const [isTaskEdited, setIsTaskEdited] = useState(false)
  const [inputValue, setInputValue] = useState(todo.task)
  const [isChecked, setIsChecked] = useState(todo.checked)
  const updateTodoItemInCurrentList = useListsStore((state) => state.updateTodoItemInCurrentList)
  const removeTodosFromCurrentList = useListsStore((state) => state.removeTodosFromCurrentList)
  const userId = useUserId()

  const handleOnSave = () => {
    setIsTaskEdited(!isTaskEdited)
    editTaskValue({ ...todo, task: inputValue.trim() })
  }

  const handleOnCheck = () => {
    setIsChecked(!isChecked)
    editTaskValue({ ...todo, checked: !isChecked })
  }

  const editTaskValue = (updatedTodo: TodoItemType) => {
    updateTodoItemInCurrentList(updatedTodo)
    updateTodo(userId, updatedTodo, listId)
      .then(() => {
        // alert('todos were saved');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleRemove = () => {
    removeTodo(userId, todo, listId)
    removeTodosFromCurrentList(todo.key)
  }

  return (
    <div
      className={clsx(
        isTaskEdited && 'dark:border dark:border-gray-dark dark:border-l-accent',
        'card boxShadow rounded-xl w-full mb-5 p-6 flex flex-row items-center justify-between'
      )}
    >
      {!isTaskEdited && <CustomCheckbox checked={todo?.checked || false} handleOnCheck={handleOnCheck} disabled={todo?.task === ''} />}
      {isTaskEdited ? (
        <div className='w-full flex flex-row items-center justify-between'>
          <TextAreaField inputValue={inputValue} placeholder='Edit task name' className={todo.key} setInputValue={setInputValue} />
          <div className='flex flex-row items-center'>
            <IconButton handleOnClick={handleOnSave} icon={<Check strokeWidth={strokeWidth} size={iconSize} />} />
            <IconButton handleOnClick={() => setIsTaskEdited(!isTaskEdited)} icon={<X strokeWidth={strokeWidth} size={iconSize} />} />
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-between items-center w-full'>
          <button onClick={() => setIsTaskEdited(!isTaskEdited)} disabled={todo?.checked} className='text-left'>
            {todo?.task !== '' ? todo?.task : <i>Enter task name</i>}
          </button>
          <div className='flex items-center'>
            <p className='text-xs'>{new Date(todo?.date || '').toLocaleString()}</p>
            <IconButton handleOnClick={handleRemove} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} />
          </div>
        </div>
      )}
    </div>
  )
}

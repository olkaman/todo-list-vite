import { Check, Trash, X } from 'lucide-react'
import IconButton from '../../components/IconButton'
import CustomCheckbox from './CustomCheckbox'
import { useRef, useState } from 'react'
import TextAreaField from '../../components/TextAreaField'
import { TodoItemType } from '../../utils/models'
import clsx from 'clsx'
import useListsStore from '../../stores/listStore'
import { removeTodo, updateTodo } from '../../services/todos.service'
import { useUserId } from '../../stores/userStore'
import { iconSize, strokeWidth } from '../../utils/settings'
import { Modal } from '../../components/Modal'
import { ButtonStyleTypes } from '../../utils/globalTypes'
import { toast } from 'sonner'

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
  const isTaskReady = todo.checked
  const modalRef = useRef<HTMLDialogElement>(null)

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
        toast.success(`Task was updated`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const removeTodos = () => {
    removeTodo(userId, todo, listId)
      .then(() => {
        toast.success(`Task ${todo.task} was removed`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
    removeTodosFromCurrentList(todo.key)
  }

  return (
    <>
      <div
        className={clsx(
          isTaskEdited && 'dark:border dark:border-gray-dark dark:border-l-accent py-6',
          !isTaskEdited && 'py-4',
          isTaskReady && 'opacity-40 hover:opacity-100',
          'group/todoItem card boxShadow hover:shadow-2xl rounded-lg w-full mb-5 px-6 flex flex-row items-center justify-between hover:scale-101 border-l-lightMode-white border-l-2  hover:border-l-2 hover:border-l-accentLightModeText dark:border-l-darkMode-gray dark:hover:border-l-accent dark:hover:shadow-darkMode-grayDark globalTransition'
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
            <button
              onClick={() => setIsTaskEdited(!isTaskEdited)}
              disabled={todo?.checked}
              className={clsx(
                isTaskReady && 'line-through ',
                !isTaskReady &&
                  'break-words w-full max-w-[800px] group-hover/todoItem:text-accentLightModeText group-hover/todoItem:underline group-hover/todoItem:underline-offset-2 dark:group-hover/todoItem:text-accent',
                'text-left py-3 disabled:cursor-not-allowed break-words pr-6'
              )}
            >
              {todo?.task !== '' ? todo?.task : <i>Enter task name</i>}
            </button>
            <div className='flex items-center'>
              <p className='text-xs'>{new Date(todo?.date || '').toLocaleString()}</p>
              <IconButton handleOnClick={onOpenModal} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} />
            </div>
          </div>
        )}
      </div>
      <Modal
        buttonStyleType={ButtonStyleTypes.Primary}
        handleOnCancel={() => modalRef.current?.close()}
        handleOnConfirm={removeTodos}
        title='Remove list?'
        confirmButtonLabel='Remove'
        ref={modalRef}
      >
        <p>
          Are you sure you want to remove the task: <span className='font-semibold'>{`'${todo.task}'`}</span>?
        </p>
      </Modal>
    </>
  )
}

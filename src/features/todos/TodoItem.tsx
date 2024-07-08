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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import EditTaskButton from './EditTaskButton'
import DragIcon from './DragIcon'

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

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id })

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
      .then(() => toast.success(`Task was updated`))
      .catch(() => toast.error('Something went wrong'))
  }

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const removeTodos = () => {
    removeTodo(userId, todo, listId)
      .then(() => toast.success(`Task <strong>'${todo.task}'</strong> was removed`))
      .catch(() => toast.error('Something went wrong'))
    removeTodosFromCurrentList(todo.key)
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isTaskEdited) {
    return (
      <div ref={setNodeRef} style={style} className='group/todoItem todo dark:border dark:border-gray-dark dark:border-l-accent py-6 pl-3 pr-6'>
        <div className='w-full flex flex-row items-center justify-between'>
          <DragIcon attributes={{ ...attributes }} listeners={{ ...listeners }} />
          <TextAreaField inputValue={inputValue} placeholder='Edit task name' className={todo.key} setInputValue={setInputValue} />
          <div className='flex flex-row items-center'>
            <IconButton handleOnClick={handleOnSave} icon={<Check strokeWidth={strokeWidth} size={iconSize} />} customStyles='ml-3' />
            <IconButton handleOnClick={() => setIsTaskEdited(!isTaskEdited)} icon={<X strokeWidth={strokeWidth} size={iconSize} />} customStyles='ml-3' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={setNodeRef} style={style} className={clsx(' todo py-4 pl-3 pr-6', isTaskReady && 'opacity-40 hover:opacity-100', 'group/todoItem')}>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex justify-start items-center'>
            <DragIcon attributes={{ ...attributes }} listeners={{ ...listeners }} />
            <CustomCheckbox checked={todo?.checked || false} handleOnCheck={handleOnCheck} disabled={todo?.task === ''} />
            <EditTaskButton todoChecked={todo?.checked} setIsTaskEdited={setIsTaskEdited} isTaskEdited={isTaskEdited} isTaskReady={isTaskReady}>
              {todo?.task !== '' ? todo?.task : <i>Enter task name</i>}
            </EditTaskButton>
          </div>

          <div className='flex items-center'>
            <p className='text-xs text-right'>{new Date(todo?.date || '').toLocaleString()}</p>
            <IconButton handleOnClick={onOpenModal} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} customStyles='ml-3' />
          </div>
        </div>
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

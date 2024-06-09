import TodoItem from '../features/todos/TodoItem'
import { SyntheticEvent, useEffect, useState } from 'react'
import { TodoItemType } from '../utils/models'
import AddNewForm from '../components/AddNewForm'
import { useParams } from 'react-router-dom'
import useListsStore, { useCurrentListTodos, useListIdByKey, useLists } from '../stores/listStore'
import { fetchAllTodos, saveNewTodo } from '../services/todos.service'
import { useUserId } from '../stores/userStore'
import { toast } from 'sonner'
import Counter from '../features/todos/Counter'
import pencilLight from '../assets/pencilLight.svg'

export default function TodoPage() {
  const todos = useCurrentListTodos()
  const { listKey } = useParams()
  const listId = useListIdByKey(listKey ?? '')
  const addTodoToCurrentList = useListsStore((state) => state.addTodosToCurrentList)
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList)
  const [newTaskName, setNewTaskName] = useState('')
  const userId = useUserId()
  const lists = useLists()
  console.log(lists)

  const fetchTodos = () => {
    fetchAllTodos(userId, listId)
      .then((allTodos) => {
        loadTodosToCurrentList(allTodos ?? [])
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  useEffect(() => {
    fetchTodos()
  }, [listId, userId])

  const onAddNewTodo = (e: SyntheticEvent) => {
    e.preventDefault()
    const newTodo: TodoItemType = {
      key: Math.floor(Math.random() * 10000).toString(),
      task: newTaskName,
      checked: false,
      date: Date.now(),
      id: '',
    }

    addTodoToCurrentList(newTodo)
    saveNewTodo(userId, newTodo, listId)
      .then(() => {
        toast.success(`Task was added`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })

    setNewTaskName('')
    fetchTodos()
  }

  return (
    <section>
      <AddNewForm onSubmit={onAddNewTodo} inputValue={newTaskName} setInputValue={setNewTaskName} placeholder='Add new task' counterMax={200} />
      {todos.length === 0 ? (
        <section className='flex justify-center items-center h-todos'>
          <div className='flex flex-col justify-center items-center bg-lightMode-white/30 dark:bg-darkMode-grayDark/30 w-60 h-60 rounded-full'>
            <img src={pencilLight} className='w-24' />
            <span className='text-center text-lightMode-placeholder dark:text-darkMode-placeholder mt-3'>
              <h3 className='h3'>Your list is empty!</h3>
              <p className='text-xs'>
                Now you can relax <br />
                or add new tasks
              </p>
            </span>
          </div>
        </section>
      ) : (
        <>
          <Counter listKey={listKey} />
          {todos.map((todo) => {
            return <TodoItem key={todo.key} todo={todo} listId={listId} />
          })}
        </>
      )}
    </section>
  )
}

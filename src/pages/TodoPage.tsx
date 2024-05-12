import TodoItem from '../features/todos/TodoItem'
import { SyntheticEvent, useEffect, useState } from 'react'
import { TodoItemType } from '../utils/models'
import AddNewForm from '../components/AddNewForm'
import { useParams } from 'react-router-dom'
import useListsStore, { useCurrentListTodos, useListIdByKey } from '../stores/listStore'
import { fetchAllTodos, saveNewTodo } from '../services/todos.service'
import { useUserId } from '../stores/userStore'
import { toast } from 'sonner'

export default function TodoPage() {
  const todos = useCurrentListTodos()
  const { listKey } = useParams()
  const listId = useListIdByKey(listKey ?? '')
  const addTodoToCurrentList = useListsStore((state) => state.addTodosToCurrentList)
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList)
  const [newTaskName, setNewTaskName] = useState('')
  const userId = useUserId()
  const readyTasksNumber = todos.filter((todo) => todo.checked).length
  const totalTasksNumber = todos.length

  const fetchTodos = () => {
    fetchAllTodos(userId, listId)
      .then((allTodos) => {
        loadTodosToCurrentList(allTodos ?? [])
      })
      .catch(() => {})
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
    saveNewTodo(userId, newTodo, listId).then(() => {
      toast.success('To do item was added')
    })
    setNewTaskName('')
    fetchTodos()
  }

  return (
    <section>
      <AddNewForm onSubmit={onAddNewTodo} inputValue={newTaskName} setInputValue={setNewTaskName} />
      <div className='text-center mb-4 px-4 py-2'>{`Ready tasks: ${readyTasksNumber} / ${totalTasksNumber}`}</div>
      {todos.map((todo) => {
        return <TodoItem key={todo.key} todo={todo} listId={listId} />
      })}
    </section>
  )
}

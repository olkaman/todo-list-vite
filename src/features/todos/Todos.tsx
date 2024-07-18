import TodoItem from './TodoItem'
import { SyntheticEvent, useEffect, useState } from 'react'
import { TodoItemType, TodoList } from '../../utils/models'
import AddNewForm from '../../components/AddNewForm'
import { useParams } from 'react-router-dom'
import useListsStore, { useCurrentListTodos } from '../../stores/listStore'
import { fetchAllTodos, saveNewTodo } from '../../services/todos.service'
import { useUserId } from '../../stores/userStore'
import { toast } from 'sonner'
import Counter from './Counter'
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { updateList } from '../../services/lists.service'
import EmptyPage from '../../components/EmptyPage'

export default function Todos() {
  const { listKey } = useParams()
  const todos = useCurrentListTodos()
  const lists = useListsStore((state) => state.lists)
  const [currentListId, setCurrentListId] = useState('')
  const [currentList, setCurrentList] = useState<TodoList>(() => lists[0])
  const addTodoToCurrentList = useListsStore((state) => state.addTodosToCurrentList)
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList)

  const [newTaskName, setNewTaskName] = useState('')
  const userId = useUserId()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const todosIds = todos.map((todo) => todo.id)

  useEffect(() => {
    const currentList = lists.find((l) => l.key === listKey)
    if (currentList) {
      fetchAllTodos(userId, currentList.listId)
        .then((allTodos) => loadTodosToCurrentList(allTodos ?? []))
        .catch(() => toast.error('Something went wrong'))

      setCurrentListId(currentList.listId)
      setCurrentList(currentList)
    }
  }, [lists, listKey])

  const onAddNewTodo = (e: SyntheticEvent) => {
    e.preventDefault()
    const newTodo: TodoItemType = {
      key: Math.floor(Math.random() * 10000).toString(),
      task: newTaskName,
      checked: false,
      date: Date.now(),
      id: '',
      colId: '1',
    }
    addTodoToCurrentList(newTodo)
    saveNewTodo(userId, newTodo, currentListId)
      .then(() => toast.success(`Task was added`))
      .catch(() => toast.error('Something went wrong'))
    setNewTaskName('')
  }

  const getTodoPosition = (id: UniqueIdentifier) => {
    return todos.findIndex((todo) => todo.id === id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = getTodoPosition(active.id)
      const newIndex = getTodoPosition(over.id)

      const newTodos = arrayMove(todos, oldIndex, newIndex)
      console.log(newTodos)
      loadTodosToCurrentList(newTodos)

      const newList: TodoList = { ...currentList, todos: newTodos }

      updateList(userId, currentListId, newList)
        .then(() => toast.success(`Tasks were updated`))
        .catch(() => toast.error('Something went wrong'))
    }
  }

  return (
    <section className='py-6 px-20'>
      <AddNewForm onSubmit={onAddNewTodo} inputValue={newTaskName} setInputValue={setNewTaskName} placeholder='Add new task' counterMax={200} />
      {todos.length === 0 ? (
        <EmptyPage />
      ) : (
        <>
          <Counter listKey={listKey} />
          <DndContext collisionDetection={closestCorners} sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={todosIds} strategy={verticalListSortingStrategy}>
              {todos.map((todo) => {
                return <TodoItem key={todo.key} todo={todo} listId={currentListId} />
              })}
            </SortableContext>
          </DndContext>
        </>
      )}
    </section>
  )
}

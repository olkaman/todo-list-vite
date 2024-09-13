import { useMemo, useState } from 'react'
import { DndContext, DragEndEvent, UniqueIdentifier, closestCorners, DragOverlay, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanColumn, TodoItemType } from '../utils/models'
import Column from '../features/kanbanBoard/Column'
import { createPortal } from 'react-dom'
import Task from '../features/kanbanBoard/Task'
import useListsStore, { useCurrentListTodos } from '../stores/listStore'

export default function Board() {
  const initColumns = [
    { id: '1', title: 'Col1' },
    { id: '2', title: 'Col2' },
    { id: '3', title: 'Col3' },
  ]
  const [columns, setColumns] = useState<KanbanColumn[]>(initColumns)
  const [activeColumn, setActiveColumn] = useState<KanbanColumn | null>(null)
  const [activeTask, setActiveTask] = useState<TodoItemType | null>(null)
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns])

  const initTasks = [
    { id: '4', title: 'Task1', colId: '1' },
    { id: '5', title: 'Task2', colId: '1' },
    { id: '6', title: 'Task3', colId: '3' },
    { id: '7', title: 'Task4', colId: '2' },
    { id: '8', title: 'Task5', colId: '3' },
    { id: '9', title: 'Task6', colId: '3' },
  ]
  // const [tasks, setTasks] = useState<KanbanTask[]>(initTasks)
  const tasks = useCurrentListTodos()
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList)

  function getItemPos(id: UniqueIdentifier, array: KanbanColumn[] | TodoItemType[]) {
    return array.findIndex((col) => col.id === id)
  }

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTask(null)
    setActiveColumn(null)
    const { active, over } = e

    if (active.id === over?.id || !over) return

    if (active.data.current?.type === 'Column') {
      console.log('col')
      setColumns((columns) => {
        const activeItem = getItemPos(active.id, columns)
        const overItem = getItemPos(over.id, columns)
        return arrayMove(columns, activeItem, overItem)
      })
      setActiveColumn(null)
    }
  }

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e

    if (active.id === over?.id || !over) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'
    const isOverColumn = over.data.current?.type === 'Column'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      //   setTasks((tasks) => {
      //     const activeItem = getItemPos(active.id, tasks)
      //     const overItem = getItemPos(over.id, tasks)

      //     tasks[activeItem].colId = tasks[overItem].colId

      //     return arrayMove(tasks, activeItem, overItem)
      //   })
      const activeItem = getItemPos(active.id, tasks)
      const overItem = getItemPos(over.id, tasks)

      tasks[activeItem].colId = tasks[overItem].colId

      const newTasks = arrayMove(tasks, activeItem, overItem)
      loadTodosToCurrentList(newTasks)
    }

    if (isActiveTask && isOverColumn) {
      //   setTasks((tasks) => {
      //     const activeItem = getItemPos(active.id, tasks)

      //     tasks[activeItem].colId = over.id.toString()

      //     return arrayMove(tasks, activeItem, activeItem)
      //   })
      const activeItem = getItemPos(active.id, tasks)

      tasks[activeItem].colId = over.id.toString()

      const newTasks = arrayMove(tasks, activeItem, activeItem)
      loadTodosToCurrentList(newTasks)
    }
  }
  console.log(tasks)
  const onDragStart = (e: DragStartEvent) => {
    const { active } = e

    if (active.data.current?.type === 'Column') {
      setActiveColumn(active.data.current.column)
      return
    }

    if (active.data.current?.type === 'Task') {
      setActiveTask(active.data.current.task)
      return
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd} onDragStart={onDragStart} onDragOver={onDragOver}>
      <SortableContext items={columnsIds} strategy={horizontalListSortingStrategy}>
        <div className='flex justify-start bg-slate-500'>
          {columns.map((col) => (
            <Column key={col.id} column={col} tasks={tasks} />
          ))}
        </div>
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeColumn ? <Column column={activeColumn} tasks={tasks} /> : null}
          {activeTask ? <Task task={activeTask} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { KanbanColumn, KanbanTask, TodoItemType } from '../../utils/models'
import { useMemo } from 'react'
import Task from './Task'

type Props = {
  column: KanbanColumn
  tasks: TodoItemType[]
}

export default function Column(props: Props) {
  const { column, tasks } = props
  const tasksIds = useMemo(() => tasks.map((t) => t.id), [tasks])
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.id, data: { type: 'Column', column } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div style={style} ref={setNodeRef} className=' bg-white border-2 border-red-500 w-96 mx-2'>
        <span>I am placeholder</span>
      </div>
    )
  }

  return (
    <div style={style} ref={setNodeRef} className='bg-white w-96 mx-2 p-3 h-lvh'>
      <h4 className='p-6 bg-slate-800 cursor-move text-white' {...listeners} {...attributes}>
        {column.title}
      </h4>
      <div>
        <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
          {tasks.map((t) => {
            if (t.colId === column.id) {
              return <Task key={t.id} task={t} />
            }
          })}
        </SortableContext>
      </div>
    </div>
  )
}

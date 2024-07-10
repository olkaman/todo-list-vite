import { useSortable } from '@dnd-kit/sortable'
import { KanbanTask } from '../../utils/models'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  task: KanbanTask
}

export default function Task(props: Props) {
  const { task } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id, data: { type: 'Task', task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-white p-3 cursor-move w-full border-2 border-red-500 mb-3'>
        I am dragged
      </div>
    )
  }

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='bg-slate-400 p-3 cursor-move w-full mb-3'>
      {task.title}
    </div>
  )
}

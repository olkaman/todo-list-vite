import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import IconButton from '../../components/IconButton'
import { GripVertical } from 'lucide-react'
import { iconSize, strokeWidth } from '../../utils/settings'

type Props = {
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap
}

export default function DragIcon(props: Props) {
  const { attributes, listeners } = props

  return (
    <div {...attributes} {...listeners} className='mr-3'>
      <IconButton icon={<GripVertical strokeWidth={strokeWidth} size={iconSize} />} customStyles='cursor-move opacity-45 hover:opacity-100' />
    </div>
  )
}

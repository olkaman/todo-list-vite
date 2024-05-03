import { useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import IconButton from '../../components/IconButton'
import { iconSize, strokeWidth } from '../../utils/settings'
import EditTextForm from '../../components/EditTextForm'
import { useNavigate } from 'react-router-dom'
import { removeList, updateListName } from '../../services/lists.service'
import { TodoList } from '../../utils/models'
import useListsStore from '../../stores/listStore'
import clsx from 'clsx'
import { useUserId } from '../../stores/userStore'
import MenuItem from '../../components/MenuItem'
import { toast } from 'sonner'

type Props = {
  list: TodoList
}

export default function List(props: Props) {
  const { list } = props
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [updatedListName, setUpdatedListName] = useState(list.listName)
  const removeCurrentList = useListsStore((state) => state.removeList)
  const currentSelectedList = useListsStore((state) => state.currentSelectedListId)
  const isSelected = currentSelectedList === list.key
  const navigate = useNavigate()
  const userId = useUserId()
  const [isToastOpen, setIsToastOpen] = useState(false)

  const onUpdateListName = () => {
    if (!updatedListName) return

    setIsEdited(false)
    setIsToastOpen(true)
    updateListName(userId, updatedListName, list)
      .then(() => {
        toast.success('Event has been created')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  console.log(isToastOpen)
  const onRemoveList = () => {
    console.log(list)
    removeList(userId, list.listId)
    removeCurrentList(list.key)
    navigate('/home')
    window.location.reload()
  }

  return (
    <>
      <div>
        {!isEdited ? (
          <div className={clsx(isSelected && 'active', 'flex items-center justify-between px-3 hover:bg-accent dark:hover:bg-gray rounded-lg globalTransition w-full mb-1')}>
            <MenuItem listKey={list.key}>{updatedListName}</MenuItem>
            <div className='w-2/7 flex flex-row'>
              <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<Pencil strokeWidth={strokeWidth} size={iconSize} />} />
              <IconButton handleOnClick={onRemoveList} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between p-3 bg-accent dark:bg-gray rounded-lg'>
            <EditTextForm isEdited={isEdited} setIsEdited={setIsEdited} onSubmit={onUpdateListName} name={updatedListName} setName={setUpdatedListName} />
          </div>
        )}
      </div>
    </>
  )
}

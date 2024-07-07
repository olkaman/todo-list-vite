import { useRef, useState } from 'react'
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
import { Modal } from '../../components/Modal'
import { ButtonStyleTypes } from '../../utils/globalTypes'

type Props = {
  list: TodoList
}

export default function List(props: Props) {
  const { list } = props
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [updatedListName, setUpdatedListName] = useState(list.listName)
  const removeCurrentList = useListsStore((state) => state.removeList)
  const lists = useListsStore((state) => state.lists)
  const currentSelectedList = useListsStore((state) => state.currentSelectedListId)
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const isSelected = currentSelectedList === list.key
  const navigate = useNavigate()
  const userId = useUserId()
  const modalRef = useRef<HTMLDialogElement>(null)

  const onUpdateListName = () => {
    setIsEdited(false)
    updateListName(userId, updatedListName, list)
      .then(() => {
        toast.success(`List name was changed to <strong>'${updatedListName}'</strong>`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const onRemoveList = () => {
    removeList(userId, list.listId)
      .then(() => {
        toast.success(`List <strong>'${list.listName}'</strong> was deleted`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
    removeCurrentList(list.key)

    navigate('/home')
    if (lists.length > 0) {
      setCurrentSelectedListId(lists[0].key)
    } else {
      setCurrentSelectedListId('')
    }
  }

  return (
    <>
      <div>
        {!isEdited ? (
          <div
            className={clsx(
              isSelected && 'active',
              'group/listItem flex items-center justify-between px-3 hover:bg-accent dark:hover:bg-darkMode-gray rounded-lg globalTransition w-full mb-1'
            )}
          >
            <MenuItem listKey={list.key}>{updatedListName !== '' ? updatedListName : <i>Enter list name</i>}</MenuItem>
            <div className='w-2/7 flex flex-row'>
              <IconButton
                handleOnClick={() => setIsEdited(!isEdited)}
                icon={<Pencil strokeWidth={strokeWidth} size={iconSize} />}
                customStyles='ml-2 hidden group-hover/listItem:block'
              />
              <IconButton handleOnClick={onOpenModal} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} customStyles='ml-3 hidden group-hover/listItem:block' />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between p-3 bg-accent dark:bg-darkMode-gray rounded-lg'>
            <EditTextForm isEdited={isEdited} setIsEdited={setIsEdited} onSubmit={onUpdateListName} name={updatedListName} setName={setUpdatedListName} />
          </div>
        )}
      </div>
      <Modal
        handleOnCancel={() => modalRef.current?.close()}
        handleOnConfirm={onRemoveList}
        title='Remove list?'
        confirmButtonLabel='Remove'
        ref={modalRef}
        buttonStyleType={ButtonStyleTypes.Primary}
      >
        <p>
          Are you sure you want to remove list named <span className='font-semibold'>{`'${list.listName}'`}</span>?
        </p>
      </Modal>
    </>
  )
}

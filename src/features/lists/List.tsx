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
  const currentSelectedList = useListsStore((state) => state.currentSelectedListId)
  const isSelected = currentSelectedList === list.key
  const navigate = useNavigate()
  const userId = useUserId()
  const modalRef = useRef<HTMLDialogElement>(null)

  const onUpdateListName = () => {
    if (!updatedListName) return

    setIsEdited(false)
    updateListName(userId, updatedListName, list)
      .then(() => {
        toast.success(`List name was updated to ${updatedListName}`)
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
        toast.success(`List ${list.listName} was deleted`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
    removeCurrentList(list.key)

    navigate('/home')
    window.location.reload()
  }

  return (
    <>
      <div>
        {!isEdited ? (
          <div
            className={clsx(
              isSelected && 'active',
              'group/listItem flex items-center justify-between px-3 hover:bg-accent dark:hover:bg-gray rounded-lg globalTransition w-full mb-1'
            )}
          >
            <MenuItem listKey={list.key}>{updatedListName}</MenuItem>
            <div className='w-2/7 flex flex-row'>
              <IconButton
                handleOnClick={() => setIsEdited(!isEdited)}
                icon={<Pencil strokeWidth={strokeWidth} size={iconSize} />}
                customStyles='hidden group-hover/listItem:block'
              />
              <IconButton handleOnClick={onOpenModal} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} customStyles='hidden group-hover/listItem:block' />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between p-3 bg-accent dark:bg-gray rounded-lg'>
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

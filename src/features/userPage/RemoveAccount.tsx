import { deleteUser } from 'firebase/auth'
import { useRef, useState } from 'react'
import { auth } from '../../../firebase'
import Button from '../../components/Button'
import { Modal } from '../../components/Modal'
import { removeList } from '../../services/lists.service'
import { useLists } from '../../stores/listStore'
import { useUserId } from '../../stores/userStore'
import { ButtonStyleTypes } from '../../utils/globalTypes'
import RemoveAccountModalContent from '../auth/RemoveAccountModalContent'
import { toast } from 'sonner'

export default function RemoveAccount() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const user = auth.currentUser
  const userId = useUserId()
  const lists = useLists()

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const onRemoveAccount = () => {
    if (!user || !userId) return

    lists.forEach((list) => {
      removeList(userId, list.listId)
    })

    deleteUser(user)
      .then(() => {
        toast.success('Your account has been removed')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }
  return (
    <>
      <h3 className='h3 my-5'>Remove your account:</h3>
      <Button styleType={ButtonStyleTypes.Secondary} handleOnClick={onOpenModal}>
        Remove account
      </Button>
      <Modal
        handleOnCancel={() => modalRef.current?.close()}
        handleOnConfirm={onRemoveAccount}
        title='Remove account?'
        confirmButtonLabel='Remove my account'
        ref={modalRef}
        disabled={!isConfirmed}
        buttonStyleType={ButtonStyleTypes.Warning}
      >
        <RemoveAccountModalContent isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} />
      </Modal>
    </>
  )
}

import { useRef, useState } from 'react'
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import { Modal } from '../components/Modal'
import { useUserEmail, useUserId } from '../stores/userStore'
import { iconSize, strokeWidth } from '../utils/settings'
import { X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonStyleTypes } from '../utils/globalTypes'
import RemoveAccountModalContent from '../features/auth/RemoveAccountModalContent'
import DarkModeButton from '../components/DarkModeButton'
import { auth } from '../../firebase'
import { deleteUser } from 'firebase/auth'
import { toast } from 'sonner'
import { useLists } from '../stores/listStore'
import { removeList } from '../services/lists.service'

export default function UserPage() {
  const navigate = useNavigate()
  const userEmail = useUserEmail()
  const modalRef = useRef<HTMLDialogElement>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const user = auth.currentUser
  const userId = useUserId()
  const lists = useLists()
  console.log(userId)
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
      .catch((error) => {
        // An error ocurred
        // ...
      })
  }

  return (
    <div className='mx-12 my-8'>
      <div className='flex justify-between items-center relative mb-12'>
        <p>
          Go back to:{' '}
          <Link to='../home' className='link'>
            Home page
          </Link>
        </p>
        <DarkModeButton />
      </div>
      <section className='card p-6 rounded shadow-lg relative'>
        <h2 className='font-semibold mb-2'>User page</h2>
        <IconButton handleOnClick={() => navigate('../home')} icon={<X strokeWidth={strokeWidth} size={iconSize} />} customStyles='absolute top-6 right-6' />
        <p>
          Your account email address: <span className='font-semibold'>{userEmail}</span>
        </p>
        <Button styleType={ButtonStyleTypes.Warning} handleOnClick={onOpenModal} customStyles='mt-12'>
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
      </section>
    </div>
  )
}

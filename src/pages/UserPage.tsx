import IconButton from '../components/IconButton'
import { useUserEmail } from '../stores/userStore'
import { iconSize, strokeWidth } from '../utils/settings'
import { X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'
import useListsStore from '../stores/listStore'
import ChangePassword from '../features/userPage/ChangePassword'
import RemoveAccount from '../features/userPage/RemoveAccount'

export default function UserPage() {
  const navigate = useNavigate()
  const userEmail = useUserEmail()
  const currentSelectedListId = useListsStore((state) => state.currentSelectedListId)

  return (
    <div className='mx-12 my-8'>
      <div className='flex justify-between items-center relative mb-12'>
        <p>
          Go back to:{' '}
          <Link to={`../home/${currentSelectedListId}`} className='link'>
            Home page
          </Link>
        </p>
        <DarkModeButton />
      </div>
      <section className='card p-6 rounded shadow-lg relative'>
        <h2 className='font-semibold mb-2'>User page</h2>
        <IconButton
          handleOnClick={() => navigate(`../home/${currentSelectedListId}`)}
          icon={<X strokeWidth={strokeWidth} size={iconSize} />}
          customStyles='absolute top-6 right-6'
        />
        <p>
          Your account email address: <span className='font-semibold'>{userEmail}</span>
        </p>
        <ChangePassword />
        <RemoveAccount />
      </section>
    </div>
  )
}

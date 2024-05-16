import { useUserEmail } from '../stores/userStore'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'
import useListsStore from '../stores/listStore'
import ChangePassword from '../features/userPage/ChangePassword'
import RemoveAccount from '../features/userPage/RemoveAccount'

export default function UserPage() {
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
      <section className='card p-6 rounded shadow-lg'>
        <h2 className='font-semibold mb-2'>User page</h2>
        <p>
          Your account email address: <span className='font-semibold'>{userEmail}</span>
        </p>
        <ChangePassword />
        <RemoveAccount />
      </section>
    </div>
  )
}

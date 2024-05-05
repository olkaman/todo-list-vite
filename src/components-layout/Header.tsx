import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useUserEmail } from '../stores/userStore'
import { LogOut } from 'lucide-react'
import IconButton from '../components/IconButton'
import { iconSize, strokeWidth } from '../utils/settings'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'

export default function Header() {
  const userEmail = useUserEmail()

  return (
    <header className='p-6 flex flex-row justify-between'>
      <DarkModeButton />
      <div className='flex items-center'>
        <Link to='../user-page'>{userEmail}</Link>
        <IconButton icon={<LogOut strokeWidth={strokeWidth} size={iconSize} />} handleOnClick={() => signOut(auth)} customStyles='boxShadow card p-2 rounded-lg' />
      </div>
    </header>
  )
}

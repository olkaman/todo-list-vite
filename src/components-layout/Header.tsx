import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useUserEmail } from '../stores/userStore'
import { useEffect, useState } from 'react'
import { LogOut, Moon, Sun } from 'lucide-react'
import IconButton from '../components/IconButton'
import { iconSize, strokeWidth } from '../utils/settings'
import { getValueFromLocalStorage, saveToLocalStorage } from '../utils/localStorageActions'
import { Link } from 'react-router-dom'

export default function Header() {
  const userEmail = useUserEmail()
  const [isDarkMode, setIsDarkMode] = useState(() => getValueFromLocalStorage('darkMode') === 'true')

  useEffect(() => {
    const body = document.querySelector('body')
    isDarkMode ? body?.classList.add('dark') : body?.classList.remove('dark')
    saveToLocalStorage('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  return (
    <header className='p-6 flex flex-row justify-between'>
      <IconButton
        icon={isDarkMode ? <Sun strokeWidth={strokeWidth} size={iconSize} /> : <Moon strokeWidth={strokeWidth} size={iconSize} />}
        handleOnClick={() => setIsDarkMode(!isDarkMode)}
        customStyles='boxShadow containerStyles p-2 rounded-lg'
      />

      <div className='flex items-center'>
        <Link to='../user-page'>{userEmail}</Link>
        <IconButton icon={<LogOut strokeWidth={strokeWidth} size={iconSize} />} handleOnClick={() => signOut(auth)} customStyles='boxShadow containerStyles p-2 rounded-lg' />
      </div>
    </header>
  )
}

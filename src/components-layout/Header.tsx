import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useUserEmail } from '../stores/authStore'
import { useEffect, useState } from 'react'
import { LogOut, Moon, Sun } from 'lucide-react'
import IconButton from '../components/IconButton'
import { iconSize, strokeWidth } from '../utils/settings'

export default function Header() {
  const userEmail = useUserEmail()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const value = window.localStorage.getItem('darkMode')
    return value === 'true'
  })

  useEffect(() => {
    const body = document.querySelector('body')
    isDarkMode ? body?.classList.add('dark') : body?.classList.remove('dark')
    window.localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const onSignOut = () => {
    signOut(auth)
  }

  return (
    <header className='p-6 flex flex-row justify-between'>
      <div>
        <IconButton
          icon={isDarkMode ? <Sun strokeWidth={strokeWidth} size={iconSize} /> : <Moon strokeWidth={strokeWidth} size={iconSize} />}
          handleOnClick={() => setIsDarkMode(!isDarkMode)}
          customStyles='boxShadow containerStyles p-2 rounded-lg'
        />
      </div>
      <div className='flex items-center'>
        <div>{userEmail}</div>
        <IconButton icon={<LogOut strokeWidth={strokeWidth} size={iconSize} />} handleOnClick={onSignOut} customStyles='boxShadow containerStyles p-2 rounded-lg' />
      </div>
    </header>
  )
}

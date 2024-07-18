import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useUserEmail } from '../stores/userStore'
import { LogOut } from 'lucide-react'
import IconButton from '../components/IconButton'
import { iconSize, strokeWidth } from '../utils/settings'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import Logo from '../components/Logo'

type Props = {
  hasLogo?: boolean
}

export default function Header(props: Props) {
  const { hasLogo = false } = props

  const userEmail = useUserEmail()
  const [isShadowVisible, setIsShadowVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsShadowVisible(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <header
      className={clsx(
        isShadowVisible && 'shadow-md dark:shadow-lg',
        'bg-lightMode-appBg dark:bg-darkMode-gray sticky top-0 left-0 z-10 p-6 flex flex-row justify-between items-center'
      )}
    >
      <DarkModeButton />
      {hasLogo && <Logo customStyles='w-36' />}
      <div className='flex items-center'>
        <Link to='../user-page' className='link'>
          {userEmail}
        </Link>
        <IconButton icon={<LogOut strokeWidth={strokeWidth} size={iconSize} />} handleOnClick={() => signOut(auth)} customStyles='boxShadow card p-2 rounded-lg ml-6' />
      </div>
    </header>
  )
}

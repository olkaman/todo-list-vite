import React, { useEffect, useState } from 'react'
import IconButton from './IconButton'
import { Moon, Sun } from 'lucide-react'
import useUserStore from '../stores/userStore'
import { getValueFromLocalStorage, saveToLocalStorage } from '../utils/localStorageActions'
import { strokeWidth, iconSize } from '../utils/settings'

export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(() => getValueFromLocalStorage('darkMode') === 'true')
  const setIsDarkModeOn = useUserStore((state) => state.setIsDarkModeOn)

  useEffect(() => {
    const body = document.querySelector('body')
    isDarkMode ? body?.classList.add('dark') : body?.classList.remove('dark')
    saveToLocalStorage('darkMode', isDarkMode.toString())
    setIsDarkModeOn(isDarkMode)
  }, [isDarkMode])

  return (
    <IconButton
      icon={isDarkMode ? <Sun strokeWidth={strokeWidth} size={iconSize} /> : <Moon strokeWidth={strokeWidth} size={iconSize} />}
      handleOnClick={() => setIsDarkMode(!isDarkMode)}
      customStyles='boxShadow card p-2 rounded-lg'
    />
  )
}

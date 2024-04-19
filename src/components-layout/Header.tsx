import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import useAuthStore from '../stores/authStore';
import { useEffect, useState } from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import IconButton from '../components/IconButton';
import { iconSize, strokeWidth } from '../utils/settings';

export default function Header() {
  const userEmail = useAuthStore((state) => state.userEmail);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.toggle('dark');
  }, [isDarkMode]);

  const onSignOut = () => {
    signOut(auth);
  };

  return (
    <header className='p-6 flex flex-row justify-between'>
      <div>
        <IconButton
          icon={isDarkMode ? <Moon strokeWidth={strokeWidth} size={iconSize} /> : <Sun strokeWidth={strokeWidth} size={iconSize} />}
          handleOnClick={() => setIsDarkMode(!isDarkMode)}
          customStyles='boxShadow containerStyles p-2 rounded-lg'
        />
      </div>
      <div className='flex items-center'>
        <div>{userEmail}</div>
        <IconButton icon={<LogOut strokeWidth={strokeWidth} size={iconSize} />} handleOnClick={onSignOut} customStyles='boxShadow containerStyles p-2 rounded-lg' />
      </div>
    </header>
  );
}

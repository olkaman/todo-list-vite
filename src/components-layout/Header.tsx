import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import useAuthStore from '../stores/authStore';

export default function Header() {
  const userEmail = useAuthStore((state) => state.userEmail);

  const onSignOut = () => {
    signOut(auth);
  };
  return (
    <>
      <div>{userEmail}</div>
      <button onClick={onSignOut}>Sign out</button>
    </>
  );
}

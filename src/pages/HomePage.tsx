import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function HomePage() {
  const onSignOut = () => {
    signOut(auth);
  };
  return (
    <>
      <div>HomePage</div>
      <button onClick={onSignOut}>Sign out</button>
    </>
  );
}

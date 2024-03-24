import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

type UserState = { isCurrentUser: boolean | null; isLoading: boolean };

type Props = {
  children: ReactElement;
};

export default function AuthContainer(props: Props) {
  const { children } = props;

  const [userState, setUserState] = useState<UserState>({ isCurrentUser: null, isLoading: true });
  const navigate = useNavigate();
  const setUserEmail = useAuthStore((state) => state.updateUserEmail);
  const setIsCurrentUser = useAuthStore((state) => state.setIsCurrentUser);

  useEffect(() => {
    const subscribeToUserAuthChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate('/home');
        setIsCurrentUser(true);
        setUserState({ isCurrentUser: true, isLoading: false });
        setUserEmail(user.email ?? '');
      } else {
        setIsCurrentUser(false);
        setUserState({ isCurrentUser: null, isLoading: false });
        navigate('../');
      }

      return () => subscribeToUserAuthChange();
    });
  }, []);

  console.log();

  if (userState.isLoading) {
    return <div>Loading ...</div>;
  }

  return <div>{children}</div>;
}

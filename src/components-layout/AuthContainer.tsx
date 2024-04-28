import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

type Props = {
  children: ReactElement;
};

export default function AuthContainer(props: Props) {
  const { children } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const setUserEmail = useAuthStore((state) => state.setUserEmail);
  const setIsCurrentUser = useAuthStore((state) => state.setIsCurrentUser);
  const setUserId = useAuthStore((state) => state.setUserId);

  useEffect(() => {
    const subscribeToUserAuthChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
        setIsCurrentUser(true);
        setIsLoading(false);
        setUserEmail(user.email ?? '');
        setUserId(user.uid);
      } else {
        setIsCurrentUser(false);
        setIsLoading(false);
        navigate('../');
      }

      return () => subscribeToUserAuthChange();
    });
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <div>{children}</div>;
}

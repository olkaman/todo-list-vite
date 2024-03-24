import { FormEventHandler, useState } from 'react';
import AuthForm from './AuthForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <h2>Sign in</h2>
      <AuthForm onSubmit={onSubmit} buttonLabel='Sign in' email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
      <div>{error}</div>
      New user? <Link to='register'>Register</Link>
    </>
  );
}

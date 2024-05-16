import { FormEventHandler, useState } from 'react'
import AuthForm from '../features/auth/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'
import { toast } from 'sonner'
import { getAuthErrors } from '../utils/getAuthErrors'
import { FirebaseError } from 'firebase/app'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('You are in!')
      })
      .catch((error: FirebaseError) => {
        console.log(error.code)
        getAuthErrors(error.code)
      })
      .finally(() => {
        setEmail('')
        setPassword('')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <div className='absolute top-5 right-5'>
        <DarkModeButton />
      </div>
      <section className='card p-12 rounded-md text-center shadow-md max-w-lg'>
        <h2 className='mb-6 font-medium'>Sign in</h2>
        <AuthForm
          onSubmit={onSubmit}
          buttonLabel='Sign in'
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          disabled={email === '' || password === ''}
        />
        <div>
          <Link className='link' to={'/reset-password'}>
            Forgot your password?
          </Link>
        </div>
        <div className='mt-6'>
          New user?{' '}
          <Link to='register' className='link'>
            Register
          </Link>
        </div>
      </section>
    </div>
  )
}

import { FormEventHandler, useState } from 'react'
import AuthForm from '../features/auth/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        if (error.code === 'auth/invalid-credential') {
          setError('Invalid email or password')
        }
      })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <div className='absolute top-5 right-5'>
        <DarkModeButton />
      </div>
      <section className='card p-12 rounded-md text-center shadow-md'>
        <h2 className='mb-6'>Sign in</h2>
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
        <div>{error}</div>
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

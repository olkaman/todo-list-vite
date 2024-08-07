import { FormEventHandler, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import AuthForm from '../features/auth/AuthForm'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'
import { toast } from 'sonner'
import { getAuthErrors } from '../utils/getAuthErrors'
import { FirebaseError } from 'firebase/app'

export default function Register() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (!email || !password) return
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast.success(`Your account for ${user.user.email} was succesfully created!`)
      })
      .catch((error: FirebaseError) => {
        getAuthErrors(error.code)
      })
      .finally(() => {
        setPassword('')
        setEmail('')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <div className='absolute top-5 right-5'>
        <DarkModeButton />
      </div>
      <section className='card p-12 rounded-md text-center shadow-md max-w-lg'>
        <h2 className='mb-6 font-medium'>Register</h2>
        <AuthForm
          onSubmit={onSubmit}
          buttonLabel='Register account'
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          disabled={email === '' || password === ''}
        />
        <div className='mt-6'>
          Already have account?{' '}
          <Link to='/' className='link'>
            Sign in
          </Link>
        </div>
      </section>
    </div>
  )
}

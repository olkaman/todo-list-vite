import { FormEventHandler, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import AuthForm from '../features/auth/AuthForm'
import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'

export default function Register() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  console.log('xczcx')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (!email || !password) return
    e.preventDefault()
    console.log(e)
    console.log('ss')
    setPassword('')
    setEmail('')
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user.user)
      })
      .catch((e) => {
        console.log(e.message, e.code)
        setError(e.message)
        return
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
        <div>{error}</div>
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

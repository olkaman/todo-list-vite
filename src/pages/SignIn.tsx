import { FormEventHandler, useState } from 'react'
import AuthForm from '../features/auth/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'

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
    <>
      <h2>Sign in</h2>
      <AuthForm onSubmit={onSubmit} buttonLabel='Sign in' email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
      <div>
        <Link to={'/reset-password'}>Forgot your password?</Link>
      </div>
      <div>{error}</div>
      New user? <Link to='register'>Register</Link>
    </>
  )
}

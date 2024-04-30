import { FormEventHandler, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import AuthForm from '../features/auth/AuthForm'
import { Link } from 'react-router-dom'

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
    <>
      <h2>Register</h2>
      <AuthForm onSubmit={onSubmit} buttonLabel='Register account' email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
      <div>{error}</div>
      Already have account? <Link to='/'>Sign in</Link>
    </>
  )
}

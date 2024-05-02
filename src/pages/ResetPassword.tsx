import { FormEventHandler, useState } from 'react'
import InputField from '../components/InputField'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link } from 'react-router-dom'
import IconButton from '../components/IconButton'
import { SendHorizontal } from 'lucide-react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')

  const handleResetPassword: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password sent')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }

  return (
    <>
      Enter your email, and then we will send you a link to reset your password
      <form onSubmit={handleResetPassword}>
        <InputField hasCounter={false} inputValue={email} setInputValue={setEmail} customStyles='' />
        <IconButton icon={<SendHorizontal />} />
      </form>
      <Link to={'/'}>Go back to sign in page</Link>
    </>
  )
}
import { FormEventHandler, useState } from 'react'
import InputField from '../components/InputField'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '../components/IconButton'
import { SendHorizontal } from 'lucide-react'
import { iconSize, strokeWidth } from '../utils/settings'
import DarkModeButton from '../components/DarkModeButton'
import { toast } from 'sonner'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleResetPassword: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password has been sent to given email address')
        navigate('/reset-confirmation')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
        toast.error('Password has been sent to given email address')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <div className='absolute top-5 right-5'>
        <DarkModeButton />
      </div>
      <section className='card p-12 rounded-md text-center shadow-md max-w-lg'>
        <h2 className='mb-2 font-medium'>Reset your password</h2>
        <p>Enter registered e-mail address. We will send you a link where you can create a new password for your account</p>
        <form onSubmit={handleResetPassword} className='flex flex-row mt-6 mb-8'>
          <InputField type='email' hasCounter={false} inputValue={email} setInputValue={setEmail} customStyles='w-full' placeholder='Enter e-mail address' />
          <IconButton icon={<SendHorizontal strokeWidth={strokeWidth} size={iconSize} />} />
        </form>
        <aside>
          <Link className='link' to={'/'}>
            Go back to sign in page
          </Link>
        </aside>
      </section>
    </div>
  )
}

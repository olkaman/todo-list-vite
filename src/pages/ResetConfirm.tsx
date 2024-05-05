import { Link } from 'react-router-dom'
import DarkModeButton from '../components/DarkModeButton'

export default function ResetConfirm() {
  return (
    <div className='flex flex-col items-center justify-center h-screen relative'>
      <div className='absolute top-5 right-5'>
        <DarkModeButton />
      </div>
      <section className='card p-12 rounded-md text-center shadow-md max-w-lg'>
        <h2 className='mb-2 font-medium'>Confirmation</h2>
        <p className='mb-6'>Email has been sent, please check your mailbox</p>
        <Link className='link' to={'/'}>
          Go back to sign in page
        </Link>
      </section>
    </div>
  )
}

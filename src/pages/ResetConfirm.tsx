import { Link } from 'react-router-dom'

export default function ResetConfirm() {
  return (
    <>
      <div>Email has been sent, please check your mailbox</div>
      <Link to={'/'}>Go back to sign in page</Link>
    </>
  )
}

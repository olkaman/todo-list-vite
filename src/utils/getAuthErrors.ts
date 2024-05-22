import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { toast } from 'sonner'

export const getAuthErrors = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/requires-recent-login':
      signOut(auth)
      return toast.error(`You have been logged out. Due to security reasons, please sign in again and then change your password`, {
        duration: 9000,
      })

    case 'auth/weak-password':
      return toast.error(`Password should be at least 6 characters long`, {
        duration: 3000,
      })

    case 'auth/invalid-credential':
      return toast.error(`Invalid email or password`, {
        duration: 2000,
      })

    case 'auth/email-already-in-use':
      return toast.error(`We have found an account registered to that email`, {
        duration: 3000,
      })

    default:
      break
  }
}

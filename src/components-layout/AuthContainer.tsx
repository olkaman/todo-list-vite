import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import useListsStore from '../stores/listStore'

type Props = {
  children: ReactElement
}

export default function AuthContainer(props: Props) {
  const { children } = props

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const setUserEmail = useUserStore((state) => state.setUserEmail)
  const setIsCurrentUser = useUserStore((state) => state.setIsCurrentUser)
  const setUserId = useUserStore((state) => state.setUserId)
  const currentSelectedList = useListsStore((state) => state.currentSelectedListId)
  const reset = useListsStore((state) => state.reset)

  useEffect(() => {
    const subscribeToUserAuthChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/home/${currentSelectedList}`)
        setIsCurrentUser(true)
        setIsLoading(false)
        setUserEmail(user.email ?? '')
        setUserId(user.uid)
      } else {
        setIsCurrentUser(false)
        setIsLoading(false)
        navigate('../')
        reset()
      }

      return () => subscribeToUserAuthChange()
    })
  }, [currentSelectedList])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return <div>{children}</div>
}

import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: ReactElement
  user: boolean | null
}

export default function ProtectedRoute(props: Props) {
  const navigate = useNavigate()
  const { children, user } = props

  if (user) {
    return children
  } else {
    navigate('/')
  }
}

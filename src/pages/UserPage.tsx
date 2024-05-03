import IconButton from '../components/IconButton'
import { iconSize, strokeWidth } from '../utils/settings'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {
  const navigate = useNavigate()
  return (
    <div>
      UserPage <IconButton handleOnClick={() => navigate('../home')} icon={<X strokeWidth={strokeWidth} size={iconSize} />} />
    </div>
  )
}

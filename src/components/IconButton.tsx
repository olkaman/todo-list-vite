import { ReactNode } from 'react'

type Props = {
  handleOnClick?: () => void
  icon: ReactNode
  customStyles?: string
  type?: 'button' | 'submit'
}

function IconButton(props: Props) {
  const { handleOnClick, icon, customStyles, type } = props
  return (
    <button type={type} onClick={handleOnClick} className={`${customStyles} iconButton globalTransition`}>
      {icon}
    </button>
  )
}
export default IconButton

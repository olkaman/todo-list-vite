import { ReactElement } from 'react'

type Props = {
  handleOnClick?: () => void
  icon: ReactElement
  customStyles?: string
}

function IconButton(props: Props) {
  const { handleOnClick, icon, customStyles } = props
  return (
    <button onClick={handleOnClick} className={`${customStyles} iconButton globalTransition`}>
      {icon}
    </button>
  )
}
export default IconButton

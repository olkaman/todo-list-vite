import clsx from 'clsx'
import { ButtonStyleTypes } from '../utils/globalTypes'

type Props = {
  handleOnClick?: () => void
  children: string
  customStyles?: string
  disabled?: boolean
  styleType: ButtonStyleTypes
}

export default function Button(props: Props) {
  const { handleOnClick, children, customStyles, disabled, styleType } = props

  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={clsx(
        styleType === ButtonStyleTypes.Primary && 'bg-accent text-lightMode-text',
        styleType === ButtonStyleTypes.Secondary && 'bg-none border border-gray-200 dark:border-gray-100/20 text-darkMode-gray hover:text-darkMode-gray hover:bg-accent',
        styleType === ButtonStyleTypes.Warning && 'bg-warning text-lightMode-white  dark:text-lightMode-white  hover:bg-warning-dark',
        `${customStyles} globalTransition button`
      )}
    >
      {children}
    </button>
  )
}

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
        styleType === ButtonStyleTypes.Secondary && 'bg-none text-darkMode-gray hover:text-lightMode-white dark:hover:text-darkMode-gray',
        styleType === ButtonStyleTypes.Warning && 'bg-warning text-lightMode-white  dark:text-lightMode-white  hover:bg-warning-dark',
        `${customStyles} globalTransition py-3 px-6 hover:bg-accentDark dark:text-darkMode-gray text-xs font-medium rounded uppercase disabled:bg-darkMode-grayLight disabled:opacity-60 disabled:cursor-not-allowed`
      )}
    >
      {children}
    </button>
  )
}

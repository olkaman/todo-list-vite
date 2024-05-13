import clsx from 'clsx'
import { Check } from 'lucide-react'
import { iconSize, strokeWidth } from '../../utils/settings'

type Props = {
  checked: boolean
  handleOnCheck: () => void
  disabled: boolean
}

function CustomCheckbox(props: Props) {
  const { checked, handleOnCheck, disabled } = props

  return (
    <button
      onClick={handleOnCheck}
      disabled={disabled}
      className={clsx(
        checked && 'bg-accent border-1 dark:border-2 dark:border-accent',
        disabled && 'opacity-50 cursor-not-allowed',
        'border border-darkMode-gray dark:border-darkMode-grayLight rounded-full p-3.5 mr-4 globalTransition relative'
      )}
    >
      {checked ? <Check strokeWidth={strokeWidth} size={iconSize} className='text-darkMode-grayDark ml-1 absolute top-1 left-0' /> : null}
    </button>
  )
}

export default CustomCheckbox

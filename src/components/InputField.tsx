import { FormEvent, ReactNode } from 'react'
import IconButton from './IconButton'

type Props = {
  hasCounter?: boolean
  inputValue: string
  setInputValue: (inputValue: string) => void
  placeholder?: string
  customStyles?: string
  id?: string
  type: string
  counterMax?: number | undefined
  hasActionIcon?: boolean
  actionIcon?: ReactNode
  handleOnClickActionIcon?: () => void
}

export default function InputField(props: Props) {
  const { hasCounter = false, inputValue, setInputValue, placeholder, customStyles, id, type, counterMax, hasActionIcon = false, actionIcon, handleOnClickActionIcon } = props
  const currentNoOfChar = inputValue.length

  const handleOnEditTask = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <div className='relative w-full'>
      <input
        className={`${customStyles} pr-9 formField w-full`}
        value={inputValue}
        onChange={handleOnEditTask}
        placeholder={placeholder}
        maxLength={counterMax}
        id={id}
        type={type}
      />
      {hasCounter && <div className='absolute right-0 -bottom-5 text-xs text-darkMode-grayLight'>{`${currentNoOfChar} / ${counterMax}`}</div>}
      {hasActionIcon && <IconButton type='button' handleOnClick={handleOnClickActionIcon} icon={actionIcon} customStyles='p-2 absolute top-[5px] right-0.5' />}
    </div>
  )
}

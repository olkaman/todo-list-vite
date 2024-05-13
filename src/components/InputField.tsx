import { FormEvent } from 'react'

type Props = {
  hasCounter?: boolean
  inputValue: string
  setInputValue: (inputValue: string) => void
  placeholder?: string
  customStyles?: string
  id?: string
  type: string
  counterMax?: number | undefined
}

export default function InputField(props: Props) {
  const { hasCounter = false, inputValue, setInputValue, placeholder, customStyles, id, type, counterMax } = props
  const currentNoOfChar = inputValue.length

  const handleOnEditTask = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <>
      <input
        className={`${customStyles} border rounded p-3.5 pr-9 border-gray-200 dark:border-gray-100/20 dark:bg-gray-dark focus:outline-none focus:ring-accent focus:ring-1`}
        value={inputValue}
        onChange={handleOnEditTask}
        placeholder={placeholder}
        maxLength={counterMax}
        id={id}
        type={type}
      />
      {hasCounter && <div className='absolute right-0 -bottom-5 text-xs text-darkMode-grayLight'>{`${currentNoOfChar} / ${counterMax}`}</div>}
    </>
  )
}

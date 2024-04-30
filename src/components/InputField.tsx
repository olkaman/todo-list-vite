import { FormEvent } from 'react'

type Props = {
  hasCounter: boolean
  inputValue: string
  setInputValue: (inputValue: string) => void
  placeholder?: string
  customStyles: string
}

export default function InputField(props: Props) {
  const { hasCounter, inputValue, setInputValue, placeholder, customStyles } = props
  const currentNoOfChar = inputValue.length
  const maxNoOfChar = 200

  const handleOnEditTask = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <>
      <input
        className={`${customStyles} border rounded p-2 border-gray-light dark:bg-gray-dark focus:outline-none focus:ring-accent focus:ring-1`}
        value={inputValue}
        onChange={handleOnEditTask}
        placeholder={placeholder}
        maxLength={maxNoOfChar}
        rows={1}
      />
      {hasCounter && <div>{`${currentNoOfChar} / ${maxNoOfChar}`}</div>}
    </>
  )
}

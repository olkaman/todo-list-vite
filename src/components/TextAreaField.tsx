import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react'
import { maxNoOfChar } from '../utils/settings'
import clsx from 'clsx'

type Props = {
  placeholder: string
  setInputValue: Dispatch<SetStateAction<string>>
  inputValue: string
  className: string
}

export default function TextAreaField(props: Props) {
  const { inputValue, setInputValue, placeholder, className } = props
  const currentNoOfChar = inputValue.length
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTextArea()
  })

  const setTextArea = () => {
    const node = ref.current

    if (node && ref.current.classList.contains(className)) {
      const height = ref.current.scrollHeight
      ref.current.style.height = height + 'px'
      ref.current.style.overflow = 'hidden'
    }
  }

  const handleOnEditTask = (e: FormEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
    setTextArea()
  }

  return (
    <div className='relative w-full'>
      <textarea
        ref={ref}
        value={inputValue}
        onChange={handleOnEditTask}
        placeholder={placeholder}
        maxLength={maxNoOfChar}
        rows={1}
        className={clsx(className, 'w-full formField')}
      />
      <div className='absolute right-0 text-xs text-darkMode-grayLight'>{`${currentNoOfChar} / ${maxNoOfChar}`}</div>
    </div>
  )
}

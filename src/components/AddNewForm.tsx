import { CircleX } from 'lucide-react'
import { iconSize, strokeWidth } from '../utils/settings'
import InputField from './InputField'
import { SyntheticEvent } from 'react'

type Props = {
  onSubmit: (event: SyntheticEvent) => void
  inputValue: string
  setInputValue: (listName: string) => void
  placeholder?: string
  counterMax: number
}

export default function AddNewForm(props: Props) {
  const { inputValue, setInputValue, onSubmit, placeholder, counterMax } = props

  const clearField = () => {
    setInputValue('')
  }

  return (
    <section className='relative'>
      <form onSubmit={onSubmit} className='mt-2 mb-4 flex items-center justify-between'>
        <InputField
          type='text'
          hasCounter
          counterMax={counterMax}
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={placeholder}
          customStyles='w-full'
          hasActionIcon={inputValue !== ''}
          actionIcon={<CircleX strokeWidth={strokeWidth} size={iconSize} />}
          handleOnClickActionIcon={clearField}
        />
      </form>
    </section>
  )
}

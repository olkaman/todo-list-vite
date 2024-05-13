import IconButton from './IconButton'
import { CircleX } from 'lucide-react'
import { iconSize, strokeWidth } from '../utils/settings'
import InputField from './InputField'
import { SyntheticEvent } from 'react'

type Props = {
  onSubmit: (event: SyntheticEvent) => void
  inputValue: string
  setInputValue: (listName: string) => void
  placeholder?: string
}

export default function AddNewForm(props: Props) {
  const { inputValue, setInputValue, onSubmit, placeholder } = props

  const clearField = () => {
    setInputValue('')
  }

  return (
    <section className='relative'>
      <form onSubmit={onSubmit} className='mt-2 mb-4 flex items-center justify-between'>
        <InputField type='text' hasCounter={false} inputValue={inputValue} setInputValue={setInputValue} placeholder={placeholder} customStyles='w-full' />
      </form>
      {inputValue !== '' && <IconButton handleOnClick={clearField} icon={<CircleX strokeWidth={strokeWidth} size={iconSize} />} customStyles='p-2 absolute top-[5px] right-0.5' />}
    </section>
  )
}

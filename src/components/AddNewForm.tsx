import IconButton from './IconButton'
import { CirclePlus } from 'lucide-react'
import { iconSize, strokeWidth } from '../utils/settings'
import InputField from './InputField'
import { SyntheticEvent } from 'react'

type Props = {
  onSubmit: (event: SyntheticEvent) => void
  inputValue: string
  setInputValue: (listName: string) => void
}

export default function AddNewForm(props: Props) {
  const { inputValue, setInputValue, onSubmit } = props

  return (
    <form onSubmit={onSubmit} className='mt-2 mb-4 flex items-center justify-between'>
      <InputField type='text' hasCounter={false} inputValue={inputValue} setInputValue={setInputValue} placeholder={'Enter new list name'} customStyles='w-full' />
      <IconButton icon={<CirclePlus strokeWidth={strokeWidth} size={iconSize} />} customStyles='p-2' />
    </form>
  )
}

import { Check, X } from 'lucide-react'
import InputField from './InputField'
import IconButton from './IconButton'
import { iconSize, strokeWidth } from '../utils/settings'
import { SyntheticEvent } from 'react'

type Props = {
  isEdited: boolean
  setIsEdited: (isEdited: boolean) => void
  onSubmit: (event: SyntheticEvent) => void
  name: string
  setName: (listName: string) => void
}

export default function EditTextForm(props: Props) {
  const { isEdited, setIsEdited, onSubmit, name, setName } = props

  return (
    <form onSubmit={onSubmit} className='flex flex-row justify-between w-full'>
      <InputField type='text' hasCounter={false} inputValue={name} setInputValue={setName} customStyles='flex-auto w-5/7' />
      <div className='flex flex-row justify-end flex-auto w-2/7'>
        <IconButton icon={<Check strokeWidth={strokeWidth} size={iconSize} />} customStyles='mr-2' />
        <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<X strokeWidth={strokeWidth} size={iconSize} />} />
      </div>
    </form>
  )
}

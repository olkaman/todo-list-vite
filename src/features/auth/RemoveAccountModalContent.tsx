import { Dispatch, SetStateAction } from 'react'

type Props = {
  isConfirmed: boolean
  setIsConfirmed: Dispatch<SetStateAction<boolean>>
}

export default function RemoveAccountModalContent(props: Props) {
  const { isConfirmed, setIsConfirmed } = props

  return (
    <p>
      Are you sure you want to remove your account? All your lists and todos will be lost and account cannot be restored. If yes, please check for the approval:
      <div className='flex items-center mt-3'>
        <input checked={isConfirmed} id='removeAccount' type='checkbox' onChange={() => setIsConfirmed(!isConfirmed)} />
        <label htmlFor='removeAccount' className='ml-2 text-red-600'>
          Yes, I want to remove my account
        </label>
      </div>
    </p>
  )
}

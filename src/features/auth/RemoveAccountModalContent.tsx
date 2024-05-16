import { Dispatch, SetStateAction } from 'react'

type Props = {
  isConfirmed: boolean
  setIsConfirmed: Dispatch<SetStateAction<boolean>>
}

export default function RemoveAccountModalContent(props: Props) {
  const { isConfirmed, setIsConfirmed } = props

  return (
    <>
      Are you sure you want to remove your account? All your lists and tasks will be lost and account cannot be restored. If yes, please check for the approval:
      <div className='flex items-center mt-3'>
        <input checked={isConfirmed} id='removeAccount' type='checkbox' onChange={() => setIsConfirmed(!isConfirmed)} />
        <label htmlFor='removeAccount' className='ml-2 text-warning'>
          Yes, I want to remove my account
        </label>
      </div>
    </>
  )
}

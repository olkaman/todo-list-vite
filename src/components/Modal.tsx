import { ButtonStyleTypes } from '../utils/globalTypes'
import Button from './Button'
import { ReactNode, forwardRef } from 'react'

type Props = {
  handleOnCancel: () => void
  handleOnConfirm: () => void
  children: ReactNode
  title: string
  confirmButtonLabel?: string
  cancelButtonLabel?: string
  disabled?: boolean
  buttonStyleType: ButtonStyleTypes
  hasPrimaryButton?: boolean
}

export const Modal = forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const { handleOnCancel, handleOnConfirm, children, title, confirmButtonLabel, disabled, buttonStyleType, hasPrimaryButton = true, cancelButtonLabel = 'Cancel' } = props

  return (
    <dialog ref={ref} className='bg-black-300 p-6 rounded-lg w-[450px] backdrop:bg-black/60'>
      <h3 className='mb-2 font-semibold'>{title}</h3>
      <span className='mb-8'>{children}</span>
      <div className='flex justify-end'>
        <Button styleType={ButtonStyleTypes.Secondary} handleOnClick={handleOnCancel} customStyles='mr-2'>
          {cancelButtonLabel}
        </Button>
        {hasPrimaryButton && (
          <Button styleType={buttonStyleType} handleOnClick={handleOnConfirm} disabled={disabled}>
            {confirmButtonLabel || ''}
          </Button>
        )}
      </div>
    </dialog>
  )
})

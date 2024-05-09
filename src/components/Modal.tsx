import Button from './Button'
import { ReactNode, forwardRef } from 'react'

type Props = {
  handleOnCancel: () => void
  handleOnConfirm: () => void
  children: ReactNode
  title: string
  confirmButtonLabel: string
}

export const Modal = forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const { handleOnCancel, handleOnConfirm, children, title, confirmButtonLabel } = props

  return (
    <dialog ref={ref} className='bg-black-300 p-6 rounded-lg w-[450px] backdrop:bg-black/60'>
      <h3 className='mb-2 font-semibold'>{title}</h3>
      <p className='mb-8'>{children}</p>
      <div className='flex justify-end'>
        <Button styleType='secondary' handleOnClick={handleOnCancel} customStyles='mr-2'>
          cancel
        </Button>
        <Button styleType='primary' handleOnClick={handleOnConfirm}>
          {confirmButtonLabel}
        </Button>
      </div>
    </dialog>
  )
})

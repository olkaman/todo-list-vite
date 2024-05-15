import { useRef, useState } from 'react'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { ButtonStyleTypes } from '../../utils/globalTypes'
import { getAuth, updatePassword } from 'firebase/auth'
import { toast } from 'sonner'
import { Modal } from '../../components/Modal'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const auth = getAuth()
  const user = auth.currentUser
  const modalRef = useRef<HTMLDialogElement>(null)

  const resetPassword = () => {
    if (!user) return

    updatePassword(user, newPassword)
      .then(() => {
        toast.success(`Yor password was updated`)
        setNewPassword('')
        setRepeatedPassword('')
      })
      .catch(() => {
        toast.error(`Something went wrong`)
      })
  }

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  return (
    <>
      <section className='border-t border-b py-5 border-t-gray-200 dark:border-t-gray-100/20 mt-6'>
        <h4 className='h3 mb-3'>Change your password:</h4>
        <div className='flex flex-col mb-3 max-w-96'>
          <label htmlFor='password1' className='label'>
            New password
          </label>
          <InputField inputValue={newPassword} setInputValue={setNewPassword} type='password' id='password1' placeholder='Enter password' />
        </div>
        <div className='flex flex-col mb-6 max-w-96'>
          <label htmlFor='password2' className='label'>
            Repeat password
          </label>
          <InputField inputValue={repeatedPassword} setInputValue={setRepeatedPassword} type='password' id='password2' placeholder='Enter password again' />
        </div>
        <Button styleType={ButtonStyleTypes.Primary} handleOnClick={newPassword === repeatedPassword && newPassword !== '' ? resetPassword : onOpenModal}>
          Reset password
        </Button>
      </section>
      <Modal
        handleOnCancel={() => modalRef.current?.close()}
        handleOnConfirm={resetPassword}
        title='Not valid passwords'
        ref={modalRef}
        buttonStyleType={ButtonStyleTypes.Warning}
        hasPrimaryButton={false}
        cancelButtonLabel='OK'
      >
        Entered passwords are not equal or are not provided. Please enter proper passwords and try again
      </Modal>
    </>
  )
}

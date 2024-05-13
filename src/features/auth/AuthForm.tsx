import { FormEventHandler } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { ButtonStyleTypes } from '../../utils/globalTypes'

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>
  buttonLabel: string
  email: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  disabled: boolean
}

export default function AuthForm(props: Props) {
  const { onSubmit, buttonLabel, email, password, setEmail, setPassword, disabled } = props

  return (
    <form onSubmit={onSubmit} className='flex flex-col text-left   min-w-96'>
      <label htmlFor='email' className='text-xs dark:text-darkMode-placeholder'>
        *Email
      </label>
      <InputField type='email' hasCounter={false} inputValue={email} setInputValue={setEmail} id='email' customStyles='mb-4' placeholder='E-mail address' />

      <label htmlFor='password' className='text-xs dark:text-darkMode-placeholder'>
        *Password
      </label>
      <InputField type='password' hasCounter={false} inputValue={password} setInputValue={setPassword} id='password' customStyles='mb-8' placeholder='Password' />

      <Button customStyles='mb-3' disabled={disabled} styleType={ButtonStyleTypes.Primary}>
        {buttonLabel}
      </Button>
    </form>
  )
}

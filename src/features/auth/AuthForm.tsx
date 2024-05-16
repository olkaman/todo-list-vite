import { FormEventHandler, useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { ButtonStyleTypes } from '../../utils/globalTypes'
import { Eye, EyeOff } from 'lucide-react'
import { iconSize, strokeWidth } from '../../utils/settings'

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <form onSubmit={onSubmit} className='flex flex-col text-left min-w-96'>
      <label htmlFor='email' className='label'>
        *Email
      </label>
      <InputField type='email' hasCounter={false} inputValue={email} setInputValue={setEmail} id='email' customStyles='mb-4' placeholder='E-mail address' />

      <label htmlFor='password' className='label'>
        *Password
      </label>
      <InputField
        type={isPasswordVisible ? 'text' : 'password'}
        hasCounter={false}
        inputValue={password}
        setInputValue={setPassword}
        id='password'
        customStyles='mb-8'
        placeholder='Password'
        hasActionIcon
        actionIcon={isPasswordVisible ? <EyeOff strokeWidth={strokeWidth} size={iconSize} /> : <Eye strokeWidth={strokeWidth} size={iconSize} />}
        handleOnClickActionIcon={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      <Button customStyles='mb-3' disabled={disabled} styleType={ButtonStyleTypes.Primary}>
        {buttonLabel}
      </Button>
    </form>
  )
}

import { FormEventHandler } from 'react'
import InputField from '../../components/InputField'

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>
  buttonLabel: string
  email: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
}

export default function AuthForm(props: Props) {
  const { onSubmit, buttonLabel, email, password, setEmail, setPassword } = props

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='email'>Email</label>
      <InputField type='email' hasCounter={false} inputValue={email} setInputValue={setEmail} id='email' />

      <label htmlFor='password'>Password</label>
      <InputField type='password' hasCounter={false} inputValue={password} setInputValue={setPassword} id='password' />

      <button type='submit'>{buttonLabel}</button>
    </form>
  )
}

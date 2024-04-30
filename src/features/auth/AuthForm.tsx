import { FormEvent, FormEventHandler } from 'react'

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
      <input id='email' type='email' value={email} onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />

      <label htmlFor='password'>Password</label>
      <input id='password' type='password' value={password} onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />

      <button type='submit'>{buttonLabel}</button>
    </form>
  )
}

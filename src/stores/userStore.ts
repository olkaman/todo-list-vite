import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../utils/models'

type UserStoreType = State | Partial<State> | ((state: State) => State | Partial<State>)

type State = {
  user: User

  isCurrentUser: boolean
}

type Action = {
  setIsCurrentUser: (isCurrentUser: boolean) => void
  setUserId: (id: string) => void
  setUserEmail: (email: string) => void
  reset: () => void
}

const initialState = {
  user: { email: '', id: '' },
  isCurrentUser: false,
}

const useUserStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialState,
    setIsCurrentUser: (isCurrentUser) => set(() => ({ isCurrentUser }), false, 'Set is current user'),
    setUserId: (id) => set(setUserId(id), false, 'Set user id'),
    setUserEmail: (email) => set(setUserEmail(email), false, 'Set user email'),
    reset: () => {
      set(initialState)
    },
  }))
)

export const useUserEmail = () => useUserStore((state) => state.user.email)
export const useUserId = () => useUserStore((state) => state.user.id)

function setUserEmail(email: string): UserStoreType {
  return (state) => {
    const user = { ...state.user, email }
    return { ...state, user }
  }
}

function setUserId(id: string): UserStoreType {
  return (state) => {
    const user = { ...state.user, id }
    return { ...state, user }
  }
}

export default useUserStore

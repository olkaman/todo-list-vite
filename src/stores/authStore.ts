import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  userEmail: string;
  isCurrentUser: boolean;
};

type Action = {
  updateUserEmail: (email: string) => void;
  setIsCurrentUser: (isCurrentUser: boolean) => void;
  reset: () => void;
};

const initialState = {
  userEmail: '',
  isCurrentUser: false,
};

const useAuthStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialState,
    updateUserEmail: (email) => set(() => ({ userEmail: email }), false, 'Update user email'),
    setIsCurrentUser: (isCurrentUser) => set(() => ({ isCurrentUser }), false, 'Set is current user'),
    reset: () => {
      set(initialState);
    },
  }))
);

export default useAuthStore;

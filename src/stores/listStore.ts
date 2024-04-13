import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TodoList } from '../utils/models';

type State = {
  lists: TodoList[];
};

type Action = {
  setLists: (lists: TodoList[]) => void;
  reset: () => void;
};

const initialState = {
  lists: [
    {
      key: Math.floor(Math.random() * 10000),
      listName: '',
      todoList: [],
      listId: '',
    },
  ],
};

const useListsStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialState,
    setLists: (lists) => set(() => ({ lists }), false, 'Set lists'),
    reset: () => {
      set(initialState);
    },
  }))
);

export const useLists = () => useListsStore((state) => state.lists);

export const useListById = (listKey: number) =>
  useListsStore((state) => {
    const list = state.lists.find((list) => list.key === listKey);
    return list;
  });

export default useListsStore;

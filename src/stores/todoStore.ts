import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TodoItemType } from '../utils/models';

type State = {
  todos: TodoItemType[];
};

type Action = {
  setTodos: (todos: TodoItemType[]) => void;
  reset: () => void;
};

const initialState = {
  todos: [],
};

const useTodosStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialState,
    setTodos: (todos) => set(() => ({ todos }), false, 'Set todos'),
    reset: () => {
      set(initialState);
    },
  }))
);

export const useTodos = () => useTodosStore((state) => state.todos);

export const useTodoById = (todoKey: number) =>
  useTodosStore((state) => {
    const list = state.todos.find((todo) => todo.key === todoKey);
    return list;
  });

export default useTodosStore;

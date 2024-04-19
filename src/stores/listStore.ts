import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TodoItemType, TodoList } from '../utils/models';

type ListStoreType = State | Partial<State> | ((state: State) => State | Partial<State>);

type State = {
  lists: TodoList[];
  currentSelectedListId: string;
  currentListTodos: TodoItemType[];
};

type Action = {
  setLists: (lists: TodoList[]) => void;
  addList: (listKey: TodoList) => void;
  removeList: (list: string) => void;
  setCurrentSelectedListId: (listId: string) => void;
  addTodosToCurrentList: (todo: TodoItemType) => void;
  loadTodosToCurrentList: (todos: TodoItemType[]) => void;
  updateTodoItemInCurrentList: (todo: TodoItemType) => void;
  reset: () => void;
};

const initialState = {
  lists: [],
  currentSelectedListId: '',
  currentListTodos: [],
};

const useListsStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialState,
    setLists: (lists) => set(() => ({ lists }), false, 'Set lists'),
    addList: (list) => set(addList(list), false, 'Add list'),
    removeList: (listKey) => set(removeList(listKey), false, 'Add list'),
    setCurrentSelectedListId: (listId) => set(setCurrentSelectedListId(listId), false, 'Add list'),
    addTodosToCurrentList: (todo) => set(addTodosToCurrentList(todo), false, 'Add todo'),
    loadTodosToCurrentList: (todos) => set(loadTodosToCurrentList(todos), false, 'Load todos to current list'),
    updateTodoItemInCurrentList: (todoId) => set(updateTodoItemInCurrentList(todoId), false, 'Update todo in current list'),
    reset: () => {
      set(initialState);
    },
  }))
);

export const useLists = () => useListsStore((state) => state.lists);

export const useListById = (listKey: string) =>
  useListsStore((state) => {
    const list = state.lists.find((list) => list.listId === listKey);
    return list;
  });

export const useCurrentListTodos = () => useListsStore((state) => state.currentListTodos);

// function setLists(lists: TodoList[]): ListStoreType {
//   return (state) => ({ ...state, lists });
// }

function setCurrentSelectedListId(listId: string): ListStoreType {
  return (state) => {
    console.log('wwww', listId);
    return { ...state, currentSelectedListId: listId };
  };
}

function addList(list: TodoList): ListStoreType {
  return (state) => {
    return { ...state, lists: [...state.lists, list] };
  };
}

function removeList(listKey: string): ListStoreType {
  return (state) => {
    const lists = state.lists.filter((list) => list.key !== listKey);

    return { ...state, lists };
  };
}

function addTodosToCurrentList(todo: TodoItemType): ListStoreType {
  return (state) => {
    return { ...state, currentListTodos: [...state.currentListTodos, todo] };
  };
}

function loadTodosToCurrentList(todos: TodoItemType[]): ListStoreType {
  return (state) => ({ ...state, currentListTodos: todos });
}

function updateTodoItemInCurrentList(newTodo: TodoItemType): ListStoreType {
  return (state) => {
    const currentListTodos = state.currentListTodos.map((todo) => {
      if (newTodo.key === todo.key) {
        return newTodo;
      }
      return todo;
    });

    return { ...state, currentListTodos };
  };
}

export default useListsStore;

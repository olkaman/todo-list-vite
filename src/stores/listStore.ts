import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TodoItemType, TodoList } from '../utils/models'

type ListStoreType = State | Partial<State> | ((state: State) => State | Partial<State>)

type State = {
  lists: TodoList[]
  currentSelectedListId: string
  currentListTodos: TodoItemType[]
}

type Action = {
  setLists: (lists: TodoList[]) => void
  addList: (listKey: TodoList) => void
  removeList: (list: string) => void
  setCurrentSelectedListId: (listId: string) => void
  addTodosToCurrentList: (todo: TodoItemType) => void
  loadTodosToCurrentList: (todos: TodoItemType[]) => void
  updateTodoItemInCurrentList: (todo: TodoItemType) => void
  removeTodosFromCurrentList: (todoKey: string) => void
  reset: () => void
}

const initialState = {
  lists: [],
  currentSelectedListId: '',
  currentListTodos: [],
}

const useListsStore = create<State & Action, [['zustand/devtools', never]]>(
  devtools(
    (set) => ({
      ...initialState,
      setLists: (lists) => set(() => ({ lists }), false, 'Set lists'),
      addList: (list) => set(addList(list), false, 'Add list'),
      removeList: (listKey) => set(removeList(listKey), false, 'Remove list'),
      setCurrentSelectedListId: (listId) => set(setCurrentSelectedListId(listId), false, 'Set current selected list id'),
      addTodosToCurrentList: (todo) => set(addTodosToCurrentList(todo), false, 'Add todos to current list'),
      loadTodosToCurrentList: (todos) => set(loadTodosToCurrentList(todos), false, 'Load todos to current list'),
      updateTodoItemInCurrentList: (todo) => set(updateTodoItemInCurrentList(todo), false, 'Update todo in current list'),
      removeTodosFromCurrentList: (todoKey) => set(removeTodosFromCurrentList(todoKey), false, 'Remove todo in current list'),
      reset: () => {
        set(initialState)
      },
    }),
    { name: 'list store' }
  )
)

export const useLists = () => useListsStore((state) => state.lists)

export const useListByKey = (listKey: string) =>
  useListsStore((state) => {
    const list = state.lists.find((list) => list.key === listKey)

    if (!list) {
      throw new Error(`The list with key ${listKey} was not found`)
    }

    return list
  })

export const useListIdByKey = (listKey: string) =>
  useListsStore((state) => {
    const list = state.lists.find((list) => list.key === listKey)

    if (!list) {
      throw new Error(`The list with key ${listKey} was not found`)
    }

    return list.listId
  })

export const useCurrentListTodos = () => useListsStore((state) => state.currentListTodos)

// function setLists(lists: TodoList[]): ListStoreType {
//   return (state) => ({ ...state, lists });
// }

function setCurrentSelectedListId(listId: string): ListStoreType {
  return (state) => {
    return { ...state, currentSelectedListId: listId }
  }
}

function addList(list: TodoList): ListStoreType {
  return (state) => {
    return { ...state, lists: [...state.lists, list] }
  }
}

function removeList(listKey: string): ListStoreType {
  return (state) => {
    const lists = state.lists.filter((list) => list.key !== listKey)

    return { ...state, lists }
  }
}

function addTodosToCurrentList(todo: TodoItemType): ListStoreType {
  return (state) => {
    return { ...state, currentListTodos: [...state.currentListTodos, todo] }
  }
}

function loadTodosToCurrentList(todos: TodoItemType[]): ListStoreType {
  return (state) => ({ ...state, currentListTodos: todos })
}

function updateTodoItemInCurrentList(newTodo: TodoItemType): ListStoreType {
  return (state) => {
    const currentListTodos = state.currentListTodos.map((todo) => {
      if (newTodo.key === todo.key) {
        return newTodo
      }
      return todo
    })

    return { ...state, currentListTodos }
  }
}

function removeTodosFromCurrentList(todoKey: string): ListStoreType {
  return (state) => {
    const currentListTodos = state.currentListTodos.filter((todo) => todo.key !== todoKey)

    return { ...state, currentListTodos }
  }
}

export default useListsStore

import { push, ref, remove, set, update } from 'firebase/database'
import { database } from '../../firebase'
import { TodoList } from '../utils/models'

export const updateList = async (userId: string, listId: string, list: TodoList) => {
  const newRef = ref(database, `/lists/${userId}/${listId}`)
  return await update(newRef, list)
}

export const updateListName = async (userId: string, newListName: string, list: TodoList) => {
  const newRef = ref(database, `/lists/${userId}/${list.listId}`)
  return await update(newRef, { ...list, listName: newListName })
}

export const saveNewList = (userId: string, newList: TodoList) => {
  const newRef = push(ref(database, `/lists/${userId}/`))
  return set(newRef, newList)
}

export const removeList = (userId: string, listId: string) => {
  const dbRef = ref(database, `/lists/${userId}/${listId}`)
  return remove(dbRef)
}

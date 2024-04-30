import { get, push, ref, remove, set } from 'firebase/database'
import { database } from '../../firebase'
import { TodoList } from '../utils/models'

export const fetchAllLists = async (userId: string) => {
  const dbRef = ref(database, `/lists/${userId}`)
  const snapshot = await get(dbRef)
  if (snapshot.exists()) {
    const allLists = Object.values(snapshot.val()) as TodoList[]
    const listsWithId = Object.keys(snapshot.val()).map((listId, index) => {
      return { ...allLists[index], listId }
    })
    return listsWithId
  } else {
    alert('there are no lists')
    return []
  }
}

export const updateListName = (userId: string, newListName: string, list: TodoList) => {
  const newRef = ref(database, `/lists/${userId}/${list.listId}`)
  return set(newRef, { ...list, listName: newListName })
}

export const saveNewList = (userId: string, newList: TodoList) => {
  const newRef = push(ref(database, `/lists/${userId}/`))
  set(newRef, newList)
    .then(() => {
      alert('list was saved')
    })
    .catch((error) => {
      console.log(error)
    })
}

export const removeList = (userId: string, listId: string) => {
  const dbRef = ref(database, `/lists/${userId}/${listId}`)
  remove(dbRef)
}

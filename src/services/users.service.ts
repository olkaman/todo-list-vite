import { ref, remove } from 'firebase/database'
import { database } from '../../firebase'

export const removeUsersLists = (userId: string, listId: string) => {
  const dbRef = ref(database, `/lists/${userId}/${listId}`)
  remove(dbRef)
}

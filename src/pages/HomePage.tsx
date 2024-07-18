import Header from '../components-layout/Header'
import useListsStore, { useLists } from '../stores/listStore'
import { ref, onValue } from 'firebase/database'
import { useEffect } from 'react'
import { database } from '../../firebase'
import { TodoList } from '../utils/models'
import { useUserId } from '../stores/userStore'
import ListsPanel from '../features/lists/ListsPanel'
import List from '../features/lists/List'

export default function HomePage() {
  const setListsInStore = useListsStore((state) => state.setLists)
  const lists = useLists()
  const userId = useUserId()

  useEffect(() => {
    const dataRef = ref(database, `/lists/${userId}`)
    onValue(dataRef, (snapshot) => {
      const allLists = Object.values(snapshot.val()) as TodoList[]
      const listsWithId = Object.keys(snapshot.val()).map((listId, index) => {
        return { ...allLists[index], listId }
      })
      setListsInStore(listsWithId)
    })
  }, [])

  console.log('lists', lists)
  return (
    <main>
      <Header hasLogo />
      <div className='mx-24 my-8'>
        <ListsPanel hasLogo={false} customStyles='w-96 p-6 rounded-lg'>
          {lists.map((list: TodoList) => {
            return <List key={list.key} list={list} canEditAndRemoveList={false} />
          })}
        </ListsPanel>
      </div>
    </main>
  )
}

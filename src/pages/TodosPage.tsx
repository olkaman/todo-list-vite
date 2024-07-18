import { ref, onValue } from 'firebase/database'
import { useEffect } from 'react'
import { database } from '../../firebase'
import { TodoList } from '../utils/models'
import useListsStore, { useLists } from '../stores/listStore'
import { useUserId } from '../stores/userStore'
import { useParams } from 'react-router-dom'
import ListsPanel from '../features/lists/ListsPanel'
import Header from '../components-layout/Header'
import Todos from '../features/todos/Todos'
import List from '../features/lists/List'

export default function TodosPage() {
  const { listKey } = useParams()

  const setListsInStore = useListsStore((state) => state.setLists)
  const userId = useUserId()
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const lists = useLists()

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

  useEffect(() => {
    if (!listKey) return
    setCurrentSelectedListId(listKey)
  }, [listKey])

  return (
    <main className='flex flex-row'>
      <ListsPanel hasLogo customStyles='p-3 fixed top-0 left-0 z-20 w-80 h-screen h-lists overflow-auto'>
        {lists.map((list: TodoList) => {
          return <List key={list.key} list={list} />
        })}
      </ListsPanel>
      <div className='ml-80 w-full'>
        <Header />
        <Todos />
      </div>
    </main>
  )
}

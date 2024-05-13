import { SyntheticEvent, useEffect, useState } from 'react'
import AddNewList from '../../components/AddNewForm'
import { TodoList } from '../../utils/models'
import { saveNewList } from '../../services/lists.service'
import List from './List'
import useListsStore from '../../stores/listStore'
import { useNavigate } from 'react-router-dom'
import { useUserId } from '../../stores/userStore'
import { ref, onValue } from 'firebase/database'
import { database } from '../../../firebase'
import { toast } from 'sonner'

export default function ListsPanel() {
  const setListsInStore = useListsStore((state) => state.setLists)
  const lists = useListsStore((state) => state.lists)
  const addListToStore = useListsStore((state) => state.addList)
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const currentSelectedListId = useListsStore((state) => state.currentSelectedListId)
  const [newListName, setNewListName] = useState('')
  const navigate = useNavigate()
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

  useEffect(() => {
    if (!currentSelectedListId && lists.length > 0) {
      setCurrentSelectedListId(lists[0].key)
    }
  }, [lists])

  const addNewList = (e: SyntheticEvent) => {
    e.preventDefault()
    const newList: TodoList = {
      key: Math.floor(Math.random() * 10000).toString(),
      listId: '',
      listName: newListName,
    }
    addListToStore(newList)
    setCurrentSelectedListId(newList.key)

    saveNewList(userId, newList)
      .then(() => {
        toast.success(`List ${newListName} was added`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })

    navigate(`${newList.key}`)
    setNewListName('')
  }

  return (
    <>
      <h2>Todos</h2>
      <h3 className='p-3'>Your lists:</h3>
      <AddNewList onSubmit={addNewList} inputValue={newListName} setInputValue={setNewListName} placeholder='Add new list name' counterMax={50} />
      <nav className='overflow-auto h-lists mt-12'>
        {lists.map((list: TodoList) => {
          return <List key={list.key} list={list} />
        })}
      </nav>
    </>
  )
}

import { FormEvent, useEffect, useState } from 'react'
import AddNewList from '../../components/AddNewForm'
import { TodoList } from '../../utils/models'
import { fetchAllLists, saveNewList } from '../../services/lists.service'
import List from './List'
import useListsStore from '../../stores/listStore'
import { useNavigate } from 'react-router-dom'
import { useUserId } from '../../stores/authStore'

export default function ListsPanel() {
  const setLists = useListsStore((state) => state.setLists)
  const lists = useListsStore((state) => state.lists)
  const addList = useListsStore((state) => state.addList)
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const currentSelectedListId = useListsStore((state) => state.currentSelectedListId)
  const [newListName, setNewListName] = useState('')
  const navigate = useNavigate()
  const userId = useUserId()

  const fetchLists = () => {
    fetchAllLists(userId).then((allLists: TodoList[]) => {
      setLists(allLists)
      if (!currentSelectedListId && allLists.length > 0) {
        setCurrentSelectedListId(allLists[0].key)
      }
    })
  }

  useEffect(() => {
    fetchLists()
  }, [userId])

  const addNewList = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newList: TodoList = {
      key: Math.floor(Math.random() * 10000).toString(),
      listId: '',
      listName: newListName,
    }

    addList(newList)
    saveNewList(userId, newList)
    setCurrentSelectedListId(newList.key)
    navigate(`${newList.key}`)
    setNewListName('')
    fetchLists()
  }

  return (
    <>
      <h2>Todos</h2>
      <h3 className='p-3'>Your lists:</h3>
      <AddNewList onSubmit={addNewList} inputValue={newListName} setInputValue={setNewListName} />
      <nav className='overflow-auto h-lists'>
        {lists.map((list: TodoList) => {
          return <List key={list.key} list={list} />
        })}
      </nav>
    </>
  )
}

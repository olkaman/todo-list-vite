import { ReactNode, SyntheticEvent, useState } from 'react'
import AddNewList from '../../components/AddNewForm'
import { TodoList } from '../../utils/models'
import { saveNewList } from '../../services/lists.service'
import useListsStore from '../../stores/listStore'
import { useNavigate } from 'react-router-dom'
import { useUserId } from '../../stores/userStore'
import { toast } from 'sonner'
import Logo from '../../components/Logo'

type Props = {
  hasLogo: boolean
  customStyles?: string
  children: ReactNode
}

export default function ListsPanel(props: Props) {
  const { hasLogo, customStyles, children } = props

  const addListToStore = useListsStore((state) => state.addList)
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const [newListName, setNewListName] = useState('')
  const navigate = useNavigate()
  const userId = useUserId()

  const addNewList = (e: SyntheticEvent) => {
    e.preventDefault()
    const newList: TodoList = {
      key: Math.floor(Math.random() * 10000).toString(),
      listId: '',
      listName: newListName,
      todos: [],
    }
    addListToStore(newList)
    setCurrentSelectedListId(newList.key)

    saveNewList(userId, newList)
      .then(() => {
        toast.success(`List <strong>'${newListName}'</strong> was added`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })

    navigate(`../${newList.key}`)
    setNewListName('')
  }

  return (
    <section className={`bg-lightMode-white dark:bg-darkMode-grayDark shadow-xl dark:shadow-black dark:shadow-xl ${customStyles}`}>
      {hasLogo && <Logo customStyles='w-48 mt-4 mb-8 ml-3' />}
      <AddNewList onSubmit={addNewList} inputValue={newListName} setInputValue={setNewListName} placeholder='Add new list name' counterMax={50} />
      <nav className='mt-8'>{children}</nav>
    </section>
  )
}

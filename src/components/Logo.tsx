import myTodosLight from '../assets/myTodosLight.svg'
import myTodosDark from '../assets/myTodosDark.svg'
import { useIsDarkModeOn } from '../stores/userStore'
import { Link } from 'react-router-dom'
import useListsStore from '../stores/listStore'

type Props = {
  customStyles?: string
}

export default function Logo(props: Props) {
  const { customStyles } = props
  const isDarkMode = useIsDarkModeOn()
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)

  return (
    <Link to='/' className='link mr-6' onClick={() => setCurrentSelectedListId('')}>
      <img src={isDarkMode ? myTodosDark : myTodosLight} className={customStyles} />
    </Link>
  )
}

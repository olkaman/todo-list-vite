import { useNavigate } from 'react-router-dom'
import useListsStore from '../stores/listStore'
import { ReactElement } from 'react'

type Props = {
  listKey: string
  children: ReactElement | string
}

export default function MenuItem(props: Props) {
  const { listKey, children } = props
  const setCurrentSelectedListId = useListsStore((state) => state.setCurrentSelectedListId)
  const navigate = useNavigate()

  const onNavigateToList = () => {
    navigate(`../${listKey}`)
    setCurrentSelectedListId(listKey)
  }

  return (
    <button onClick={onNavigateToList} className='w-5/7 max-w-52 w-full text-left py-4 break-words'>
      {children}
    </button>
  )
}

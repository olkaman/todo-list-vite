import { useRef } from 'react'
import Button from '../../components/Button'
import { Modal } from '../../components/Modal'
import { updateList } from '../../services/lists.service'
import useListsStore, { useCurrentListTodos, useListByKey } from '../../stores/listStore'
import { useUserId } from '../../stores/userStore'
import { ButtonStyleTypes } from '../../utils/globalTypes'
import { toast } from 'sonner'

type Props = {
  listKey: string | undefined
}

export default function Counter(props: Props) {
  const { listKey } = props

  const todos = useCurrentListTodos()
  const list = useListByKey(listKey ?? '')
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList)
  const userId = useUserId()
  const readyTasksNumber = todos.filter((todo) => todo.checked).length
  const totalTasksNumber = todos.length
  const modalRef = useRef<HTMLDialogElement>(null)

  const onOpenModal = () => {
    if (!modalRef.current) return
    modalRef.current.showModal()
  }

  const removeReadyTasks = () => {
    const todosNotReady = todos.filter((todo) => todo.checked !== true)
    loadTodosToCurrentList(todosNotReady)
    const newList = { ...list, todos: todosNotReady }
    updateList(userId, list.listId, newList)
      .then(() => {
        toast.success(`All tasks set to done were removed`)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })

    modalRef.current?.close()
  }

  return (
    <>
      <section className='flex items-center justify-center mb-4 '>
        <div className='px-12 py-2'>{`Ready tasks: ${readyTasksNumber} / ${totalTasksNumber}`}</div>
        {readyTasksNumber > 0 && (
          <Button styleType={ButtonStyleTypes.Primary} handleOnClick={onOpenModal}>
            Remove all done tasks?
          </Button>
        )}
      </section>
      <Modal
        buttonStyleType={ButtonStyleTypes.Primary}
        handleOnCancel={() => modalRef.current?.close()}
        handleOnConfirm={removeReadyTasks}
        title='Remove list?'
        confirmButtonLabel='Remove'
        ref={modalRef}
      >
        <p>Are you sure you want to remove all tasks set to done?</p>
      </Modal>
    </>
  )
}

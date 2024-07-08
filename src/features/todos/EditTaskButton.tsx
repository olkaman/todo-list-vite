import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  todoChecked: boolean
  setIsTaskEdited: (isTaskEdited: boolean) => void
  isTaskEdited: boolean
  children: ReactNode
  isTaskReady: boolean
}

export default function EditTaskButton(props: Props) {
  const { todoChecked, isTaskReady, isTaskEdited, setIsTaskEdited, children } = props
  return (
    <button
      onClick={() => setIsTaskEdited(!isTaskEdited)}
      disabled={todoChecked}
      className={clsx(
        isTaskReady && 'line-through ',
        !isTaskReady &&
          'break-words w-full max-w-[800px] group-hover/todoItem:text-accentLightModeText group-hover/todoItem:underline group-hover/todoItem:underline-offset-2 dark:group-hover/todoItem:text-accent',
        'text-left py-3 disabled:cursor-not-allowed break-words pr-6'
      )}
    >
      {children}
    </button>
  )
}

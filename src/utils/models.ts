export type TodoList = { key: string; listId: string; listName: string; todos: TodoItemType[] }

export type TodoItemType = { key: string; task: string; checked: boolean; date: number; id: string; colId: string }

export type User = { email: string; id: string }

export type KanbanColumn = {
  id: string
  title: string
}

export type KanbanTask = {
  id: string
  title: string
  colId: string
}

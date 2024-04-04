export type TodoList = { key: string; listId?: string; listName: string; todoList?: TodoItemType[] };

export type TodoItemType = { key: string; task: string; checked: boolean; date: number };
import { get, push, ref, remove, set } from 'firebase/database';
import { database } from '../../firebase';
import { TodoItemType } from '../utils/models';

export const fetchAllTodos = async (listId: string) => {
  const dbRef = ref(database, '/lists/' + listId + '/todos');
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const todos = Object.values(snapshot.val()) as TodoItemType[];
    const todosWithId = Object.keys(snapshot.val()).map((id, index) => {
      return { ...todos[index], id };
    });
    return todosWithId;
  } else {
    console.log('No daksdlskd');
    return null;
  }
};

export const saveNewTodo = (newTodo: TodoItemType, listId: string) => {
  const newRef = push(ref(database, `/lists/` + listId + '/todos'));
  set(newRef, newTodo)
    .then(() => {
      alert('todo was saved');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTodo = async (updatedTodo: TodoItemType, listId: string) => {
  const newRef = ref(database, `/lists/${listId}/todos/${updatedTodo.id}`);
  return set(newRef, updatedTodo);
};

export const removeTodo = (todo: TodoItemType, listId: string) => {
  const dbRef = ref(database, `/lists/${listId}/todos/${todo.id}`);
  remove(dbRef);
};

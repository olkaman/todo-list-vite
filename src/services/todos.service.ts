import { get, push, ref, set } from 'firebase/database';
import { database } from '../../firebase';
import { TodoItemType } from '../utils/models';

export const fetchAllTodos = async (listId: string) => {
  const dbRef = ref(database, '/lists/' + listId + '/todos');
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return Object.values(snapshot.val()) as TodoItemType[];
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

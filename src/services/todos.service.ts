import { get, push, ref, set } from 'firebase/database';
import { database } from '../../firebase';
import { TodoItemType } from '../utils/models';

export const saveNewTodo = (newTodo: TodoItemType, listId: string) => {
  console.log('newTodo', newTodo);
  const newRef = push(ref(database, `/lists/` + listId + '/todos'));
  set(newRef, newTodo)
    .then(() => {
      alert('todo was saved');
    })
    .catch((error) => {
      console.log(error);
    });
};

import { get, ref, set } from 'firebase/database';
import { database } from '../../firebase';
import { TodoList } from '../utils/models';

export const fetchAllLists = async () => {
  const dbRef = ref(database, `/todos`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const allLists = Object.values(snapshot.val()) as TodoList[];
    const listsWithId = Object.keys(snapshot.val()).map((listId, index) => {
      return { ...allLists[index], listId };
    });
    console.log(listsWithId);
    return listsWithId;
  } else {
    alert('there are no lists');
    return [];
  }
};

export const updateListName = (newListName: string, list: TodoList) => {
  const newRef = ref(database, '/todos/' + list.listId);
  return set(newRef, { ...list, listName: newListName });
};

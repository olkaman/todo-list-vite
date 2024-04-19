import { get, push, ref, remove, set } from 'firebase/database';
import { database } from '../../firebase';
import { TodoList } from '../utils/models';

export const fetchAllLists = async () => {
  const dbRef = ref(database, '/lists');
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const allLists = Object.values(snapshot.val()) as TodoList[];
    const listsWithId = Object.keys(snapshot.val()).map((listId, index) => {
      return { ...allLists[index], listId };
    });
    return listsWithId;
  } else {
    alert('there are no lists');
    return [];
  }
};

export const updateListName = (newListName: string, list: TodoList) => {
  const newRef = ref(database, '/lists/' + list.listId);
  return set(newRef, { ...list, listName: newListName });
};

export const saveNewList = (newList: TodoList) => {
  const newRef = push(ref(database, `/lists/`));
  set(newRef, newList)
    .then(() => {
      alert('list was saved');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeList = (listId: string) => {
  const dbRef = ref(database, '/lists/' + listId);
  remove(dbRef);
};

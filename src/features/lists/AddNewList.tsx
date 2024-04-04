import { TodoList } from '../../utils/models';
import { push, ref, set } from 'firebase/database';
import { database } from '../../../firebase';
import { useState } from 'react';
import IconButton from '../../components/iconButton/IconButton';
import { CirclePlus } from 'lucide-react';

export default function AddNewList() {
  const [listName, setListName] = useState('');

  const addNewList = () => {
    const newList: TodoList = {
      key: Math.floor(Math.random() * 10000).toString(),
      listName: listName,
      todoList: [],
      listId: '',
    };

    const newRef = push(ref(database, `/todos/`));
    set(newRef, newList)
      .then(() => {
        alert('list was saved');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={addNewList}>
      <h3>Add new list</h3>
      <input value={listName} onChange={(e) => setListName(e.currentTarget.value)} placeholder={'Enter list name'} />
      <IconButton icon={<CirclePlus strokeWidth={1.25} />} />
    </form>
  );
}

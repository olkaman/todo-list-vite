import { useEffect, useState } from 'react';
import AddNewList from '../../components/AddNewForm';
import { TodoList } from '../../utils/models';
import { fetchAllLists } from '../../services/lists.service';
import List from './List';
import useListsStore, { useLists } from '../../stores/listStore';
import { push, ref, set } from 'firebase/database';
import { database } from '../../../firebase';

export default function ListsPanel() {
  const setLists = useListsStore((state) => state.setLists);
  const lists = useLists();
  const [listName, setListName] = useState('');

  useEffect(() => {
    fetchAllLists().then((allLists) => {
      setLists(allLists);
    });
  }, []);

  const addNewList = () => {
    const newList: TodoList = {
      key: Math.floor(Math.random() * 10000),
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
    <section className=''>
      <h2>Todos</h2>
      <h3 className='p-3'>Your lists:</h3>
      <AddNewList onSubmit={addNewList} inputValue={listName} setInputValue={setListName} />
      <nav className='overflow-auto h-lists'>
        {lists.map((list: TodoList) => {
          return <List key={list.key} listKey={list.key} />;
        })}
      </nav>
    </section>
  );
}

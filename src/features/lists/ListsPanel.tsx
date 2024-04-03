import { useEffect, useState } from 'react';
import AddNewList from './AddNewList';
import { TodoList } from '../../utils/models';
import { fetchAllLists } from '../../services/lists.service';
import { Link } from 'react-router-dom';
import List from './List';

export default function ListsPanel() {
  const [lists, setLists] = useState<TodoList[]>([]);

  useEffect(() => {
    fetchAllLists().then((allLists) => {
      setLists(allLists);
    });
  }, []);

  return (
    <section>
      Your lists:
      <AddNewList />
      {lists.map((list: TodoList) => {
        return (
          <Link to={`${list.key}`} key={list.listId}>
            <List list={list} />
          </Link>
        );
      })}
    </section>
  );
}

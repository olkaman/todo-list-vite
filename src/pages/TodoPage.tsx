import { get, ref, set } from 'firebase/database';
import { database } from '../../firebase';
import TodoItem from '../features/todos/TodoItem';
import { useEffect, useState } from 'react';
import { TodoItemType } from '../utils/models';

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const fetchTodos = async () => {
    const dbRef = ref(database, `/todos / ${userId}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val(), Object.values(snapshot.val())[0]);
      const newTodos = Object.values(snapshot.val()) as TodoItemType[];
      setTodos(newTodos);
    } else {
      // alert('No data exist');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const userId = 3234342342;

  const saveData = () => {
    const newRef = ref(database, `/todos / ${userId}`);
    set(newRef, [
      { key: '1255189', task: 'ddd', checked: false, date: 1711306895818 },
      { key: '9729794', task: 'sss', checked: true, date: 1711306877827 },
    ])
      .then(() => {
        alert('todos were saved');
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log('todos', todos);
  return (
    <section>
      {todos.map((todo) => {
        return <TodoItem key={todo.key} checked={todo.checked} task={todo.task} date={todo.date}></TodoItem>;
      })}
      <button onClick={saveData}>Save todos</button>
    </section>
  );
}

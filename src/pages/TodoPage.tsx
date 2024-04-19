import { get, push, ref, set } from 'firebase/database';
import { database } from '../../firebase';
import TodoItem from '../features/todos/TodoItem';
import { FormEvent, useEffect, useState } from 'react';
import { TodoItemType } from '../utils/models';
import AddNewForm from '../components/AddNewForm';
import useTodosStore from '../stores/todoStore';
import { useParams } from 'react-router-dom';
import useListsStore, { useCurrentListTodos } from '../stores/listStore';

export default function TodoPage() {
  const setTodos = useTodosStore((state) => state.setTodos);
  const todos = useCurrentListTodos();
  const { listId } = useParams();
  const addTodosToCurrentList = useListsStore((state) => state.addTodosToCurrentList);
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList);
  const [newTaskName, setNewTaskName] = useState('');
  const currentSelectedListId = useListsStore((state) => state.currentSelectedListId);
  const updateTodoItemInCurrentList = useListsStore((state) => state.updateTodoItemInCurrentList);

  const fetchTodos = async () => {
    const dbRef = ref(database, '/lists/' + currentSelectedListId + '/todos');
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const newTodos = Object.values(snapshot.val()) as TodoItemType[];
      loadTodosToCurrentList(newTodos);
    } else {
      loadTodosToCurrentList([]);
      console.log('No todos exist');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [currentSelectedListId]);

  const userId = 3234342342;

  // const saveData = async () => {
  //   const newRef = ref(database, '/lists/' + listId + '/todos');
  //   set(newRef, { ...list, todoList: todos })
  //     .then(() => {
  //       alert('todos were saved');
  //       // fetchTodos();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const saveNewTodo = (newTodo: TodoItemType) => {
    console.log('newTodo', newTodo);
    const newRef = push(ref(database, `/lists/` + currentSelectedListId + '/todos'));
    set(newRef, newTodo)
      .then(() => {
        alert('todo was saved');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAddNewTodo = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newTodo: TodoItemType = {
      key: Math.floor(Math.random() * 10000),
      task: newTaskName,
      checked: false,
      date: Date.now(),
    };
    console.log(newTodo);
    addTodosToCurrentList(newTodo);
    saveNewTodo(newTodo);
    setNewTaskName('');
  };

  const editTaskValue = (updatedTodo: TodoItemType) => {
    console.log('iii', updatedTodo);
    // const newList = todos.map((todo) => {
    //   if (updatedTodo.key === todo.key) return updatedTodo;
    //   else return todo;
    // });
    //  console.log('newList', newList);
    updateTodoItemInCurrentList(updatedTodo);
  };

  return (
    <section>
      <AddNewForm onSubmit={onAddNewTodo} inputValue={newTaskName} setInputValue={setNewTaskName} />
      {todos.map((todo) => {
        return <TodoItem key={todo.key} editTaskValue={editTaskValue} todo={todo}></TodoItem>;
      })}
    </section>
  );
}

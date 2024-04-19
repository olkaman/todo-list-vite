import TodoItem from '../features/todos/TodoItem';
import { FormEvent, useEffect, useState } from 'react';
import { TodoItemType } from '../utils/models';
import AddNewForm from '../components/AddNewForm';
import { useParams } from 'react-router-dom';
import useListsStore, { useCurrentListTodos, useListIdByKey } from '../stores/listStore';
import { fetchAllTodos, saveNewTodo } from '../services/todos.service';

export default function TodoPage() {
  const todos = useCurrentListTodos();
  const { listKey } = useParams();
  const listId = useListIdByKey(listKey ?? '');
  const addTodoToCurrentList = useListsStore((state) => state.addTodosToCurrentList);
  const loadTodosToCurrentList = useListsStore((state) => state.loadTodosToCurrentList);
  const [newTaskName, setNewTaskName] = useState('');
  const updateTodoItemInCurrentList = useListsStore((state) => state.updateTodoItemInCurrentList);

  useEffect(() => {
    fetchAllTodos(listId)
      .then((allTodos) => {
        loadTodosToCurrentList(allTodos ?? []);
      })
      .catch(() => {});
  }, [listId]);

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

  const onAddNewTodo = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newTodo: TodoItemType = {
      key: Math.floor(Math.random() * 10000),
      task: newTaskName,
      checked: false,
      date: Date.now(),
    };

    addTodoToCurrentList(newTodo);
    saveNewTodo(newTodo, listId);
    setNewTaskName('');
  };

  const editTaskValue = (updatedTodo: TodoItemType) => {
    console.log('iii', updatedTodo);
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

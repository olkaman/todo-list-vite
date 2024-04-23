import { Check, Trash, X } from 'lucide-react';
import IconButton from '../../components/IconButton';
import CustomCheckbox from './CustomCheckbox';
import { useState } from 'react';
import TextAreaField from '../../components/TextAreaField';
import { TodoItemType } from '../../utils/models';
import clsx from 'clsx';
import useListsStore from '../../stores/listStore';
import { updateTodo } from '../../services/todos.service';

type Props = {
  todo: TodoItemType;
  listId: string;
};

export default function TodoItem(props: Props) {
  const { todo, listId } = props;

  const [isTaskEdited, setIsTaskEdited] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(todo.checked);
  const updateTodoItemInCurrentList = useListsStore((state) => state.updateTodoItemInCurrentList);

  const handleOnSave = () => {
    setIsTaskEdited(!isTaskEdited);
    editTaskValue({ ...todo, task: inputValue });
  };

  const handleOnCheck = () => {
    setIsChecked(!isChecked);
    editTaskValue({ ...todo, checked: !isChecked });
  };
  const handleRemove = () => {};

  const editTaskValue = (updatedTodo: TodoItemType) => {
    updateTodoItemInCurrentList(updatedTodo);
    updateTodo(updatedTodo, listId)
      .then(() => {
        // alert('todos were saved');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={clsx(
        isTaskEdited && 'dark:border dark:border-gray-dark dark:border-l-accent',
        'containerStyles boxShadow rounded-xl w-full mb-5 p-6 flex flex-row items-center justify-between'
      )}
    >
      {!isTaskEdited && <CustomCheckbox checked={todo?.checked || false} handleOnCheck={handleOnCheck} disabled={todo?.task === ''} />}
      {isTaskEdited ? (
        <div className='w-full flex flex-row items-center justify-between'>
          <TextAreaField handleOnSave={handleOnSave} inputValue={inputValue} placeholder='Edit task name' className={todo?.key.toString() || ''} setInputValue={setInputValue} />
          <div className='flex flex-row items-center'>
            <IconButton handleOnClick={handleOnSave} icon={<Check />} />
            <IconButton handleOnClick={() => setIsTaskEdited(!isTaskEdited)} icon={<X />} />
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-between items-center w-full'>
          <button onClick={() => setIsTaskEdited(!isTaskEdited)} disabled={todo?.checked}>
            {todo?.task !== '' ? todo?.task : <i>Enter task name</i>}
          </button>
          <div className='flex items-center'>
            <p className='text-xs'>{new Date(todo?.date || '').toLocaleString()}</p>
            <IconButton handleOnClick={handleRemove} icon={<Trash />} />
          </div>
        </div>
      )}
    </div>
  );
}

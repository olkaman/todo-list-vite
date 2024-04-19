import { Check, Trash, X } from 'lucide-react';
import IconButton from '../../components/IconButton';
import CustomCheckbox from './CustomCheckbox';
import { useState } from 'react';
import TextAreaField from '../../components/TextAreaField';
import { TodoItemType } from '../../utils/models';
import clsx from 'clsx';

type Props = {
  editTaskValue: (todo: TodoItemType) => void;
  todo: TodoItemType;
};

export default function TodoItem(props: Props) {
  const { editTaskValue, todo } = props;
  // const todo = useTodoById(todoId);
  const [isTaskEdited, setIsTaskEdited] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  const handleOnSave = () => {
    if (!todo) return;

    setIsTaskEdited(!isTaskEdited);
    editTaskValue({ ...todo, task: inputValue });
  };

  const handleOnCheck = () => {
    if (!todo) return;

    setIsChecked(!isChecked);
    editTaskValue({ ...todo, checked: !isChecked });
  };
  const handleRemove = () => {};

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

import { Check, X } from 'lucide-react';
import InputField from './InputField';
import IconButton from './IconButton';
import { iconSize, strokeWidth } from '../utils/iconSettings';

type Props = {
  isEdited: boolean;
  setIsEdited: (isEdited: boolean) => void;
  onSubmit: () => void;
  listName: string;
  setListName: (listName: string) => void;
};

export default function EditTextForm(props: Props) {
  const { isEdited, setIsEdited, onSubmit, listName, setListName } = props;

  return (
    <form onSubmit={onSubmit} className='flex flex-row justify-between'>
      <InputField hasCounter={false} inputValue={listName} setInputValue={setListName} customStyles='w-5/7' />
      <div className='w-2/7 flex flex-row'>
        <IconButton icon={<Check strokeWidth={strokeWidth} size={iconSize} />} />
        <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<X strokeWidth={strokeWidth} size={iconSize} />} />
      </div>
    </form>
  );
}

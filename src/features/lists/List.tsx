import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import IconButton from '../../components/IconButton';
import { iconSize, strokeWidth } from '../../utils/iconSettings';
import { ref, remove } from 'firebase/database';
import { database } from '../../../firebase';
import EditTextForm from '../../components/EditTextForm';
import { useListById } from '../../stores/listStore';
import { NavLink } from 'react-router-dom';
import { updateListName } from '../../services/lists.service';

type Props = {
  listKey: number;
};

export default function List(props: Props) {
  const { listKey } = props;
  const list = useListById(listKey);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [listName, setListName] = useState(list?.listName || '');

  const onSaveListName = () => {
    console.log('1');
    if (!listName || !list) return;
    console.log('2');
    updateListName(listName, list)
      .then(() => {
        setIsEdited(false);
        alert('list name was saved');
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    if (!list) return;

    const dbRef = ref(database, '/todos/' + list.listId);
    remove(dbRef);
    window.location.reload();
  };

  return (
    <div>
      {!isEdited ? (
        <NavLink to={listKey.toString()} className='flex items-center justify-between p-3 hover:bg-accent dark:hover:bg-gray rounded-lg globalTransition'>
          <div className='w-5/7'>{list?.listName}</div>
          <div className='w-2/7 flex flex-row'>
            <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<Pencil strokeWidth={strokeWidth} size={iconSize} />} />
            <IconButton handleOnClick={() => handleDelete()} icon={<Trash strokeWidth={strokeWidth} size={iconSize} />} />
          </div>
        </NavLink>
      ) : (
        <div className='flex items-center justify-between p-3 bg-accent dark:bg-gray rounded-lg'>
          <EditTextForm isEdited={isEdited} setIsEdited={setIsEdited} onSubmit={onSaveListName} listName={listName} setListName={setListName} />
        </div>
      )}
    </div>
  );
}

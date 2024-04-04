import { useState } from 'react';
import { TodoList } from '../../utils/models';
import { updateListName } from '../../services/lists.service';
import { Check, X, Pencil } from 'lucide-react';
import IconButton from '../../components/iconButton/IconButton';

type Props = {
  list: TodoList;
};

export default function List(props: Props) {
  const { list } = props;
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [listName, setListName] = useState<string>(list.listName);

  const onSaveListName = () => {
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

  return (
    <div>
      {!isEdited ? (
        <>
          <div>{list.listName}</div>
          <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<Pencil strokeWidth={1.25} />} />
        </>
      ) : (
        <>
          <input value={listName} onChange={(e) => setListName(e.currentTarget.value)} />
          <IconButton handleOnClick={onSaveListName} icon={<Check strokeWidth={1.25} />} />
          <IconButton handleOnClick={() => setIsEdited(!isEdited)} icon={<X strokeWidth={1.25} />} />
        </>
      )}
    </div>
  );
}

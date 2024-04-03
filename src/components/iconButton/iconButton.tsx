import { ReactElement } from 'react';
import styles from './IconButton.module.scss';

type Props = {
  handleOnClick?: () => void;
  icon: ReactElement;
};

function IconButton(props: Props) {
  const { handleOnClick, icon } = props;
  return (
    <button onClick={handleOnClick} className={styles.iconButton}>
      {icon}
    </button>
  );
}
export default IconButton;

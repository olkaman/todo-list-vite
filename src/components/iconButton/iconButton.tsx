import { ReactElement } from 'react';
import styles from './Button.module.scss';

type Props = {
  handleOnClick: () => void;
  icon: ReactElement;
};

function Button(props: Props) {
  const { handleOnClick, icon } = props;
  return (
    <button onClick={handleOnClick} className={styles.iconButton}>
      {icon}
    </button>
  );
}
export default Button;

import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export default function Container(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}

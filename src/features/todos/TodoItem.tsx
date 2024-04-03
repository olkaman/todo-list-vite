type Props = {
  checked: boolean;
  task: string;
  date: number;
};

export default function TodoItem(props: Props) {
  const { task, date, checked } = props;
  return (
    <div>
      <div>done? {checked}</div>
      <div>task: {task}</div>
      <div>date: {date}</div>
    </div>
  );
}

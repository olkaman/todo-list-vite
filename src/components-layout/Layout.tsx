import { ReactElement } from 'react';

type Props = {
  header: ReactElement;
  sidebar: ReactElement;
  content: ReactElement;
};

export default function Layout(props: Props) {
  const { header, sidebar, content } = props;

  return (
    <main className='flex flex-row text-textColor dark:text-textColor-darkMode'>
      <section className='p-3 bg-bgColor dark:bg-gray-dark shadow-lg dark:shadow-black dark:shadow-xl w-80 h-screen'>{sidebar}</section>
      <div className='w-full'>
        <section>{header}</section>
        <section className='py-6 px-20'>{content}</section>
      </div>
    </main>
  );
}

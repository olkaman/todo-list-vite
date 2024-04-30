import { ReactElement } from 'react'

type Props = {
  header: ReactElement
  sidebar: ReactElement
  content: ReactElement
}

export default function Layout(props: Props) {
  const { header, sidebar, content } = props

  return (
    <main className='flex flex-row text-textColor dark:text-textColor-darkMode'>
      <section className='fixed top-0 left-0 z-20 p-3 bg-bgColor dark:bg-gray-dark shadow-xl dark:shadow-black dark:shadow-xl w-80 h-screen'>{sidebar}</section>
      <div className='ml-80 w-full'>
        <section className=' bg-bgColor-appBg dark:bg-gray shadow-md dark:shadow-lg sticky top-0 left-0 z-10'>{header}</section>
        <section className='py-6 px-20'>{content}</section>
      </div>
    </main>
  )
}

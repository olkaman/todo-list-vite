import clsx from 'clsx'
import { ReactElement, useEffect, useRef, useState } from 'react'

type Props = {
  header: ReactElement
  sidebar: ReactElement
  content: ReactElement
}

export default function Layout(props: Props) {
  const { header, sidebar, content } = props
  const [isShadowVisible, setIsShadowVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsShadowVisible(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <main className='flex flex-row text-textColor dark:text-textColor-darkMode'>
      <section ref={ref} className='fixed top-0 left-0 z-20 p-3 bg-bgColor dark:bg-gray-dark shadow-xl dark:shadow-black dark:shadow-xl w-80 h-screen'>
        {sidebar}
      </section>
      <div className='ml-80 w-full'>
        <section className={clsx(isShadowVisible && 'shadow-md dark:shadow-lg', 'bg-bgColor-appBg dark:bg-gray sticky top-0 left-0 z-10')}>{header}</section>
        <section className='py-6 px-20'>{content}</section>
      </div>
    </main>
  )
}

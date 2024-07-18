import pencilLight from '../assets/pencilLight.svg'

export default function EmptyPage() {
  return (
    <section className='flex justify-center items-center h-todos'>
      <div className='flex flex-col justify-center items-center bg-lightMode-white/30 dark:bg-darkMode-grayDark/30 w-60 h-60 rounded-full'>
        <img src={pencilLight} className='w-24' />
        <span className='text-center text-lightMode-placeholder dark:text-darkMode-placeholder mt-3'>
          <h3 className='h3'>Your list is empty!</h3>
          <p className='text-xs'>
            Now you can relax <br />
            or add new tasks
          </p>
        </span>
      </div>
    </section>
  )
}

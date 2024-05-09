import clsx from 'clsx'

type Props = {
  handleOnClick?: () => void
  children: string
  customStyles?: string
  disabled?: boolean
  styleType: 'primary' | 'secondary'
}

export default function Button(props: Props) {
  const { handleOnClick, children, customStyles, disabled, styleType } = props
  console.log(styleType)
  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={clsx(
        styleType === 'primary'
          ? 'dark:bg-accentDarkMode bg-accentLightMode text-lightMode-white'
          : 'bg-none text-darkMode-gray hover:text-lightMode-white dark:hover:text-darkMode-gray',
        `${customStyles} globalTransition py-3 px-6 hover:bg-accentLightModeHover dark:hover:bg-accentDarkModeHover dark:text-darkMode-gray text-xs font-medium rounded uppercase disabled:bg-darkMode-grayLight disabled:opacity-60 disabled:cursor-not-allowed`
      )}
    >
      {children}
    </button>
  )
}

type Props = {
  handleOnClick?: () => void
  children: string
  customStyles?: string
  disabled?: boolean
}

export default function Button(props: Props) {
  const { handleOnClick, children, customStyles, disabled } = props
  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={`${customStyles} globalTransition p-3 bg-accentLightMode hover:bg-accentLightModeHover dark:bg-accentDarkMode dark:hover:bg-accentDarkModeHover text-lightMode-white dark:text-darkMode-gray text-xs font-medium rounded uppercase disabled:bg-darkMode-grayLight disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

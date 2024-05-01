export const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const getValueFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export function getFromLocalStorage<T>(key: string): T | null {
  const localStorageItem = localStorage.getItem(key);
  if (localStorageItem) {
    return JSON.parse(localStorageItem) as T;
  }
  return null;
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

const ifWindowDefined = () => typeof window !== 'undefined';

export const setLocalStorage = (key: string, value: string) => {
  if (ifWindowDefined()) {
    window.localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (ifWindowDefined()) {
    return window.localStorage.getItem(key);
  }
};

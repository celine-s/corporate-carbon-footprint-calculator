const ifWindowDefined = () => typeof window !== 'undefined';

export const setLocalStorage = (key: string, value: { [key: string]: string }) => {
  if (ifWindowDefined()) {
    if (value != null) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    return undefined;
  }
};

export const getLocalStorage = (key: string) => {
  if (ifWindowDefined()) {
    const getValue = window.localStorage.getItem(key);
    if (getValue) {
      return JSON.parse(getValue);
    }
    return undefined;
  }
};

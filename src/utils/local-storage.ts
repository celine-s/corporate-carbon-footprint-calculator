const ifWindowDefined = () => typeof window !== 'undefined';

export const setLocalStorage = (key: string, value: { [key: string]: string }) => {
  if (ifWindowDefined()) {
    const newValue = {};
    if (value != null) {
      for (const key in value) {
        if (value[key]) {
          Object.assign(newValue, { [key]: value[key] });
        } else {
          Object.assign(newValue, { [key]: '0' });
        }
      }
      window.localStorage.setItem(key, JSON.stringify(newValue));
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

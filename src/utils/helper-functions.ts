const ifWindowDefined = () => typeof window !== 'undefined';

export const setLocalStorage = (key: string, value: string) =>
  ifWindowDefined() ? window.localStorage.setItem(key, value) : null;

export const getLocalStorage = (key: string) => (ifWindowDefined() ? window.localStorage.getItem(key) : null);

export const ifQuestionHasAnswer = (index: number) => getLocalStorage(index.toString()) !== undefined;

export const isInputValid = (answer: string) => {
  if (parseFloat(answer) > 9999) {
    alert('Die höchste Mögliche Zahl ist 9999. Bitte gebe eine kleinere Zahl ein');
    return false;
  } else if (answer.length > 10) {
    alert('Hat deine Zahl mehr als 10 Ziffern? Dann bitte auf mind. 10 kürzen.');
    return false;
  }
  return true;
};

//later into data file or DB
export const theory = {
  title: 'Facts/Transparenz über diese Kategorie und oder Frage',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error neque odio explicabo, necessitatibus eaque numquam tenetur deleniti sequi at facere earum eos, voluptates culpa nam, quae exercitationem recusandae? Aspernatur, aliquam.',
};

//do I need this some day?
export const initialAnswerProp = '';
export const initialImpact = '';

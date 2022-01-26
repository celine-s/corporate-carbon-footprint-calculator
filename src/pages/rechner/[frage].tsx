import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { LinkElement } from '../../elements/link';
import { CategoriesNavigation } from '../../compositions/categories-navigation';
import { Question } from '../../data/question';
import { Button } from '../../elements/button';
import { getQuestions } from '../../utils/questions-helper';
import { v4 as uuidv4 } from 'uuid';
import { Question1 } from '../../compositions/question-form-1';
import { Question2 } from '../../compositions/question-form-2';
import { Question3 } from '../../compositions/question-form-3';
import { Question4 } from '../../compositions/question-form-4';
import { Question5 } from '../../compositions/question-form-5';
import { Question6 } from '../../compositions/question-form-6';
import { Question7 } from '../../compositions/question-form-7';
import { Question8 } from '../../compositions/question-form-8';
import { Question9 } from '../../compositions/question-form-9';
import { Question10 } from '../../compositions/question-form-10';
import { Question11 } from '../../compositions/question-form-11';
import { useRouter } from 'next/dist/client/router';
import { WhatIsHappening } from '../../components/info-box';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Transition, Dialog } from '@headlessui/react';

type Props = {
  question: Question;
  MAX_QUESTION_NUMBER: number;
  categoriesWithIndexes: { [key: string]: string[] };
  questionIDs: string[];
};

const Frage: NextPage<Props> = ({
  question,
  questionIDs,
  MAX_QUESTION_NUMBER,
  categoriesWithIndexes,
  question: { id, title, category, infobox, whatTitle, whatText },
}) => {
  const [answer, setAnswer] = useState(getLocalStorage(id));
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const localStorageValue = getLocalStorage(id);
    if (localStorageValue !== undefined) {
      setAnswer(localStorageValue);
    }
  }, [id]);

  const saveCurrentQuestionIntoLocalStorage = () => {
    setLocalStorage(id, answer);
  };

  const submitAnswers = async () => {
    setShowSuccess(true);
    let answers = questionIDs?.map((id) => getLocalStorage(id));
    answers = Object.assign({}, answers);
    const uniqueId = uuidv4();
    const response = await fetch('/api/save-response', {
      method: 'POST',
      body: JSON.stringify({ uniqueId, answers }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      router.push(`/rechner/report/${uniqueId}`);
      localStorage.clear();
    } else {
      alert('Technischer fehler beim sichern. Probiers nochmals.');
    }
  };

  return (
    <CategoriesNavigation
      question={question}
      categoriesWithIndexes={categoriesWithIndexes}
      questionsLength={MAX_QUESTION_NUMBER}
    >
      <div className="bg-white-100 p-6 rounded-md">
        <div className="text-xs py-2">
          Frage {categoriesWithIndexes[category].findIndex((element) => element === id) + 1}/
          {categoriesWithIndexes[category].length}
        </div>
        <div className="mb-8">
          <Heading2>{title}</Heading2>
          <div className="-mt-8 mb-16">
            <Copy>{infobox}</Copy>
          </div>
          {id === '1' && <Question1 answer={answer} callback={setAnswer} />}
          {id === '2' && <Question2 answer={answer} callback={setAnswer} />}
          {id === '3' && <Question3 answer={answer} callback={setAnswer} />}
          {id === '4' && <Question4 answer={answer} callback={setAnswer} />}
          {id === '5' && <Question5 answer={answer} callback={setAnswer} />}
          {id === '6' && <Question6 answer={answer} callback={setAnswer} />}
          {id === '7' && <Question7 callback={setAnswer} answer={answer} />}
          {id === '8' && <Question8 callback={setAnswer} answer={answer} />}
          {id === '9' && <Question9 callback={setAnswer} answer={answer} />}
          {id === '10' && <Question10 callback={setAnswer} answer={answer} />}
          {id === '11' && <Question11 callback={setAnswer} answer={answer} />}
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {parseInt(id) > 1 && (
            <div className="grid justify-start">
              <LinkElement href={`/rechner/${(parseInt(id) - 1).toString()}`} onClick={saveCurrentQuestionIntoLocalStorage}>
                <Button buttonColorGray={true}>Zurück</Button>
              </LinkElement>
            </div>
          )}
          <div className="flex justify-end">
            {parseInt(id) >= MAX_QUESTION_NUMBER ? (
              <Button
                onClick={() => {
                  saveCurrentQuestionIntoLocalStorage();
                  const errorMessage = errorMsg(questionIDs);
                  errorMessage.length === 0 ? submitAnswers() : setErrorMessages(errorMessage);
                }}
              >
                Ende
              </Button>
            ) : (
              <LinkElement href={`/rechner/${(parseInt(id) + 1).toString()}`} onClick={saveCurrentQuestionIntoLocalStorage}>
                <Button>Weiter</Button>
              </LinkElement>
            )}
            {errorMessages.length !== 0 && (
              <ErrorModal errorMessages={errorMsg(questionIDs)} onClose={() => setErrorMessages([])} open={true} />
            )}
            {showSuccess && <SuccessModal setOpen={setShowSuccess} open={showSuccess} />}
          </div>
        </div>
      </div>
      <WhatIsHappening title={whatTitle} content={whatText} />
    </CategoriesNavigation>
  );
};

type SuccessModalProps = { setOpen: (open: boolean) => void; open: boolean };
const SuccessModal: FC<SuccessModalProps> = ({ setOpen, open }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Die Fragen sind beantwortet
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">... und werden gesichert. </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

type ErrorModalProps = { errorMessages: string[]; onClose: () => void; open: boolean };
const ErrorModal: FC<ErrorModalProps> = ({ errorMessages, onClose, open }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Fehlende Daten:
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {errorMessages.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </p>
                    <p className="text-sm text-center text-black-500">
                      Drücke jeweils auf {<i>Weiter</i>}, um die Daten zu sichern.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 border border-gray-300  bg-white-200 text-base font-medium text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cornflower-500 sm:w-auto sm:text-sm"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  Zurück
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const errorMsg = (questionIDs: string[]) => {
  let answers = questionIDs?.map((id) => getLocalStorage(id));

  answers = Object.assign({}, answers);
  const errorMsg = [];
  if (!answers?.[0]?.year) {
    errorMsg.push('Kategorie Team, Frage 1/3.');
  }
  if (!answers?.[1]?.fte) {
    errorMsg.push('Kategorie Team, Frage 2/3.');
  }
  if (!answers?.[2]?.squaremeter) {
    errorMsg.push('Kategorie Team, Frage 3/3.');
  }
  if (!answers?.[3]?.kWh) {
    errorMsg.push('Kategorie Energie, Frage 1/3.');
  }
  if (!answers?.[3]?.electricityType) {
    errorMsg.push('Kategorie Energie, Frage 1/3.');
  }
  if (!answers?.[4]?.heatingType) {
    errorMsg.push('Kategorie Energie, Frage 2/3.');
  }
  if (!answers?.[5]?.constructionPeriod) {
    errorMsg.push('Kategorie Energie, Frage 3/3.');
  }
  if (!answers?.[6]?.percentage) {
    errorMsg.push('Kategorie Pendeln, Frage 1/2.');
  }
  if (!answers?.[7]?.car) {
    errorMsg.push('Kategorie Pendeln, Frage 2/2.');
  }
  if (!answers?.[7]?.publicTransport) {
    errorMsg.push('Kategorie Pendeln, Frage 2/2.');
  }
  if (!answers?.[7]?.bicycle) {
    errorMsg.push('Kategorie Pendeln, Frage 2/2.');
  }
  if (!answers?.[8]?.hours) {
    errorMsg.push('Kategorie Reisen, Frage 1/3.');
  }
  if (!answers?.[9]?.autokm) {
    errorMsg.push('Kategorie Reisen, Frage 2/3.');
  }
  if (!answers?.[10]?.km) {
    errorMsg.push('Kategorie Reisen, Frage 3/3.');
  }
  return errorMsg;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const questions = await getQuestions();

  return {
    paths: questions.map(({ id }) => ({ params: { frage: id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const currentId = params?.frage || '1';
  const questions = await getQuestions();
  const question = questions.find(({ id }) => currentId === id) || questions[0];
  const categoriesWithIndexes = questions.reduce((acc, obj) => {
    const key = obj['category'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj.id);
    for (const val in acc) {
      acc[val].sort((a, b) => parseInt(a) - parseInt(b));
    }
    return acc;
  }, {} as { [key: string]: string[] });
  const allIds = questions.map(({ id }) => id);
  return {
    props: {
      questions,
      categoriesWithIndexes,
      question,
      MAX_QUESTION_NUMBER: questions.length,
      questionIDs: allIds.sort((firstEl, secondEl) => parseInt(firstEl) - parseInt(secondEl)),
    },
    revalidate: 14400,
  };
};

export default Frage;

import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirestore } from '../../utils/get-firestore';
import { doc, setDoc } from 'firebase/firestore/lite';

type Data = {
  id: number;
  answers: string[];
};

export default async function saveResponses(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const db = await initializeFirestore();
  if (req.method === 'POST') {
    try {
      await setDoc(doc(db, 'responses', `/${req.body.uniqueId}/`), {
        id: req.body.uniqueId,
        answers: req.body.answers,
      });
      return res.status(200).send({ id: req.body.uniqueId, answers: req.body.answers });
    } catch (error) {
      return res.status(500).send(error as Error);
    }
  } else {
    return res.status(405);
  }
}

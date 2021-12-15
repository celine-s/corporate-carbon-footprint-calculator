import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirestore } from '../../utils/get-firestore';
import { doc, setDoc } from 'firebase/firestore/lite';

type Data = {
  id: number;
  answers: string[];
};

export default async function saveResponses(req: NextApiRequest, res: NextApiResponse<Data>) {
  const db = await initializeFirestore();

  if (req.method === 'GET') {
    res.status(200).json({ id: Date.now(), answers: ['23', 'get responses was called'] });
    console.log('get responses was called');
  } else if (req.method === 'POST') {
    try {
      await setDoc(doc(db, 'responses', '/' + req.body.id + '/'), { id: req.body.id, answers: req.body.answers });
      return res.status(200).send({ id: req.body.id, answers: req.body.answers });
    } catch (error) {
      console.log(error);
      //return res.status(500).send(error);
    }
  } else {
    // Handle any other HTTP method
  }
}

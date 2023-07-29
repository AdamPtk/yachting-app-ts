import { NextApiRequest, NextApiResponse } from 'next';
import createUser from 'services/users/create';

interface CustomError extends Error {
  message: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      try {
        const payload = req.body;
        const user = await createUser(payload);

        res.status(200).json({ status: 'created', user });
      } catch (error) {
        const customError = error as CustomError;
        res
          .status(422)
          .json({ status: 'not_created', error: customError.message });
      }
      break;
    }
    default:
      res.status(400);
  }
};

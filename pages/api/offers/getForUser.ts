import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import getForUser from 'services/offers/getForUser';
import paginateOffers from 'services/offers/paginate';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'not_authorized' });
  }

  switch (req.method) {
    case 'GET': {
      const offers = await getForUser(session.user.email);
      res.status(200).json(offers);

      break;
    }
    default:
      res.status(400);
  }
};

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import toggleActive from 'services/offers/toggleActive';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }
        if (session.user.role !== 'admin') {
          return res.status(401).json({ error: 'not_authorized' });
        }
        const { id } = req.query;

        const offer = await toggleActive(String(id));

        res.status(200).json({ status: 'updated', offer });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
    }

    default:
      res.status(400);
  }
};

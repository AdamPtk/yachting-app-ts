import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import getOfferById from 'services/offers/get';
import isAuthorized from 'services/offers/isAuthorized';
import deleteOffer from 'services/offers/delete';
import updateOffer from 'services/offers/update';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const offer = await getOfferById(req.query.id as string);

  if (!offer || !isAuthorized(offer, session)) {
    return res.status(401).json({ error: 'not_authorized' });
  }

  switch (req.method) {
    case 'DELETE': {
      try {
        const deletedOffer = await deleteOffer(offer.airtableId);
        res.status(200).json({ status: 'deleted', deletedOffer });
      } catch (error) {
        res.status(422).json({ status: 'not_deleted', error });
      }
      break;
    }
    case 'PUT': {
      try {
        const payload = req.body;
        const updatedOffer = await updateOffer(offer.airtableId, payload);
        res.status(200).json({ status: 'updated', updatedOffer });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }
    default:
      res.status(400);
  }
};

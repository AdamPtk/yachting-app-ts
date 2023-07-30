import { NextApiRequest, NextApiResponse } from 'next';
import finalizeCheckout from 'services/checkout/finalize';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const { checkout, offer } = await finalizeCheckout(
          String(req.query.id),
        );

        res.status(200).json({ checkout, offer });
      } catch (error) {
        res.status(422).json({ checkout: null, offer: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

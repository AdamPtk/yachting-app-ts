import { NextApiRequest, NextApiResponse } from 'next';
import paginateOffers from 'services/offers/allForAdmin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const { offset } = req.query;
      const offers = await paginateOffers<PaginatedOffers>(offset as string);

      res.status(200).json({
        offers: offers.records.map((offer) => offer.fields),
        offset: offers.offset,
      });

      break;
    }
    default:
      res.status(400);
  }
};

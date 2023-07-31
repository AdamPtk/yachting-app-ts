import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  //   apiVersion: '2022-11-15',
  // });

  try {
    console.log('req.body', req.body);
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
  }
};

import Stripe from 'stripe';

export const getCheckout = async (stripeCheckoutId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });
  const session = await stripe.checkout.sessions.retrieve(stripeCheckoutId);
  return session;
};

export default getCheckout;

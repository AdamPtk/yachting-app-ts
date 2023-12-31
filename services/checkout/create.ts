import Stripe from 'stripe';
import getOfferById from 'services/offers/get';
import getProduct from 'services/products/get';
import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  id: Joi.required(),
  offerId: Joi.number().greater(0).required(),
  quantity: Joi.number().greater(0).required(),
});

export const createCheckout = async (payload: ProductPaylaod) => {
  const orderItem = await schema.validateAsync(payload);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });
  const product = await getProduct(orderItem.id);
  const lineItems = product && [
    {
      price_data: {
        currency: product.priceCurrency,
        product_data: {
          name: product.name,
          metadata: {
            productId: product.id,
            duration: product.duration,
          },
        },
        unit_amount: product.priceCents,
      },
      quantity: orderItem.quantity,
    },
  ];

  const paymentObject = {
    payment_method_types: ['card', 'p24'],
    payment_intent_data: {
      metadata: {
        offerId: orderItem.offerId,
      },
    },
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offers/${orderItem.offerId}/paymentStatus`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offers/${orderItem.offerId}/paymentStatus`,
  };

  const session = await stripe.checkout.sessions.create(
    paymentObject as Stripe.Checkout.SessionCreateParams,
  );
  const offer = await getOfferById(orderItem.offerId);

  if (offer && product) {
    await airDB('offers').update([
      {
        id: offer.airtableId,
        fields: {
          stripeCheckoutId: session.id,
          stripeCheckoutStatus: session.payment_status,
          highlightDuration: product.duration,
        },
      },
    ]);
  }

  return session;
};

export default createCheckout;

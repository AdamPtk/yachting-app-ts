export {};

declare global {
  interface LoginPayload {
    email: string;
    password: string;
  }

  interface RegisterPayload extends LoginPayload {
    fullName: string;
  }

  interface OfferPayload {
    title: string;
    category: string;
    mobile: string;
    price: number;
    description: string;
    location: string;
  }

  interface ProductPaylaod {
    id: string;
    offerId: number;
    quantity: number;
  }

  interface Offer {
    id: number;
    airtableId: string;
    stripeCheckoutId: string;
    stripeCheckoutStatus?: string;
    title: string;
    status: string;
    mobile: string;
    price: number;
    description: string;
    category: string;
    users: string[];
    location: string;
    createdAt: string;
    updatedAt: string;
    'email (from users)': string[];
  }

  interface Product {
    id: string;
    name: string;
    duration: number;
    priceCents: number;
    priceCurrency: string;
  }

  interface Record {
    id: string;
    createdTime: string;
    fields: Offer;
  }

  interface PaginatedOffers {
    records: Record[];
    offset?: string;
  }

  interface PaginatedOffersProps {
    offers: Offer[];
    offset?: string;
  }
}

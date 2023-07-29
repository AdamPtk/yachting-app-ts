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
  interface Offer {
    airtableId: string;
    title: string;
    status: string;
    id: number;
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

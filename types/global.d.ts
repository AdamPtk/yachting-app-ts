export {};

declare global {
  interface Offer {
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
    email: string[];
  }
}

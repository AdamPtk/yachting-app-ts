import { Session } from 'next-auth';

const isAuthorized = (offer: Offer, session: Session | null) => {
  if (!session) return false;
  if (session.user.role === 'admin') return true;
  if (offer.users[0] === session.user.id) return true;

  return false;
};

export default isAuthorized;

import { Records } from 'airtable';
import airDB from 'services/airtableClient';

const getForUser = async (email: string) => {
  const offers = await airDB('offers')
    .select({
      sort: [{ field: 'id', direction: 'desc' }],
      filterByFormula: `users="${email}"`,
    })
    .firstPage();

  return offers.map((offer) => offer.fields);
};

export default getForUser;
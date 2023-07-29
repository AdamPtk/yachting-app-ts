import airDB from 'services/airtableClient';

const get = async (id: string) => {
  const offers = await airDB('offers')
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (offers && offers[0]) {
    return { airtableId: offers[0].id, ...offers[0].fields } as Offer;
  }
};

export default get;

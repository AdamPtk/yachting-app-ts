import airDB from 'services/airtableClient';

const get = async (airtableId: string) => {
  const product = await airDB('products').find(airtableId);

  if (product && product.fields) {
    return { id: product.id, ...product.fields } as Product;
  }

  return null;
};

export default get;

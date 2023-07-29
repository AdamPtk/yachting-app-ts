const paginate = async <TData>(
  offset: string = '',
  category: string = '',
): Promise<TData> => {
  let apiUrl = `https://api.airtable.com/v0/${
    process.env.AIRTABLE_BASE
  }/offers?pageSize=12&${encodeURI('sort[0][field]=id')}&${encodeURI(
    'sort[0][direction]=desc',
  )}&view=onlyActive`;

  if (offset) {
    apiUrl += `&offset=${offset}`;
  }
  if (category) {
    apiUrl += '&' + encodeURI(`filterByFormula=(category="${category}")`);
  }

  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
  });

  const records = await response.json();

  return records;
};

export default paginate;

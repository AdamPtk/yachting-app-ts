// import type { ReactElement } from 'react';
// import BaseLayout from 'components/BaseLayout';
// import NestedLayout from '../components/nested-layout';
// import type { NextPageWithLayout } from './_app';

// const Page: NextPageWithLayout = () => {
//   return <p>hello world</p>;
// };

// Page.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <BaseLayout>
//       <NestedLayout>{page}</NestedLayout>
//     </BaseLayout>
//   );
// };

// export default Page;

import BaseLayout from 'components/BaseLayout';
import Link from 'next/link';
import Image from 'next/image';
// import useSWR from 'swr';
// import getRecentOffers from 'services/offers/getRecent';
// import { jsonFetcher } from 'utils';

// export const getStaticProps = async () => {
//   const offers = await getRecentOffers(12);
//   return {
//     props: { offers }
//   };
// };

export default function Home() {
  // const { data } = useSWR('/api/offers', jsonFetcher, { initialData: offers });
  const data = [
    {
      title: 'Qwerty',
      status: 'active',
      id: 29,
      mobile: '111111111',
      price: 9.99,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam officiis optio illum voluptatum adipisci exercitationem, error temporibus corporis cum assumenda eaque quod debitis porro alias quisquam repudiandae architecto voluptatem voluptatibus sequi quos ex deserunt. Harum id deserunt sint reiciendis magni, hic dicta eveniet quisquam doloremque consequuntur labore sed praesentium ea!\n',
      category: 'rent',
      users: ['recqLMg1HI27TKqrK'],
      location: 'Qwerty',
      createdAt: '2023-07-25T15:51:35.000Z',
      updatedAt: '2023-07-25T17:25:13.000Z',
      email: ['abc@xyz.com'],
    },
  ];
  return (
    <BaseLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Best Private Yacht Rentals
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Pick your favorite provider and search for all types of boat
              rentals near you, including sailing boats, motorboats, and luxury
              yachts.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {data.map((offer) => (
              <div
                key={offer.id}
                className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer"
              >
                <Link href={`/offers/${offer.id}`}>
                  <div className="bg-gray-100 p-6 rounded-lg h-full hover:shadow-lg transition-all">
                    <Image
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src="/boat.jpg"
                      width={720}
                      height={400}
                      alt="content"
                    />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {offer.category}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {offer.title}
                    </h2>
                    <p className="leading-relaxed text-base">
                      {offer.description.length > 100
                        ? offer.description.substring(0, 100) + '...'
                        : offer.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

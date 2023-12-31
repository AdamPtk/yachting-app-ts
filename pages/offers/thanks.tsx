import BaseLayout from 'components/BaseLayout';
import Link from 'next/link';

export default function OfferThanks() {
  return (
    <BaseLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              Thanks for submitting new offer. <br />
              Upon positive verification it will show in our listing.
            </h1>
            <Link href="/offers/my">
              <button className="btn-primary">Go to your offers</button>
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

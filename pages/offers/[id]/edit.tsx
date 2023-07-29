import { FormEvent, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import getOffer from 'services/offers/get';
import isAuthorized from 'services/offers/isAuthorized';
import BaseLayout from 'components/BaseLayout';
import Loader from 'components/Loader';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);
  const offer = await getOffer(query.id as string);

  if (!offer || !isAuthorized(offer, session)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { offer },
  };
};

const OfferEdit: React.FC<{ offer: Offer }> = ({ offer }) => {
  const [formProcessing, setFormProcessing] = useState(false);
  const [error, setError] = useState(false);
  const offerForm = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (!session && !loading) {
      router.push('/user/signin');
    }
  }, [session, loading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;

    setError(false);
    setFormProcessing(true);

    const form = new FormData(offerForm.current || undefined);
    const payload = {
      title: form.get('title'),
      category: form.get('category'),
      mobile: form.get('phone'),
      price: form.get('price'),
      description: form.get('description'),
      location: form.get('location'),
    };

    const response = await fetch(`/api/offers/${offer.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push(`/offers/${offer.id}`);
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error?.details[0]?.message);
    }
  };

  return (
    <BaseLayout>
      {loading ? (
        <Loader />
      ) : (
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Edit offer
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify.
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <form
                className="flex flex-wrap -m-2"
                ref={offerForm}
                onSubmit={handleSubmit}
              >
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="category"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      defaultValue={offer.category}
                      className="h-10 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                      <option value="rent">For rent</option>
                      <option value="sale">For sale</option>
                    </select>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="title"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={offer.title}
                      required
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="location"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      defaultValue={offer.location}
                      required
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="price"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Price (PLN)
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      defaultValue={offer.price}
                      required
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mobile phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      defaultValue={offer.mobile}
                      required
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      defaultValue={offer.description}
                      required
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full flex justify-center">
                  <button
                    disabled={formProcessing}
                    className="btn-primary mt-8 mr-6"
                  >
                    {formProcessing ? 'Please wait...' : 'Edit offer'}
                  </button>
                  <Link
                    href={`/offers/${offer.id}`}
                    className="btn-primary mt-8"
                  >
                    Go back
                  </Link>
                </div>
                {error && (
                  <div className="p-2 w-full">
                    <div className="flex justify-center w-full my-5">
                      <span className="w-full text-red-600">
                        Offer not edited: {error}
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}
    </BaseLayout>
  );
};

export default OfferEdit;

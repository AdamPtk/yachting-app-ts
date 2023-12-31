import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from 'components/BaseLayout';
import { signIn } from 'next-auth/react';

export default function UserNew() {
  const [formProcessing, setFormProcessing] = useState(false);
  const [error, setError] = useState('');
  const userForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formProcessing) return;

    setError('');
    setFormProcessing(true);

    const form = new FormData(userForm.current || undefined);
    const payload = {
      email: form.get('email'),
      fullName: form.get('fullName'),
      password: form.get('password'),
    };

    if (payload.password !== form.get('passwordConfirm')) {
      setError('Given passwords not match');
      setFormProcessing(false);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.get('email'),
        password: form.get('password'),
      });

      if (res && res.ok) {
        router.push('/offers');
      } else {
        router.push('/');
      }
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };

  return (
    <BaseLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Create new account
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              In order to place new offers please sign up.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form
              className="flex flex-wrap -m-2"
              ref={userForm}
              onSubmit={handleSubmit}
            >
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="fullName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="passwordConfirm"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password confirm
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full flex">
                <button
                  disabled={formProcessing}
                  className="btn-primary mx-auto my-8"
                >
                  {formProcessing ? 'Please wait...' : 'Create new account'}
                </button>
                {error && (
                  <div className="flex justify-center w-full my-5">
                    <span className="w-full text-red-600">
                      Account not created: {error}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}

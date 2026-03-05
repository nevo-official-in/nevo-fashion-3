import React from 'react';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 selection:bg-red-600 selection:text-white">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-md mx-auto">

          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em]">
              My Account
            </h1>
          </div>

          <div className="border-b border-white/10 pb-12 mb-12">
            <h2 className="font-sans text-xl uppercase tracking-[0.2em] mb-6">
              Sign In
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest mb-2 text-white/60" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-transparent border border-white/20 focus:outline-none focus:border-red-600 transition-colors duration-300"
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest mb-2 text-white/60" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 bg-transparent border border-white/20 focus:outline-none focus:border-red-600 transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-all duration-300"
              >
                Sign In
              </button>
              <div className="text-center mt-4">
                <Link to="/account/forgot-password"
                  className="text-xs uppercase tracking-widest text-white/60 hover:text-white">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-sans text-xl uppercase tracking-[0.2em] mb-6">
              New Customers
            </h2>
            <p className="text-sm mb-6 text-white/80 leading-relaxed">
              Creating an account is easy. Enter your email address to begin and enjoy a more personalized shopping experience, including order history, saved addresses, and faster checkout.
            </p>
            <Link
              to="/account/register"
              className="w-full block text-center bg-transparent border border-white/20 text-white py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountPage;

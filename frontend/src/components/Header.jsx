import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, Search } from 'lucide-react';

export const Header = ({ onMenuOpen, onCartOpen }) => {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>

      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-between px-6 py-5">
        {/* Hamburger — Luxury Lines */}
        <button
          onClick={onMenuOpen}
          className="flex flex-col gap-[5px] group"
        >
          <span className="block w-6 h-[1px] bg-white group-hover:w-4 transition-all duration-300" />
          <span className="block w-4 h-[1px] bg-white group-hover:w-6 transition-all duration-300" />
          <span className="block w-5 h-[1px] bg-white group-hover:w-5 transition-all duration-300" />
        </button>

        <Link to="/">
          <h1 style={{fontFamily: "'Cormorant Garamond', serif"}}
            className="text-2xl font-light tracking-[0.3em] uppercase text-white">
            NEVO
          </h1>
        </Link>

        <button onClick={onCartOpen} className="relative text-white hover:text-red-600 transition-colors">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between px-12 py-6">
        <nav className="flex items-center gap-8">
          {[
            { to: '/featured', label: 'Featured' },
            { to: '/collection', label: 'Collections' },
            { to: '/journal', label: 'Journal' },
            { to: '/about', label: 'About' },
          ].map(item => (
            <Link key={item.to} to={item.to}
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 style={{fontFamily: "'Cormorant Garamond', serif"}}
            className="text-2xl font-light tracking-[0.3em] uppercase text-white hover:text-red-600 transition-colors">
            N E V O
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <button className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Search
          </button>
          <Link to="/account" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Account
          </Link>
          <button onClick={onCartOpen}
            className="relative text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors flex items-center gap-2">
            Bag
            {itemCount > 0 && (
              <span className="bg-red-600 text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
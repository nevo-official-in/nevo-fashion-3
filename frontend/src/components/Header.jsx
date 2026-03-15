import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

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
      scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>

      {/* ===== MOBILE HEADER ===== */}
      <div className="flex md:hidden items-center justify-between px-5 py-5">
        
        {/* Hamburger — Animated Lines */}
        <button
          onClick={onMenuOpen}
          className="flex flex-col gap-[5px] group p-1"
        >
          <span className="block w-6 h-[1px] bg-white group-hover:w-4 transition-all duration-300" />
          <span className="block w-4 h-[1px] bg-white group-hover:w-6 transition-all duration-300" />
          <span className="block w-5 h-[1px] bg-white group-hover:w-5 transition-all duration-300" />
        </button>

        {/* Center Logo */}
        <Link to="/">
          <h1
            style={{fontFamily: "'Cormorant Garamond', serif"}}
            className="text-xl font-light tracking-[0.4em] uppercase text-white"
          >
            NEVO
          </h1>
        </Link>

        {/* Cart */}
        <button
          onClick={onCartOpen}
          className="relative text-white hover:text-red-600 transition-colors p-1"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* ===== DESKTOP HEADER ===== */}
      <div className="hidden md:grid md:grid-cols-3 items-center px-12 py-6">

        {/* Left Nav */}
        <nav className="flex items-center gap-8">
          {[
            { to: '/featured', label: 'Featured' },
            { to: '/collection', label: 'Collections' },
            { to: '/journal', label: 'Journal' },
            { to: '/about', label: 'About' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors relative group"
            >
              {item.label}
              {/* Underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <Link to="/" className="flex justify-center">
          <h1
            style={{fontFamily: "'Cormorant Garamond', serif"}}
            className="text-2xl font-light tracking-[0.4em] uppercase text-white hover:text-red-600 transition-colors"
          >
            N E V O
          </h1>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center justify-end gap-8">
          <button className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors relative group">
            Search
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
          </button>
          <Link
            to="/account"
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors relative group"
          >
            Account
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <button
            onClick={onCartOpen}
            className="relative text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
          >
            Bag
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
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
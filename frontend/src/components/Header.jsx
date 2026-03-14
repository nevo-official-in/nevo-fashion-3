import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';

export const Header = ({ isMenuOpen, onMenuOpen, onCartOpen }) => {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      
      {/* MOBILE HEADER */}
      <div className="flex md:hidden items-center justify-between px-6 py-6">
        <button onClick={onMenuOpen} className="text-white hover:text-red-600 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/">
          <h1 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-white hover:text-red-600 transition-colors">
            NEVO
          </h1>
        </Link>
        <button onClick={onCartOpen} className="relative text-white hover:text-red-600 transition-colors">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden md:flex items-center justify-between px-12 py-6">
        
        {/* Left Nav */}
        <nav className="flex items-center gap-8">
          <Link to="/featured" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Contact
          </Link>
          <Link to="/collection" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Collections
          </Link>
          <Link to="/journal" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Journal
          </Link>
          <Link to="/about" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            About
          </Link>
        </nav>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-serif font-bold tracking-[0.3em] uppercase text-white hover:text-red-600 transition-colors">
            N E V O
          </h1>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Search
          </button>
          <Link to="/account" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors">
            Account
          </Link>
          <button onClick={onCartOpen} className="relative text-[11px] font-mono uppercase tracking-[0.2em] text-white hover:text-red-600 transition-colors flex items-center gap-2">
            Bag
            {itemCount > 0 && (
              <span className="bg-red-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
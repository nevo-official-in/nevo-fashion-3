import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../store';

export const Header = ({ onMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { path: '/featured', label: 'Featured' },
    { path: '/collections', label: 'Collections' },
    { path: '/journal', label: 'Journal' },
    { path: '/about', label: 'About' },
  ];

  const linkStyle = "font-sans text-[10px] uppercase tracking-[0.3em] text-white hover:opacity-50 transition-all duration-500";

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'h-14 bg-black/40 backdrop-blur-md border-b border-white/5' 
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="w-full h-full px-6 md:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden flex-1 flex items-center justify-start">
          <button onClick={onMenuOpen} className="text-white p-2">
            <Menu size={20} />
          </button>
        </div>

        {/* Desktop Links (Left) */}
        <div className="hidden md:flex flex-1 items-center">
          <nav className="flex items-center gap-8 lg:gap-12">
            {leftLinks.map(link => (
              <Link key={link.label} to={link.path} className={linkStyle}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="font-serif text-lg md:text-xl font-bold tracking-[0.6em] text-white uppercase">
            NEVO
          </Link>
        </div>

        {/* Right-side Icons */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-8 lg:gap-12">
          {/* Desktop Links */}
          <Link to="/search" className="text-white hidden md:block">
             <span className={linkStyle}>Search</span>
          </Link>
          <Link to="/account" className="text-white hidden md:block">
            <span className={linkStyle}>Account</span>
          </Link>
          <button onClick={openCart} className="text-white hidden md:block">
             <span className={linkStyle}>Bag</span>
          </button>

          {/* Mobile Icons */}
          <Link to="/search" className="text-white md:hidden p-2">
            <Search size={18} />
          </Link>
          <Link to="/account" className="text-white md:hidden p-2">
            <User size={18} />
          </Link>
          <button onClick={openCart} className="text-white md:hidden p-2">
            <ShoppingBag size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};
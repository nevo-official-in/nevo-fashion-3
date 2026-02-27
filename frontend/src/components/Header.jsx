import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';

export const Header = ({ isMenuOpen, onMenuOpen, onCartOpen }) => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 100px scroll hone ke baad blur activate
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-black/50 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent backdrop-blur-0'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        
        {/* Left - Menu + Search */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuOpen}
            className={`transition-colors hover:text-red-600 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button 
            className={`hidden md:block transition-colors hover:text-red-600 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center - Logo */}
        <Link to="/" className="flex-1 flex justify-center">
          <h1 
            className={`text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] uppercase transition-colors hover:text-red-600 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            NEVO
          </h1>
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className={`hidden md:block transition-colors hover:text-red-600 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            <User className="w-5 h-5" />
          </button>

          <button 
            onClick={onCartOpen}
            className={`relative transition-colors hover:text-red-600 ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
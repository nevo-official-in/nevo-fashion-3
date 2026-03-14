import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { MenuDrawer } from './components/MenuDrawer';
import { CartSidebar } from './components/CartSidebar';
import { PageTransition } from './components/PageTransition';
import { HomePage } from './page/HomePage';
import { Collection } from './page/Collection';
import { ProductDetail } from './page/ProductDetail';
import { About } from './page/About';
import { Contact } from './page/Contact';
import { Checkout } from './page/Checkout';
import { Privacy } from './page/Privacy';
import { Terms } from './page/Terms';
import { Journal } from './page/JournalPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Header 
        isMenuOpen={isMenuOpen} 
        onMenuOpen={() => setIsMenuOpen(true)} 
        onCartOpen={() => setIsCartOpen(true)} 
      />
      
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
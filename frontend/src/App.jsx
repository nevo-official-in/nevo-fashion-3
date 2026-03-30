import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { MenuDrawer } from './components/MenuDrawer';
import { CartSidebar } from './components/CartSidebar';
import { PageTransition } from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import { HomePage } from './page/HomePage';
import { Collection } from './page/Collection';
import { ProductDetail } from './page/ProductDetail';
import { About } from './page/About';
import { Contact } from './page/Contact';
import { Checkout } from './page/Checkout';
import { Journal } from './page/JournalPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '64px',
          fontWeight: 300,
          fontStyle: 'italic',
          letterSpacing: '0.2em',
          color: '#fff',
          margin: 0,
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          NEVO
        </h1>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#000', overflowX: 'hidden' }}>
        <Header
          onMenuOpen={() => setIsMenuOpen(true)}
          onCartOpen={() => setIsCartOpen(true)}
          isMenuOpen={isMenuOpen}
        />
        <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main style={{ position: 'relative', width: '100%' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
              <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
              <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        <ScrollToTop />

        <footer style={{
          padding: '48px 32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            opacity: 0.4,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            color: '#fff',
          }}>
            Nevo Artifacts v1.0 © 2026
          </span>
          <div style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            boxShadow: '0 0 8px #dc2626',
          }} />
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

export const MenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Home', number: '01' },
    { path: '/collection', label: 'Shop Archive', number: '02' },
    { path: '/journal', label: 'Void Journal', number: '03' },
    { path: '/about', label: 'VOID CORE // OUR ETHOS', number: '04' },
    { path: '/contact', label: 'Contact // CONNECT', number: '05' },
  ];

  const secondaryMenu = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
  ];

  const socialLinks = [
    { label: 'Instagram', path: 'https://instagram.com' },
    { label: 'Discord', path: 'https://discord.com' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 9998,
            }}
          />

          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              height: '100vh',
              backgroundColor: '#000000',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              overflow: 'hidden',
            }}
          >
            {/* Header Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
              <motion.button 
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} strokeWidth={1} />
              </motion.button>
            </div>

            {/* Main Navigation (Line by Line) */}
            <nav style={{ flex: 1, maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {menuItems.map((item, idx) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '15px 0',
                      textDecoration: 'none',
                      color: 'white',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <span style={{ fontSize: '10px', color: '#dc2626', width: '30px', fontFamily: 'monospace' }}>{item.number}</span>
                    <span style={{ fontFamily: "serif", fontSize: '1.1rem', letterSpacing: '0.2em', textTransform: 'uppercase', flex: 1 }}>{item.label}</span>
                    <ChevronRight size={14} style={{ opacity: 0.3 }} />
                  </Link>
                ))}
              </div>

              {/* Secondary Links (Line by Line Section) */}
              <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em', marginBottom: '5px' }}>SYSTEM LINKS</p>
                {secondaryMenu.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={onClose}
                    style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Socials - Fixed at the bottom of the list */}
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.path}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '11px', color: 'white', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.8 }}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* Footer Archive Note */}
            <div style={{ padding: '20px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
               <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5em' }}>
                EST. // NEVO ARCHIVE // 2026
              </span>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
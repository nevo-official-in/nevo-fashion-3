import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const MenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Home', number: '01' },
    { path: '/collection', label: 'Shop', number: '02' },
    { path: '/about', label: 'About', number: '03' },
    { path: '/journal', label: 'Journal', number: '04' },
    { path: '/contact', label: 'Contact', number: '05' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full w-[75%] md:w-[400px] bg-zinc-950 z-[60] border-r border-white/10"
          >
            <div className="flex flex-col h-full p-6 md:p-8">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50">Navigation</span>
                <button 
                  onClick={onClose}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="group flex items-center gap-4 py-6 px-4 -mx-4 hover:bg-white/5 transition-all duration-300 rounded-sm"
                  >
                    <span className="text-[10px] font-mono opacity-30 group-hover:opacity-100 group-hover:text-red-600 transition-all">
                      {item.number}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-red-600 group-hover:tracking-[0.1em] transition-all duration-300">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest opacity-40">
                  <span>© 2026 NEVO</span>
                  <span>SYSTEM_ONLINE</span>
                </div>
                
                <div className="flex gap-4 text-[10px] uppercase tracking-widest opacity-50">
                  <a href="#" className="hover:text-red-600 transition-colors">Instagram</a>
                  <span className="opacity-30">/</span>
                  <a href="#" className="hover:text-red-600 transition-colors">Discord</a>
                  <span className="opacity-30">/</span>
                  <a href="#" className="hover:text-red-600 transition-colors">Twitter</a>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
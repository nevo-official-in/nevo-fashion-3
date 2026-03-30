import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

export const CartSidebar = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Smooth Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[190]"
          />

          {/* Cart Panel - Slide from TOP */}
          <motion.div
            initial={{ y: '-100%' }} // Upar chhupa hua
            animate={{ y: 0 }}       // Niche slide hoga
            exit={{ y: '-100%' }}    // Wapas upar jayega
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 h-[85vh] bg-zinc-950 z-[200] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col h-full max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/5">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40 block">Shopping</span>
                  <h2 style={{fontFamily: "'Cormorant Garamond', serif"}}
                    className="text-3xl font-light uppercase tracking-[0.2em] mt-1">
                    System Cart
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={1} />
                </button>
              </div>

              {/* Cart Items Area */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-6">
                    <div className="w-24 h-24 border border-white/5 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 border border-white/20 rounded-full animate-ping absolute" />
                      <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40">
                        Scanning Archive...
                      </p>
                      <p className="text-xs opacity-20">Memory Cache Empty</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-6 pb-6 border-b border-white/5 group">
                        <div className="relative overflow-hidden w-24 h-32 bg-zinc-900">
                          <img
                            src={item.images?.[0] || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200'}
                            alt={item.name || item.product?.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                             <h3 className="text-sm font-mono uppercase tracking-widest">
                               {item.name || item.product?.name}
                             </h3>
                             <button
                                onClick={() => removeItem(item.id || item.product?.id, item.size)}
                                className="text-[9px] font-mono opacity-30 hover:text-red-600 transition-colors uppercase"
                              >
                                [ Delete ]
                              </button>
                          </div>
                          <p className="text-[10px] opacity-40 font-mono mt-1">Size: {item.size}</p>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => updateQuantity(item.id || item.product?.id, item.size, item.quantity - 1)}
                                className="opacity-40 hover:opacity-100 transition-opacity"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id || item.product?.id, item.size, item.quantity + 1)}
                                className="opacity-40 hover:opacity-100 transition-opacity"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-mono text-red-500">
                              ₹{(item.price || item.product?.price || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Section */}
              {items.length > 0 && (
                <div className="p-8 border-t border-white/5 bg-zinc-950">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl mx-auto">
                    <div className="flex gap-12">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase opacity-40 tracking-widest">Subtotal</span>
                        <span className="text-xl font-mono">
                          ₹{items.reduce((total, item) => total + ((item.price || item.product?.price || 0) * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase opacity-40 tracking-widest">Status</span>
                        <span className="text-[10px] font-mono uppercase text-green-500 tracking-tighter">Ready for Sync</span>
                      </div>
                    </div>

                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="bg-white text-black px-12 py-4 text-[11px] font-mono uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all duration-500 text-center"
                    >
                      Initialize Transfer
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
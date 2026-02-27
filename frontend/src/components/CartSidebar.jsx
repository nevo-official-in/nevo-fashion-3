import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

export const CartSidebar = ({ isOpen, onClose }) => {
  const { items, getTotal, removeItem, updateQuantity } = useCartStore();

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

          {/* Cart Panel - Compact Mobile, Premium Desktop */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[75%] md:w-[600px] bg-zinc-950 z-[60] border-l border-white/10"
          >
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50 block">Shopping</span>
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mt-1">System Cart</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors rounded-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 border border-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 md:w-12 md:h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                        Scanning Archive...
                      </p>
                      <p className="text-xs md:text-sm opacity-30">Empty Cache</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 md:gap-6 pb-6 md:pb-8 border-b border-white/5">
                        <img 
                          src={item.product.images?.[0] || 'https://via.placeholder.com/100'} 
                          alt={item.product.name}
                          className="w-20 h-24 md:w-28 md:h-36 object-cover grayscale border border-white/5"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold mb-2">{item.product.name}</h3>
                          <p className="text-[10px] opacity-50 mb-3">Size: {item.size}</p>
                          <p className="text-sm md:text-base font-bold mb-4">₹{item.product.price.toLocaleString()}</p>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs"
                            >
                              -
                            </button>
                            <span className="text-sm min-w-[30px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-[10px] opacity-40 hover:text-red-600 transition-colors uppercase tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Desktop Enhanced */}
              {items.length > 0 && (
                <div className="p-6 md:p-8 border-t border-white/5 space-y-4 md:space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Subtotal</span>
                      <span className="text-base md:text-lg font-bold">₹{getTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Shipping</span>
                      <span className="text-sm opacity-50">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Total Value</span>
                      <span className="text-lg md:text-xl font-bold text-red-600">₹{getTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-[8px] opacity-40 text-center">Shipping & taxes calculated at checkout</p>
                  
                  <Link 
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-white text-black text-center py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all"
                  >
                    Initialize Checkout
                  </Link>
                  
                  <p className="text-[8px] opacity-30 text-center flex items-center justify-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout Enabled
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
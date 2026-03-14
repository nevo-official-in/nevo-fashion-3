import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    openCart();
    toast.success(`${product.name} (${selectedSize}) x${quantity} added to bag!`);
    onClose();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    onClose();
    window.location.href = '/checkout';
  };

  // Simulate unavailable sizes (for demo - remove this in production)
  const unavailableSizes = ['XS', 'XXL'];
  
  const isSizeUnavailable = (size) => unavailableSizes.includes(size);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Grey instead of black */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-[70]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm pointer-events-auto">
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-black/10 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                
                {/* Left: Product Image - Grey Background */}
                <div className="aspect-[3/4] bg-neutral-100">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/600x800'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: Product Info */}
                <div className="p-10 md:p-16 flex flex-col">
                  
                  {/* Product Name */}
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-normal mb-4 text-black">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-10">
                    <span className="text-2xl font-bold text-red-600">
                      RS. {product.price?.toLocaleString()}.00
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg line-through text-neutral-400">
                        RS. {product.originalPrice.toLocaleString()}.00
                      </span>
                    )}
                  </div>

                  {/* Size Selector */}
                  <div className="mb-10">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-sm font-medium text-black">Size:</span>
                      <button className="text-sm underline text-black hover:text-red-600 transition-colors">
                        Size chart
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {product.sizes?.map((size) => {
                        const unavailable = isSizeUnavailable(size);
                        return (
                          <button
                            key={size}
                            onClick={() => !unavailable && setSelectedSize(size)}
                            disabled={unavailable}
                            className={`relative py-4 border text-sm font-medium transition-all ${
                              selectedSize === size
                                ? 'border-black bg-black text-white'
                                : unavailable
                                ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                                : 'border-neutral-300 hover:border-black text-black'
                            }`}
                          >
                            {size}
                            {unavailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-[1px] bg-neutral-400 rotate-45 transform" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-10">
                    <div className="flex items-center border border-neutral-300 w-fit">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-14 h-14 flex items-center justify-center hover:bg-neutral-100 transition-colors border-r border-neutral-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-14 text-center font-medium text-black">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-14 h-14 flex items-center justify-center hover:bg-neutral-100 transition-colors border-l border-neutral-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-5 bg-black text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors mb-4"
                  >
                    Add to Cart
                  </button>

                  {/* Buy It Now Button */}
                  <button 
                    onClick={handleBuyNow}
                    className="w-full py-5 bg-black text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors mb-8"
                  >
                    Buy It Now
                  </button>

                  {/* View Details Link */}
                  <div className="mt-auto pt-8 border-t border-neutral-200">
                    <a 
                      href={`/product/${product.id}`}
                      className="text-sm underline text-black hover:text-red-600 transition-colors"
                      onClick={onClose}
                    >
                      View details
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
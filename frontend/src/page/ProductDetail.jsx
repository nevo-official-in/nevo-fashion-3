import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { Heart, Share2, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';

// Dummy data - in a real app, this would come from an API
const ALL_PRODUCTS = [
  { id: 'nevo-cyber-tee-001', name: 'Cybernilism Hoodie', price: 2499, originalPrice: 3999, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 20, discount: 38, description: 'Premium quality hoodie with cybernilism aesthetic. Built for the streets, designed for the void.' },
  { id: 'nevo-shell-jacket-002', name: 'Tech Shell Jacket', price: 4999, originalPrice: 7999, category: 'OUTERWEAR', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800'], sizes: ['M','L','XL'], stock: 15, discount: 38, description: 'Technical shell jacket with water-resistant finish. Urban armor for modern warriors.' },
  { id: 'nevo-cargo-pant-003', name: 'Utility Cargo Pant', price: 3499, originalPrice: 5499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800'], sizes: ['28','30','32','34'], stock: 25, discount: 36, description: 'Utility cargo pants with multiple pockets. Function meets luxury.' },
  { id: 'nevo-item-004', name: 'System Cap', price: 1299, originalPrice: 1999, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800', 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800'], sizes: ['FREE'], stock: 50, discount: 35, description: 'Minimalist system cap. One size fits all voids.' },
  { id: 'nevo-bomber-005', name: 'Stealth Bomber Jacket', price: 5999, originalPrice: 8999, category: 'OUTERWEAR', images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800', 'https://images.unsplash.com/photo-1559582798-678dfc712ccd?q=80&w=800'], sizes: ['M','L','XL','XXL'], stock: 12, discount: 33, description: 'Stealth bomber with premium satin finish. Enter the void in style.' },
  { id: 'nevo-tee-006', name: 'Void Graphic Tee', price: 1799, originalPrice: 2499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 40, discount: 28, description: 'Graphic tee from the void collection. 100% premium cotton.' },
  { id: 'nevo-jeans-007', name: 'Distressed Denim', price: 3999, originalPrice: 5999, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800', 'https://images.unsplash.com/photo-1582552966370-980d13d31f62?q=80&w=800'], sizes: ['28','30','32','34','36'], stock: 18, discount: 33, description: 'Artfully distressed denim. Each pair is unique.' },
  { id: 'nevo-sneakers-008', name: 'Urban Runner Sneakers', price: 6999, originalPrice: 9999, category: 'FOOTWEAR', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800'], sizes: ['7','8','9','10','11'], stock: 22, discount: 30, description: 'Urban runner with cloud-like cushioning. Built for city exploration.' },
  { id: 'nevo-backpack-009', name: 'Tactical Backpack', price: 4499, originalPrice: 6499, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800'], sizes: ['ONE SIZE'], stock: 30, discount: 31, description: 'Tactical backpack with organized compartments. Carry the void with you.' },
  { id: 'nevo-sweater-010', name: 'Oversized Knit Sweater', price: 3799, originalPrice: 5499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 25, discount: 31, description: 'Oversized knit in premium wool blend. Warmth meets luxury.' },
  { id: 'nevo-shorts-011', name: 'Tech Cargo Shorts', price: 2299, originalPrice: 3299, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800', 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 35, discount: 30, description: 'Tech cargo shorts with utility pockets. Summer void edition.' },
  { id: 'nevo-watch-012', name: 'Minimalist Steel Watch', price: 8999, originalPrice: 12999, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800', 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800'], sizes: ['ONE SIZE'], stock: 15, discount: 31, description: 'Minimalist steel watch with sapphire crystal. Time is a luxury.' },
];

const MotionLink = motion(Link);

export const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const product = ALL_PRODUCTS.find(p =>
    p.id === id || p.id.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-mono text-red-500 tracking-widest">404</p>
          <h1 className="text-4xl md:text-5xl font-extralight uppercase tracking-wider mt-4">Product Not Found</h1>
          <MotionLink to="/collection"
            className="inline-block border border-white/30 px-10 py-4 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            Back to Collection
          </MotionLink>
        </motion.div>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart({ ...product }, selectedSize, quantity);
    openCart(); // In a real app, this would redirect to checkout
    toast.info('Proceeding to checkout...');
  }

  const accordionItems = [
    { title: 'Product Details', content: product.description },
    { title: 'Material & Care', content: '100% Premium Cotton. Machine wash cold, hang dry. Do not bleach.' },
    { title: 'Shipping & Returns', content: 'Free shipping on orders over ₹2000. Easy 7-day returns.' },
  ];

  return (
    <motion.div 
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white pt-28 pb-20 font-light">

      <div className="px-6 md:px-12 mb-8 max-w-7xl mx-auto">
        <nav className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-red-500 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-white/70">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-6 md:px-12 max-w-7xl mx-auto">

        <motion.div 
          className="space-y-4 sticky top-28 h-fit"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden shadow-2xl shadow-black/30">
            <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
            </AnimatePresence>
            {product.discount && (
              <motion.div 
                className="absolute top-4 left-4 bg-red-600 text-white text-xs font-mono px-3 py-1 tracking-wider"
                initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1, duration: 0.5}}>
                -{product.discount}%
              </motion.div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-24 overflow-hidden transition-all duration-300 ring-2 ${selectedImage === idx ? 'ring-red-500' : 'ring-transparent opacity-50 hover:opacity-100'}`}>
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          className="space-y-10 lg:pt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}>

          <div>
            <p className="text-sm font-mono text-red-500 tracking-[0.3em] uppercase mb-4">
              {product.category}
            </p>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-normal tracking-wide uppercase leading-tight">
                {product.name}
              </h1>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="mt-2 hover:text-red-500 transition-colors shrink-0">
                <Heart className={`w-6 h-6 transition-all ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white/50'}`} strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-mono text-red-500">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl line-through opacity-40 font-mono">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-mono uppercase tracking-[0.2em] opacity-60">Select Size</p>
              <Link to="/size-guide" className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition">Size Guide</Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 text-sm font-mono uppercase tracking-widest border transition-all duration-300 ${selectedSize === size ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/20 hover:border-white/70'}`}
                  whileTap={{ scale: 0.95 }}>
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm font-mono uppercase tracking-[0.2em] opacity-60">Quantity</p>
            <div className="flex items-center border border-white/20">
              <motion.button whileTap={{scale: 0.9}} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"><Minus className="w-4 h-4" /></motion.button>
              <span className="w-16 text-center text-lg font-mono">{quantity}</span>
              <motion.button whileTap={{scale: 0.9}} onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"><Plus className="w-4 h-4" /></motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <motion.button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`w-full py-5 text-sm font-mono uppercase tracking-[0.3em] transition-all duration-300 relative overflow-hidden ${selectedSize ? 'bg-black text-white border border-white/20' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}>
                 <AnimatePresence mode="wait">
                  <motion.span key={selectedSize ? 'buy' : 'select'} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} transition={{duration: 0.2}}>{selectedSize ? 'Buy It Now' : 'Select a Size'}</motion.span>
                </AnimatePresence>
            </motion.button>
          </div>

          <div className="space-y-2">
            {accordionItems.map((item, idx) => (
              <div key={idx} className="border-b border-white/10">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 hover:text-red-500 transition-colors">
                  <span className="text-sm font-mono uppercase tracking-widest">{item.title}</span>
                  <motion.div animate={{ rotate: activeAccordion === idx ? 180 : 0}} transition={{duration: 0.3}}><ChevronDown className="w-5 h-5 opacity-50" /></motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden">
                      <div className="pb-6 text-sm font-mono opacity-60 leading-relaxed tracking-wide">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

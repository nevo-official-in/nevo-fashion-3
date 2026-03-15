import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { Heart, Share2, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';

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

export const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Find product from dummy data
  const product = ALL_PRODUCTS.find(p =>
    p.id === id ||
    p.id.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div className="space-y-6">
          <p className="text-[9px] font-mono text-red-600 tracking-widest">404</p>
          <h2 style={{fontFamily: "'Cormorant Garamond', serif"}}
            className="text-4xl font-light uppercase">
            Product Not Found
          </h2>
          <Link to="/collection"
            className="inline-block border border-white/20 px-8 py-3 text-[10px] font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart({ ...product }, selectedSize, quantity);
    openCart();
    toast.success(`${product.name} added to bag!`);
  };

  const accordionItems = [
    { title: 'Product Details', content: product.description },
    { title: 'Material & Care', content: '100% Premium Cotton. Machine wash cold, hang dry. Do not bleach.' },
    { title: 'Shipping & Returns', content: 'Free shipping on orders over ₹2000. Easy 7-day returns.' },
    {
      title: 'Size Guide',
      content: (
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 font-mono">Size</th>
              <th className="text-left py-2 font-mono">Chest</th>
              <th className="text-left py-2 font-mono">Length</th>
            </tr>
          </thead>
          <tbody className="opacity-50">
            <tr><td className="py-2">S</td><td>104cm</td><td>68cm</td></tr>
            <tr><td className="py-2">M</td><td>108cm</td><td>70cm</td></tr>
            <tr><td className="py-2">L</td><td>112cm</td><td>72cm</td></tr>
            <tr><td className="py-2">XL</td><td>116cm</td><td>74cm</td></tr>
          </tbody>
        </table>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">

      {/* Breadcrumb */}
      <div className="px-6 md:px-12 mb-8 max-w-7xl mx-auto">
        <nav className="text-[9px] font-mono uppercase tracking-widest text-white/30 flex items-center gap-2">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-red-600 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 px-6 md:px-12 max-w-7xl mx-auto">

        {/* LEFT — Images */}
        <div className="space-y-3">
          {/* Main Image */}
          <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-mono px-3 py-1">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-24 overflow-hidden transition-all ${
                    selectedImage === idx ? 'ring-1 ring-red-600' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Info */}
        <div className="space-y-8 lg:sticky lg:top-32 h-fit">

          {/* Name + Wishlist */}
          <div>
            <p className="text-[9px] font-mono text-red-600 tracking-[0.4em] uppercase mb-3">
              {product.category}
            </p>
            <div className="flex items-start justify-between gap-4">
              <h1 style={{fontFamily: "'Cormorant Garamond', serif"}}
                className="text-4xl md:text-5xl font-light tracking-wide uppercase leading-tight">
                {product.name}
              </h1>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="mt-2 hover:text-red-600 transition-colors shrink-0"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-mono text-red-500">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through opacity-30 font-mono">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${
              product.stock > 10 ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-[9px] font-mono opacity-40 tracking-widest uppercase">
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] opacity-40">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                    selectedSize === size
                      ? 'border-red-600 text-red-600 bg-red-600/10'
                      : 'border-white/20 hover:border-white/60'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] opacity-40">Quantity</p>
            <div className="flex items-center border border-white/20 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-12 text-center text-sm font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-5 text-[11px] font-mono uppercase tracking-[0.3em] transition-all duration-300 ${
              selectedSize
                ? 'bg-white text-black hover:bg-red-600 hover:text-white'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {selectedSize ? 'Add to Bag' : 'Select a Size'}
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
            {[
              { icon: 'M5 13l4 4L19 7', label: 'Free Shipping' },
              { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', label: 'Easy Returns' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Pay' },
            ].map(badge => (
              <div key={badge.label} className="text-center space-y-2">
                <svg className="w-4 h-4 mx-auto opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                </svg>
                <p className="text-[8px] font-mono opacity-30 uppercase tracking-wider">{badge.label}</p>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-0">
            {accordionItems.map((item, idx) => (
              <div key={idx} className="border-b border-white/5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-4 hover:text-red-600 transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest">{item.title}</span>
                  {activeAccordion === idx
                    ? <ChevronUp className="w-4 h-4 opacity-40" />
                    : <ChevronDown className="w-4 h-4 opacity-40" />
                  }
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 text-[11px] font-mono opacity-40 leading-relaxed tracking-wide">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
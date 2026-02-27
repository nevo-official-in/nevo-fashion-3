import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { QuickViewModal } from '../components/QuickViewModal';

// Safe slug creator
const createSlug = (id) => {
  return id ? id.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product';
};

// 12 Premium Products
const DUMMY_ARTIFACTS = [
  { 
    id: 'nevo-cyber-tee-001', 
    name: 'Cybernilism Hoodie', 
    price: 2499, 
    originalPrice: 3999,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800',
    ], 
    sizes: ['S','M','L','XL'], 
    stock: 20,
    discount: 38
  },
  { 
    id: 'nevo-shell-jacket-002', 
    name: 'Tech Shell Jacket', 
    price: 4999, 
    originalPrice: 7999,
    category: 'OUTERWEAR', 
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800',
    ], 
    sizes: ['M','L','XL'], 
    stock: 15,
    discount: 38
  },
  { 
    id: 'nevo-cargo-pant-003', 
    name: 'Utility Cargo Pant', 
    price: 3499, 
    originalPrice: 5499,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800',
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
    ], 
    sizes: ['28','30','32','34'], 
    stock: 25,
    discount: 36
  },
  { 
    id: 'nevo-item-004', 
    name: 'System Cap', 
    price: 1299, 
    originalPrice: 1999,
    category: 'ACCESSORIES', 
    images: [
      'https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800',
    ], 
    sizes: ['FREE'], 
    stock: 50,
    discount: 35
  },
  { 
    id: 'nevo-bomber-005', 
    name: 'Stealth Bomber Jacket', 
    price: 5999, 
    originalPrice: 8999,
    category: 'OUTERWEAR', 
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800',
      'https://images.unsplash.com/photo-1559582798-678dfc712ccd?q=80&w=800',
    ], 
    sizes: ['M','L','XL','XXL'], 
    stock: 12,
    discount: 33
  },
  { 
    id: 'nevo-tee-006', 
    name: 'Void Graphic Tee', 
    price: 1799, 
    originalPrice: 2499,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800',
    ], 
    sizes: ['S','M','L','XL'], 
    stock: 40,
    discount: 28
  },
  { 
    id: 'nevo-jeans-007', 
    name: 'Distressed Denim', 
    price: 3999, 
    originalPrice: 5999,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800',
      'https://images.unsplash.com/photo-1582552966370-980d13d31f62?q=80&w=800',
    ], 
    sizes: ['28','30','32','34','36'], 
    stock: 18,
    discount: 33
  },
  { 
    id: 'nevo-sneakers-008', 
    name: 'Urban Runner Sneakers', 
    price: 6999, 
    originalPrice: 9999,
    category: 'FOOTWEAR', 
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
    ], 
    sizes: ['7','8','9','10','11'], 
    stock: 22,
    discount: 30
  },
  { 
    id: 'nevo-backpack-009', 
    name: 'Tactical Backpack', 
    price: 4499, 
    originalPrice: 6499,
    category: 'ACCESSORIES', 
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800',
    ], 
    sizes: ['ONE SIZE'], 
    stock: 30,
    discount: 31
  },
  { 
    id: 'nevo-sweater-010', 
    name: 'Oversized Knit Sweater', 
    price: 3799, 
    originalPrice: 5499,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    ], 
    sizes: ['S','M','L','XL'], 
    stock: 25,
    discount: 31
  },
  { 
    id: 'nevo-shorts-011', 
    name: 'Tech Cargo Shorts', 
    price: 2299, 
    originalPrice: 3299,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800',
    ], 
    sizes: ['S','M','L','XL'], 
    stock: 35,
    discount: 30
  },
  { 
    id: 'nevo-watch-012', 
    name: 'Minimalist Steel Watch', 
    price: 8999, 
    originalPrice: 12999,
    category: 'ACCESSORIES', 
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800',
    ], 
    sizes: ['ONE SIZE'], 
    stock: 15,
    discount: 31
  },
];

export const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    setProducts(DUMMY_ARTIFACTS);
    setLoading(false);
  }, []);

  const handleQuickAdd = (product) => {
    // Open Quick View Modal instead of directly adding
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white uppercase tracking-[0.5em] text-[10px]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Collection</h2>
          <p className="text-[10px] font-bold text-neutral-500 mt-2 uppercase tracking-[0.3em]">Archive v1.0 / 2026</p>
        </div>
        <div className="font-bold text-[10px] text-neutral-400 tracking-[0.2em]">
          {products.length} ITEMS
        </div>
      </div>
      
      {/* Products Grid - 4 Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => {
          const productSlug = createSlug(product.id);
          const isHovered = hoveredProduct === product.id;
          
          return (
            <div 
              key={product.id} 
              className="group relative flex flex-col"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Card */}
              <Link 
                to={`/product/${productSlug}`} 
                className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 mb-4"
              >
                {/* Image 1 - Default */}
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                  }`}
                />
                
                {/* Image 2 - Hover */}
                {product.images[1] && (
                  <img 
                    src={product.images[1]} 
                    alt={`${product.name} - angle 2`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  />
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase z-10">
                    -{product.discount}%
                  </div>
                )}

                {/* Stock Badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1 uppercase z-10">
                  {product.stock > 10 ? 'IN STOCK' : `${product.stock} LEFT`}
                </div>

                {/* Quick Add Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickAdd(product);
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600 hover:text-white z-10"
                >
                  Quick Add
                </button>
              </Link>
              
              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-tight">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] opacity-50 font-mono">{product.category}</p>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-[10px] line-through opacity-40">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-sm font-bold text-red-600">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-20 text-center">
        <button className="inline-block border border-white/20 px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Load More
        </button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
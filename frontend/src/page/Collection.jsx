import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QuickViewModal } from '../components/QuickViewModal';

const createSlug = (id) => id ? id.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product';

const DUMMY_ARTIFACTS = [
  { id: 'nevo-cyber-tee-001', name: 'Cybernilism Hoodie', price: 2499, originalPrice: 3999, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 20, discount: 38 },
  { id: 'nevo-shell-jacket-002', name: 'Tech Shell Jacket', price: 4999, originalPrice: 7999, category: 'OUTERWEAR', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800'], sizes: ['M','L','XL'], stock: 15, discount: 38 },
  { id: 'nevo-cargo-pant-003', name: 'Utility Cargo Pant', price: 3499, originalPrice: 5499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800'], sizes: ['28','30','32','34'], stock: 25, discount: 36 },
  { id: 'nevo-item-004', name: 'System Cap', price: 1299, originalPrice: 1999, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800', 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800'], sizes: ['FREE'], stock: 50, discount: 35 },
  { id: 'nevo-bomber-005', name: 'Stealth Bomber Jacket', price: 5999, originalPrice: 8999, category: 'OUTERWEAR', images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800', 'https://images.unsplash.com/photo-1559582798-678dfc712ccd?q=80&w=800'], sizes: ['M','L','XL','XXL'], stock: 12, discount: 33 },
  { id: 'nevo-tee-006', name: 'Void Graphic Tee', price: 1799, originalPrice: 2499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 40, discount: 28 },
  { id: 'nevo-jeans-007', name: 'Distressed Denim', price: 3999, originalPrice: 5999, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800', 'https://images.unsplash.com/photo-1582552966370-980d13d31f62?q=80&w=800'], sizes: ['28','30','32','34','36'], stock: 18, discount: 33 },
  { id: 'nevo-sneakers-008', name: 'Urban Runner Sneakers', price: 6999, originalPrice: 9999, category: 'FOOTWEAR', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800'], sizes: ['7','8','9','10','11'], stock: 22, discount: 30 },
  { id: 'nevo-backpack-009', name: 'Tactical Backpack', price: 4499, originalPrice: 6499, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800'], sizes: ['ONE SIZE'], stock: 30, discount: 31 },
  { id: 'nevo-sweater-010', name: 'Oversized Knit Sweater', price: 3799, originalPrice: 5499, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 25, discount: 31 },
  { id: 'nevo-shorts-011', name: 'Tech Cargo Shorts', price: 2299, originalPrice: 3299, category: 'APPAREL', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800', 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800'], sizes: ['S','M','L','XL'], stock: 35, discount: 30 },
  { id: 'nevo-watch-012', name: 'Minimalist Steel Watch', price: 8999, originalPrice: 12999, category: 'ACCESSORIES', images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800', 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800'], sizes: ['ONE SIZE'], stock: 15, discount: 31 },
];

const CATEGORIES = ['ALL', 'APPAREL', 'OUTERWEAR', 'ACCESSORIES', 'FOOTWEAR'];
const SORTS = ['NEWEST', 'PRICE: LOW', 'PRICE: HIGH', 'DISCOUNT'];

export const Collection = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSort, setActiveSort] = useState('NEWEST');

  const filtered = DUMMY_ARTIFACTS
    .filter(p => activeCategory === 'ALL' || p.category === activeCategory)
    .sort((a, b) => {
      if (activeSort === 'PRICE: LOW') return a.price - b.price;
      if (activeSort === 'PRICE: HIGH') return b.price - a.price;
      if (activeSort === 'DISCOUNT') return b.discount - a.discount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ===== PAGE HEADER ===== */}
      <div className="pt-32 pb-8 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-mono text-red-600 tracking-[0.5em] uppercase mb-3">
                Archive v1.0 — 2026
              </p>
              <h1
                style={{fontFamily: "'Cormorant Garamond', serif"}}
                className="text-5xl md:text-7xl font-light tracking-wide uppercase"
              >
                The Collection
              </h1>
            </div>
            <span className="text-[9px] font-mono opacity-30 tracking-widest">
              {filtered.length} PIECES
            </span>
          </div>

          {/* Mobile — Category Chips */}
          <div className="flex md:hidden gap-2 mt-6 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-[9px] font-mono uppercase tracking-widest px-4 py-2 border transition-all ${
                  activeCategory === cat
                    ? 'border-white text-white bg-white/10'
                    : 'border-white/20 text-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile — Sort Chips */}
          <div className="flex md:hidden gap-2 mt-2 overflow-x-auto pb-2">
            {SORTS.map(sort => (
              <button
                key={sort}
                onClick={() => setActiveSort(sort)}
                className={`shrink-0 text-[9px] font-mono uppercase tracking-widest px-4 py-2 border transition-all ${
                  activeSort === sort
                    ? 'border-red-600 text-red-600'
                    : 'border-white/10 text-white/30'
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-12">

          {/* ===== LEFT SIDEBAR — Desktop Only ===== */}
          <div className="hidden md:block w-48 shrink-0">
            <div className="sticky top-28 space-y-10">

              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-30 mb-4">Category</p>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`block text-left text-[10px] font-mono uppercase tracking-widest w-full transition-all ${
                        activeCategory === cat ? 'text-white' : 'text-white/30 hover:text-white/70'
                      }`}
                    >
                      {activeCategory === cat && <span className="text-red-600 mr-2">—</span>}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-30 mb-4">Sort By</p>
                <div className="space-y-2">
                  {SORTS.map(sort => (
                    <button
                      key={sort}
                      onClick={() => setActiveSort(sort)}
                      className={`block text-left text-[10px] font-mono uppercase tracking-widest w-full transition-all ${
                        activeSort === sort ? 'text-white' : 'text-white/30 hover:text-white/70'
                      }`}
                    >
                      {activeSort === sort && <span className="text-red-600 mr-2">—</span>}
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-30 mb-4">Price Range</p>
                <div className="space-y-2">
                  {['Under ₹2,000', '₹2,000 – ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000'].map(range => (
                    <button key={range}
                      className="block text-left text-[10px] font-mono tracking-wider text-white/30 hover:text-white/70 transition-all w-full">
                      {range}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ===== PRODUCTS GRID ===== */}
          <div className="flex-1">

            {/* Featured First Product */}
            {filtered.length > 0 && activeCategory === 'ALL' && activeSort === 'NEWEST' && (
              <div className="mb-6">
                <div
                  className="group relative w-full overflow-hidden bg-zinc-900 cursor-pointer"
                  style={{ height: '55vh' }}
                  onMouseEnter={() => setHoveredProduct('featured')}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link to={`/product/${createSlug(filtered[0].id)}`}>
                    <img
                      src={filtered[0].images[0]}
                      alt={filtered[0].name}
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        hoveredProduct === 'featured' ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                      }`}
                    />
                    <img
                      src={filtered[0].images[1]}
                      alt={filtered[0].name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        hoveredProduct === 'featured' ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-mono text-red-600 tracking-widest mb-1">FEATURED</p>
                        <h2 style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-3xl md:text-4xl font-light tracking-wide">
                          {filtered[0].name}
                        </h2>
                        <p className="text-[9px] font-mono opacity-40 mt-1">{filtered[0].category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] line-through opacity-30 font-mono">₹{filtered[0].originalPrice?.toLocaleString()}</p>
                        <p className="text-xl md:text-2xl font-mono text-red-500">₹{filtered[0].price.toLocaleString()}</p>
                      </div>
                    </div>
                    {filtered[0].discount && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-mono px-3 py-1">
                        -{filtered[0].discount}%
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={() => { setQuickViewProduct(filtered[0]); setIsQuickViewOpen(true); }}
                    className="absolute bottom-6 right-6 md:bottom-8 md:right-8 border border-white/40 px-4 md:px-6 py-2 md:py-3 text-[9px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {(activeCategory === 'ALL' && activeSort === 'NEWEST' ? filtered.slice(1) : filtered).map((product, idx) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div
                    className="relative overflow-hidden bg-zinc-900 mb-3"
                    style={{ aspectRatio: idx % 5 === 0 ? '1/1' : '3/4' }}
                  >
                    <Link to={`/product/${createSlug(product.id)}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredProduct === product.id ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                        }`}
                      />
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          alt={product.name}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                            hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      )}
                    </Link>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-mono px-2 py-1 z-10">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-[7px] font-mono px-2 py-1 z-10">
                      {product.stock > 10 ? 'IN STOCK' : `${product.stock} LEFT`}
                    </div>
                    <button
                      onClick={() => { setQuickViewProduct(product); setIsQuickViewOpen(true); }}
                      className="absolute bottom-0 left-0 right-0 bg-white text-black py-2.5 text-[9px] font-mono uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600 hover:text-white z-10"
                    >
                      Quick Add
                    </button>
                  </div>
                  <div>
                    <h3 style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-base font-light tracking-wide mb-1">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-[8px] font-mono opacity-30 tracking-widest">{product.category}</p>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-[8px] line-through opacity-20 font-mono">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="text-sm font-mono text-red-500">₹{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 text-center">
              <button className="group relative inline-block border border-white/20 px-16 py-4 text-[9px] font-mono uppercase tracking-[0.4em] overflow-hidden hover:border-white transition-all">
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Load More</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
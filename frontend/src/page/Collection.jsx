import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { Bookmark } from 'lucide-react';

const createSlug = (id) => id ? id.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product';

const CATEGORIES = ['APPAREL', 'OUTERWEAR', 'ACCESSORIES', 'FOOTWEAR'];
const SORTS = ['NEWEST', 'PRICE: LOW', 'PRICE: HIGH', 'DISCOUNT'];

const DUMMY_PRODUCTS = [
  { id: 'nevo-001', name: 'Cybernilism Hoodie', slug: 'cybernilism-hoodie', price: 2499, originalPrice: 3999, category: 'APPAREL', discount: 38, stock: 50, newArrival: true, sizes: ['S','M','L','XL'], colors: ['#808080','#000000','#FFFFFF'], images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800','https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800'] },
  { id: 'nevo-002', name: 'Tech Shell Jacket', slug: 'tech-shell-jacket', price: 4999, originalPrice: 7999, category: 'OUTERWEAR', discount: 38, stock: 20, newArrival: true, sizes: ['M','L','XL'], colors: ['#000000','#2C2C2C'], images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800'] },
  { id: 'nevo-003', name: 'Utility Cargo Pant', slug: 'utility-cargo-pant', price: 3499, originalPrice: 5499, category: 'APPAREL', discount: 36, stock: 35, newArrival: true, sizes: ['28','30','32','34'], colors: ['#1a1a1a','#4a4a4a','#8B7355'], images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800','https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800'] },
  { id: 'nevo-004', name: 'System Cap', slug: 'system-cap', price: 1299, originalPrice: 1999, category: 'ACCESSORIES', discount: 35, stock: 50, newArrival: false, sizes: ['FREE'], colors: ['#000000','#FFFFFF'], images: ['https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800','https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800'] },
  { id: 'nevo-005', name: 'Stealth Bomber', slug: 'stealth-bomber', price: 5999, originalPrice: 8999, category: 'OUTERWEAR', discount: 33, stock: 15, newArrival: true, sizes: ['M','L','XL','XXL'], colors: ['#000000','#1a1a1a'], images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800','https://images.unsplash.com/photo-1559582798-678dfc712ccd?q=80&w=800'] },
  { id: 'nevo-006', name: 'Void Graphic Tee', slug: 'void-graphic-tee', price: 1799, originalPrice: 2499, category: 'APPAREL', discount: 28, stock: 40, newArrival: true, sizes: ['S','M','L','XL'], colors: ['#000000','#FFFFFF','#808080'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800','https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800'] },
  { id: 'nevo-007', name: 'Distressed Denim', slug: 'distressed-denim', price: 3999, originalPrice: 5999, category: 'APPAREL', discount: 33, stock: 25, newArrival: false, sizes: ['28','30','32','34','36'], colors: ['#4a5568','#2d3748','#1a202c'], images: ['https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800','https://images.unsplash.com/photo-1582552966370-980d13d31f62?q=80&w=800'] },
  { id: 'nevo-008', name: 'Urban Runner Sneakers', slug: 'urban-runner-sneakers', price: 6999, originalPrice: 9999, category: 'FOOTWEAR', discount: 30, stock: 22, newArrival: true, sizes: ['7','8','9','10','11'], colors: ['#000000','#FFFFFF','#808080'], images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800','https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800'] },
  { id: 'nevo-009', name: 'Tactical Backpack', slug: 'tactical-backpack', price: 4499, originalPrice: 6499, category: 'ACCESSORIES', discount: 31, stock: 30, newArrival: false, sizes: ['ONE SIZE'], colors: ['#000000','#2d3748'], images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800','https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800'] },
  { id: 'nevo-010', name: 'Oversized Knit Sweater', slug: 'oversized-knit-sweater', price: 3799, originalPrice: 5499, category: 'APPAREL', discount: 31, stock: 18, newArrival: true, sizes: ['S','M','L','XL'], colors: ['#808080','#1a1a1a','#d4d4d4'], images: ['https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800','https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800'] },
  { id: 'nevo-011', name: 'Tech Cargo Shorts', slug: 'tech-cargo-shorts', price: 2299, originalPrice: 3299, category: 'APPAREL', discount: 30, stock: 35, newArrival: false, sizes: ['S','M','L','XL'], colors: ['#1a1a1a','#4a4a4a','#556B2F'], images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800','https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800'] },
  { id: 'nevo-012', name: 'Minimalist Steel Watch', slug: 'minimalist-steel-watch', price: 8999, originalPrice: 12999, category: 'ACCESSORIES', discount: 31, stock: 12, newArrival: true, sizes: ['ONE SIZE'], colors: ['#C0C0C0','#000000','#FFD700'], images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800','https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800'] },
  { id: 'nevo-013', name: 'Leather Crossbody Bag', slug: 'leather-crossbody-bag', price: 5499, originalPrice: 7999, category: 'ACCESSORIES', discount: 31, stock: 20, newArrival: false, sizes: ['ONE SIZE'], colors: ['#000000','#8B4513','#654321'], images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800'] },
  { id: 'nevo-014', name: 'Puffer Vest', slug: 'puffer-vest', price: 4299, originalPrice: 6499, category: 'OUTERWEAR', discount: 34, stock: 25, newArrival: true, sizes: ['S','M','L','XL'], colors: ['#000000','#1a1a1a','#2d3748'], images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800'] },
  { id: 'nevo-015', name: 'Slim Fit Chinos', slug: 'slim-fit-chinos', price: 2999, originalPrice: 4499, category: 'APPAREL', discount: 33, stock: 40, newArrival: false, sizes: ['28','30','32','34'], colors: ['#D2B48C','#000000','#556B2F','#8B7355'], images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800','https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800'] },
  { id: 'nevo-016', name: 'Classic Leather Belt', slug: 'classic-leather-belt', price: 1999, originalPrice: 2999, category: 'ACCESSORIES', discount: 33, stock: 45, newArrival: false, sizes: ['32','34','36','38'], colors: ['#000000','#8B4513'], images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800'] },
];

export const Collection = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSort, setActiveSort] = useState('NEWEST');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(DUMMY_PRODUCTS);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(DUMMY_PRODUCTS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products
    .filter(p => !activeCategory || p.category === activeCategory)
    .sort((a, b) => {
      if (activeSort === 'PRICE: LOW') return a.price - b.price;
      if (activeSort === 'PRICE: HIGH') return b.price - a.price;
      if (activeSort === 'DISCOUNT') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-3xl font-light tracking-wide mb-4">Loading Collection...</h2>
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-500 font-mono text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="border border-white/40 px-6 py-3 text-[9px] font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* ===== HERO BANNER ===== */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1558171813414-7c5cc4f55643?w=2400&q=80" 
          alt="NEVO Collection"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2400&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl space-y-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-red-600">NEW ARRIVAL</p>
              <h1 style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide uppercase leading-tight">The Collection</h1>
              <div className="h-[1px] w-20 bg-red-600" />
              <p className="text-sm md:text-base font-light leading-relaxed text-white/80 max-w-xl">
                Discover ready-to-wear looks and accessories crafted with uncompromising quality. 
                Industrial-grade materials meet meticulous craftsmanship. Each piece is designed in our studio, 
                cut from premium fabrics sourced from Italy and Japan, and constructed with precision stitching. 
                This is luxury streetwear for the modern individual.
              </p>
              <div className="flex gap-6 pt-4">
                <button onClick={() => setShowFilters(true)} className="text-[9px] font-mono uppercase tracking-widest border border-white/40 px-8 py-3 hover:bg-white hover:text-black transition-all">Filter & Sort +</button>
                <a href="#products" className="text-[9px] font-mono uppercase tracking-widest hover:text-red-600 transition-colors">Explore ↓</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOLD SEPARATOR LINE ===== */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* ===== FILTER DRAWER ===== */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowFilters(false)} />
          <div className="relative w-96 bg-black border-l border-white/10 p-10 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xs font-mono uppercase tracking-widest">Filter & Sort</h3>
              <button onClick={() => setShowFilters(false)} className="text-white/60 hover:text-white text-2xl">✕</button>
            </div>
            
            <div className="mb-10">
              <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-4">Category</p>
              <div className="space-y-3">
                <button onClick={() => { setActiveCategory(null); setShowFilters(false); }} className={`block text-left text-[10px] font-mono uppercase tracking-widest w-full py-2 transition-all ${!activeCategory ? 'text-white' : 'text-white/40 hover:text-white'}`}>All Products</button>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setShowFilters(false); }} className={`block text-left text-[10px] font-mono uppercase tracking-widest w-full py-2 transition-all ${activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white'}`}>{cat}</button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-4">Sort By</p>
              <div className="space-y-3">
                {SORTS.map(sort => (
                  <button key={sort} onClick={() => { setActiveSort(sort); setShowFilters(false); }} className={`block text-left text-[10px] font-mono uppercase tracking-widest w-full py-2 transition-all ${activeSort === sort ? 'text-white' : 'text-white/40 hover:text-white'}`}>{sort}</button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-4">Price Range</p>
              <div className="space-y-3">
                {['Under ₹2,000', '₹2,000 – ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000'].map(range => (
                  <button key={range} className="block text-left text-[10px] font-mono tracking-wider text-white/40 hover:text-white transition-all w-full py-1">{range}</button>
                ))}
              </div>
            </div>

            <button onClick={() => { setActiveCategory(null); setActiveSort('NEWEST'); }} className="w-full border border-white/20 py-4 text-[9px] font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all mt-8">Clear All Filters</button>
          </div>
        </div>
      )}

      {/* ===== PRODUCTS GRID (Black lines between products only) ===== */}
      <div id="products" className="w-full px-0 py-16 bg-black">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {filtered.map((product, index) => (
            <div 
            key={product.id} 
            className="group cursor-pointer"
            style={{
              borderRight: (index + 1) % 4 !== 0 ? '10px solid #000' : 'none',
              borderBottom: '10px solid #000',
              marginBottom: '50px'  // ← Gap yahan control kar
            }}
            onMouseEnter={() => setHoveredProduct(product.id)} 
            onMouseLeave={() => setHoveredProduct(null)}
          >
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
                <Link to={`/product/${createSlug(product.id)}`}>
                  <img src={product.images?.[0] || 'https://via.placeholder.com/600x800?text=NEVO'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  {product.images?.[1] && <img src={product.images[1]} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" loading="lazy" />}
                  {product.newArrival && <span className="absolute top-3 left-3 text-[7px] font-mono uppercase tracking-widest text-white/90 bg-transparent z-10">NEW IN</span>}
                  {product.discount && !product.newArrival && <span className="absolute top-3 left-3 text-[7px] font-mono uppercase tracking-widest bg-red-600 text-white px-2 py-1 z-10">-{product.discount}%</span>}
                  <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <Bookmark className="w-4 h-4 text-white" />
                  </button>
                  {product.stock <= 10 && product.stock > 0 && <span className="absolute bottom-3 left-3 text-[7px] font-mono uppercase tracking-widest text-red-500 bg-black/70 px-2 py-1 z-10">{product.stock} Left</span>}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button className="w-full bg-white text-black py-3 text-[9px] font-mono uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors">Add to Bag</button>
                  </div>
                </Link>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-[8px] font-mono uppercase tracking-widest opacity-40">{product.category}</p>
                <h3 style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-sm font-light uppercase tracking-wide">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-red-600">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && <span className="text-[10px] line-through opacity-30 font-mono">₹{product.originalPrice.toLocaleString()}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-white/40 font-mono text-[9px] tracking-widest mb-4">NO PRODUCTS FOUND</p>
            <button onClick={() => { setActiveCategory(null); setActiveSort('NEWEST'); }} className="text-[9px] font-mono uppercase tracking-widest hover:text-red-600 transition-colors">Clear Filters</button>
          </div>
        )}
        
        {filtered.length > 0 && (
          <div className="mt-16 text-center">
            <button className="group relative inline-block border border-white/20 px-16 py-5 text-[9px] font-mono uppercase tracking-[0.4em] overflow-hidden hover:border-white transition-all">
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Load More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
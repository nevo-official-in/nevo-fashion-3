import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const products = [
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
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 50,
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
      sizes: ['M', 'L', 'XL'],
      stock: 20,
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
      sizes: ['28', '30', '32', '34'],
      stock: 35,
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
  ];

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Helmet><title>NEVO | Luxury Streetwear</title></Helmet>

      {/* ========== HERO SECTION ========== */}
<section className="relative h-screen flex flex-col items-center justify-end overflow-hidden pb-32">
<video
  key="guaranteed-video"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-60"
  style={{ filter: 'contrast(1.2) brightness(0.6) grayscale(1)' }}
>
  {/* 🔥 Option 1: High-Speed Night Driving (Universal Link) */}
  <source 
    src="https://static.videezy.com/system/resources/previews/000/038/544/original/alb_city311_1080p_24fps.mp4" 
    type="video/mp4" 
  />
  {/* Option 2: Backup Stable Link */}
  <source 
    src="https://www.w3schools.com/html/mov_bbb.mp4" 
    type="video/mp4" 
  />
</video>
  
  {/* Black gradient overlay - Isse text chamkega */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />

  <div className="relative z-10 text-center px-4 space-y-10 w-full">
    <p className="text-[10px] tracking-[0.8em] font-mono uppercase text-white font-bold animate-pulse">
      THE ART OF PRECISION
    </p>
    <Link
      to="/collection"
      className="group relative border border-white px-20 py-5 text-[10px] font-bold uppercase overflow-hidden transition-all inline-block bg-transparent text-white hover:bg-white hover:text-black duration-700"
    >
      <span className="relative z-10 tracking-[0.4em]">Enter The Void</span>
    </Link>
  </div>
</section>
      {/* ========== NEW ARRIVALS - CLEAN CARDS ========== */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="w-full">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <p className="font-mono text-red-600 text-[10px] tracking-widest mb-2">NEW</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-normal uppercase">New Arrivals</h2>
            </div>
            <Link to="/collection" className="hidden md:block text-[10px] font-mono uppercase hover:text-red-600 transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group cursor-pointer"
              >
                {/* Clean Image Container - No Buttons */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Discount Badge Only */}
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info - Clean */}
                <h3 className="text-sm font-bold mb-1 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-[10px] opacity-50 font-mono mb-2">
                  {product.category}
                </p>
                
                {/* Price */}
                <div className="flex items-center gap-2">
                  {product.originalPrice && (
                    <span className="text-[10px] line-through opacity-40">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm font-bold text-red-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FIND YOUR PERFECT LOOK ========== */}
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-0 border border-white/10">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813441-3e1548494339?q=80&w=1200"
                alt="NEVO Campaign"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 space-y-8">
              <div>
                <p className="font-mono text-red-600 text-[10px] tracking-widest mb-3">LIMITED OFFER</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-normal uppercase leading-[0.9] mb-4">
                  Find Your<br />Perfect Look
                </h2>
                <div className="h-[2px] w-20 bg-red-600" />
              </div>
              <p className="text-sm opacity-60 leading-relaxed max-w-md">
                Step into the void with our exclusive launch collection.
                Industrial-grade materials. Uncompromising design.
              </p>
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase opacity-40">Launch Discount</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl md:text-7xl font-bold text-red-600">50%</span>
                  <span className="text-sm opacity-50 uppercase">Off First Order</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition-all"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center border border-white/20 px-10 py-4 text-xs font-bold uppercase hover:bg-white hover:text-black transition-all"
                >
                  Learn More
                </Link>
              </div>
              <p className="text-[9px] font-mono opacity-30 pt-4">* Use code: NEVO50 at checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED COLLECTIONS ========== */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="w-full">
          <div className="text-center mb-20">
            <p className="font-mono text-red-600 text-[10px] tracking-widest mb-2">SHOP BY</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-normal uppercase">Featured Collections</h2>
            <div className="h-[2px] w-24 bg-red-600 mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/collection?category=apparel" className="group relative aspect-[4/5] overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800"
                alt="Apparel"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                <h3 className="text-4xl font-bold tracking-normal uppercase">Apparel</h3>
                <p className="text-[10px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Hoodies · Tees · Pants →
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-[1px] bg-red-600 w-12" />
                  <span className="text-[8px] font-mono text-red-600 uppercase">24 Items</span>
                </div>
              </div>
            </Link>
            <Link to="/collection?category=outerwear" className="group relative aspect-[4/5] overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800"
                alt="Outerwear"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                <h3 className="text-4xl font-bold tracking-normal uppercase">Outerwear</h3>
                <p className="text-[10px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Jackets · Coats · Shells →
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-[1px] bg-red-600 w-12" />
                  <span className="text-[8px] font-mono text-red-600 uppercase">12 Items</span>
                </div>
              </div>
            </Link>
            <Link to="/collection?category=accessories" className="group relative aspect-[4/5] overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800"
                alt="Accessories"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                <h3 className="text-4xl font-bold tracking-normal uppercase">Accessories</h3>
                <p className="text-[10px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Caps · Bags · Belts →
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-[1px] bg-red-600 w-12" />
                  <span className="text-[8px] font-mono text-red-600 uppercase">18 Items</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHY ========== */}
      <section className="py-40 px-6 bg-zinc-950 border-t border-white/5">
        <div className="w-full text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-normal uppercase">The System & The Soul</h2>
          <div className="h-[2px] w-20 bg-red-600 mx-auto" />
          <p className="text-[8px] opacity-30 mt-4">
            © 2026 NEVO. All designs, content, and code are proprietary.
            Unauthorized use is prohibited.
          </p>
          <Link
            to="/about"
            className="inline-block mt-8 text-[10px] font-mono uppercase text-red-600 hover:text-white transition-colors border-b border-red-600 hover:border-white pb-1"
          >
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="py-12 bg-zinc-950 border-b border-white/5">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border border-white/5 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold">Free Shipping</p>
                <p className="text-[10px] opacity-50">On orders over ₹2000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-white/5 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold">Easy Returns</p>
                <p className="text-[10px] opacity-50">7-day exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-white/5 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold">Secure Payment</p>
                <p className="text-[10px] opacity-50">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-white/5 hover:border-red-600/50 transition-colors">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold">24/7 Support</p>
                <p className="text-[10px] opacity-50">Always here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-20 border-t border-white/10 bg-black">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 font-mono text-[10px] tracking-widest">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs font-bold">© 2026 NEVO. All Rights Reserved.</span>
              <span className="text-[8px] opacity-50">Designed in the Void</span>
              <span className="text-[8px] opacity-30">Protected under international copyright law</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex gap-6">
                <Link to="/about" className="hover:text-red-600 transition-colors">About</Link>
                <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
                <Link to="/privacy" className="hover:text-red-600 transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-red-600 transition-colors">Terms</Link>
              </div>
              <div className="hidden md:block w-[1px] h-4 bg-white/20" />
              <div className="flex gap-6">
                <a href="#" className="hover:text-red-600 transition-colors">Instagram</a>
                <a href="#" className="hover:text-red-600 transition-colors">Discord</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
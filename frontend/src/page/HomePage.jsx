import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

export const HomePage = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [arrivalsRef, arrivalsInView] = useInView();
  const [offerRef, offerInView] = useInView();
  const [collectionsRef, collectionsInView] = useInView();
  const [philosophyRef, philosophyInView] = useInView();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800',
        'https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800',
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
        'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800',
      ],
      sizes: ['FREE'],
      stock: 50,
      discount: 35
    },
  ];

  const marqueeText = "LUXURY FOR EVERYONE • FREE SHIPPING WORLDWIDE • NEW DROP 2026 • ENTER THE VOID • NEVO STUDIO • SHIPS GLOBALLY • ";

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Helmet><title>NEVO | Luxury Streetwear</title></Helmet>

      {/* ========== HERO SECTION ========== */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="https://videos.pexels.com/video-files/6873503/6873503-hd_1080_1920_25fps.mp4" type="video/mp4" />
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070" className="w-full h-full object-cover" alt="Hero BG" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <div
          className={`relative z-10 text-center px-4 w-full max-w-3xl mx-auto transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ marginTop: '16vh' }}
        >
          <p className="text-[9px] tracking-[0.6em] font-mono uppercase text-white/60 mb-10">
            New Collection — 2026
          </p>
          <div className="space-y-4 mb-12">
            <h1
              style={{ fontFamily: "''Cormorant Garamond'', serif" }}
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.05em] uppercase text-white leading-none"
            >
              NEVO
            </h1>
            <p
              style={{ fontFamily: "''Cormorant Garamond'', serif" }}
              className="text-lg md:text-xl text-white/50 tracking-[0.3em] italic font-light"
            >
              Luxury for Everyone
            </p>
          </div>
          <div className="mb-16">
            <Link
              to="/collection"
              className="group relative inline-block border border-white/40 px-16 py-5 text-[11px] font-mono uppercase tracking-[0.4em] text-white overflow-hidden transition-all duration-500 hover:border-white"
            >
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                Enter The Void
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3 mt-10">
            <span className="text-[7px] tracking-[0.6em] font-mono uppercase text-white/30">Scroll</span>
            <div className="group/scroll relative w-[1px] h-14 bg-white/10 cursor-pointer overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-white/50" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
              <div className="absolute top-0 left-0 w-full h-0 bg-white group-hover/scroll:h-full transition-all duration-500 ease-out z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== MARQUEE TICKER ========== */}
      <div className="bg-red-600 py-3 overflow-hidden border-y border-red-500">
        <div className="flex whitespace-nowrap"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[10px] font-mono uppercase tracking-[0.3em] text-white mx-0">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ========== NEW ARRIVALS ========== */}
      <section ref={arrivalsRef} className="py-32 px-4 md:px-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className={`flex justify-between items-end mb-16 border-b border-white/10 pb-6 transition-all duration-700 ${arrivalsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <p className="font-mono text-red-600 text-[9px] tracking-[0.4em] mb-3">NEW</p>
              <h2
                style={{ fontFamily: "''Cormorant Garamond'', serif" }}
                className="text-5xl md:text-7xl font-light tracking-wide uppercase"
              >
                New Arrivals
              </h2>
            </div>
            <Link to="/collection" className="hidden md:block text-[9px] font-mono uppercase tracking-widest hover:text-red-600 transition-colors opacity-50 hover:opacity-100">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 ${arrivalsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${hoveredProduct === product.id ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                      />
                    )}
                  </Link>

                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-mono px-2 py-1 z-10">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Stock badge */}
                  {product.stock <= 10 && (
                    <div className="absolute top-3 right-3 bg-black/80 text-red-500 text-[8px] font-mono px-2 py-1 z-10">
                      {product.stock} LEFT
                    </div>
                  )}

                  {/* Add to Bag hover */}
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 text-[9px] font-mono uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600 hover:text-white text-center z-10"
                  >
                    Add to Bag
                  </Link>
                </div>
                <h3
                  style={{ fontFamily: "''Cormorant Garamond'', serif" }}
                  className="text-base md:text-lg font-light mb-1 tracking-wide"
                >
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-[9px] opacity-30 font-mono tracking-widest">{product.category}</p>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-[9px] line-through opacity-30">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-sm font-mono text-red-500">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FIND YOUR PERFECT LOOK ========== */}
      <section ref={offerRef} className="py-20 px-4 md:px-10 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-0 border border-white/10 transition-all duration-1000 ${offerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813441-3e1548494339?q=80&w=1200"
                alt="NEVO Campaign"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 space-y-8">
              <div>
                <p className="font-mono text-red-600 text-[9px] tracking-[0.4em] mb-3">LIMITED OFFER</p>
                <h2
                  style={{ fontFamily: "''Cormorant Garamond'', serif" }}
                  className="text-5xl md:text-7xl font-light tracking-wide uppercase leading-tight mb-4"
                >
                  Find Your<br />Perfect Look
                </h2>
                <div className="h-[1px] w-16 bg-red-600" />
              </div>
              <p className="text-sm opacity-50 leading-relaxed max-w-md font-light">
                Step into the void with our exclusive launch collection.
                Industrial-grade materials. Uncompromising design.
              </p>
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase opacity-30 tracking-widest">Launch Discount</p>
                <div className="flex items-baseline gap-4">
                  <span style={{ fontFamily: "''Cormorant Garamond'', serif" }} className="text-7xl md:text-8xl font-light text-red-600">50%</span>
                  <span className="text-xs opacity-40 uppercase tracking-widest">Off First Order</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/collection" className="group relative inline-flex items-center justify-center bg-white text-black px-10 py-4 text-[11px] font-mono uppercase tracking-widest overflow-hidden hover:bg-red-600 hover:text-white transition-all duration-300">
                  Shop Now
                </Link>
                <Link to="/about" className="inline-flex items-center justify-center border border-white/20 px-10 py-4 text-[11px] font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                  Learn More
                </Link>
              </div>
              <p className="text-[9px] font-mono opacity-20 pt-4">* Use code: NEVO50 at checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED COLLECTIONS ========== */}
      <section ref={collectionsRef} className="py-32 px-4 md:px-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-700 ${collectionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-mono text-red-600 text-[9px] tracking-[0.4em] mb-3">SHOP BY</p>
            <h2
              style={{ fontFamily: "''Cormorant Garamond'', serif" }}
              className="text-5xl md:text-7xl font-light tracking-wide uppercase"
            >
              Featured Collections
            </h2>
            <div className="h-[1px] w-20 bg-red-600 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/collection?category=apparel', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', label: 'Apparel', sub: 'Hoodies · Tees · Pants', count: '24' },
              { to: '/collection?category=outerwear', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800', label: 'Outerwear', sub: 'Jackets · Coats · Shells', count: '12' },
              { to: '/collection?category=accessories', img: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800', label: 'Accessories', sub: 'Caps · Bags · Belts', count: '18' },
            ].map((col, idx) => (
              <Link
                key={col.label}
                to={col.to}
                className={`group relative aspect-[4/5] overflow-hidden transition-all duration-700 ${collectionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <img src={col.img} alt={col.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
                  <h3 style={{ fontFamily: "''Cormorant Garamond'', serif" }} className="text-4xl font-light tracking-wide uppercase">{col.label}</h3>
                  <p className="text-[9px] font-mono uppercase opacity-0 group-hover:opacity-60 transition-all duration-500 translate-y-2 group-hover:translate-y-0 tracking-widest">
                    {col.sub} →
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-[1px] bg-red-600 w-8" />
                    <span className="text-[8px] font-mono text-red-600 uppercase tracking-widest">{col.count} Items</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHY ========== */}
      <section ref={philosophyRef} className="py-40 px-6 bg-zinc-950 border-t border-white/5">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${philosophyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-red-600 text-[9px] tracking-[0.5em]">OUR PHILOSOPHY</p>
          <h2 style={{ fontFamily: "''Cormorant Garamond'', serif" }} className="text-5xl md:text-7xl font-light tracking-wide uppercase">
            The System & The Soul
          </h2>
          <div className="h-[1px] w-16 bg-red-600 mx-auto" />
          <p className="text-sm opacity-40 leading-relaxed max-w-xl mx-auto font-light">
            Luxury is not a price tag. It's a feeling. We build clothes that make you feel
            powerful — without the price that excludes.
          </p>
          <Link to="/about" className="inline-block mt-8 text-[9px] font-mono uppercase tracking-[0.4em] text-red-600 hover:text-white transition-colors border-b border-red-600/50 hover:border-white pb-1">
            Discover Our Story
          </Link>
          <p className="text-[8px] opacity-20 font-mono pt-8">© 2026 NEVO. All designs, content, and code are proprietary.</p>
        </div>
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="py-12 px-4 md:px-10 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'M5 13l4 4L19 7', label: 'Free Shipping', sub: 'On orders over ₹2000' },
              { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', label: 'Easy Returns', sub: '7-day exchange' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Payment', sub: '100% protected' },
              { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label: '24/7 Support', sub: 'Always here' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 p-4 border border-white/5 hover:border-red-600/30 transition-all duration-300 group">
                <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest">{badge.label}</p>
                  <p className="text-[8px] opacity-30 mt-1">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-20 border-t border-white/5 px-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 font-mono text-[9px] tracking-widest opacity-30">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs font-light" style={{ fontFamily: "''Cormorant Garamond'', serif" }}>© 2026 NEVO Studio</span>
              <span className="text-[8px]">Designed in the Void</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex gap-6">
                {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
                  <Link key={link} to={`/${link.toLowerCase()}`} className="hover:text-red-600 hover:opacity-100 transition-all">{link}</Link>
                ))}
              </div>
              <div className="hidden md:block w-[1px] h-4 bg-white/20" />
              <div className="flex gap-6">
                <a href="#" className="hover:text-red-600 hover:opacity-100 transition-all">Instagram</a>
                <a href="#" className="hover:text-red-600 hover:opacity-100 transition-all">Discord</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
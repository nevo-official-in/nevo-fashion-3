import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Journal = () => {
  const articles = [
    {
      id: 1,
      title: 'The Philosophy of Streetwear',
      excerpt: 'Exploring the intersection of urban culture and high fashion.',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200',
      date: 'February 15, 2026',
      category: 'Culture',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Sustainable Fashion: The Future',
      excerpt: 'How NEVO is leading towards eco-friendly luxury streetwear.',
      image: 'https://images.unsplash.com/photo-1558171813441-3e1548494339?q=80&w=1200',
      date: 'February 10, 2026',
      category: 'Sustainability',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Styling Guide: Layering Essentials',
      excerpt: 'Master the art of layering with our comprehensive guide.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200',
      date: 'February 5, 2026',
      category: 'Style Guide',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Behind The Scenes: SS/2026 Collection',
      excerpt: 'An exclusive look into the creative process.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331691ae?q=80&w=1200',
      date: 'January 28, 2026',
      category: 'Behind The Scenes',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'The Rise of Techwear',
      excerpt: 'Understanding the technical revolution in fashion.',
      image: 'https://images.unsplash.com/photo-1551488852-0801751ac1f8?q=80&w=1200',
      date: 'January 20, 2026',
      category: 'Trends',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'Minimalism Meets Maximalism',
      excerpt: 'Finding balance between simplicity and bold expression.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
      date: 'January 15, 2026',
      category: 'Style Guide',
      readTime: '6 min read'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <Helmet><title>NEVO | Journal</title></Helmet>

      {/* Header */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
        
        <div className="relative z-10 text-center px-4">
          <p className="text-[10px] tracking-[0.5em] font-mono uppercase text-red-600 font-bold mb-4">
            STORIES & INSIGHTS
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Journal
          </h1>
          <p className="text-sm opacity-60 mt-4 max-w-md mx-auto">
            Explore the culture, philosophy, and stories behind NEVO.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider">{article.category}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[10px] opacity-50 font-mono">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm opacity-60 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <Link 
                    to={`/journal/${article.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-red-600 transition-colors pt-2"
                  >
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-4 mt-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Join The System
          </h2>
          <p className="text-sm opacity-60">
            Subscribe to receive exclusive updates, early access to drops, 
            and 10% off your first order.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-black border border-white/20 px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors placeholder:opacity-40"
            />
            <button 
              type="submit"
              className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-[10px] opacity-40">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};
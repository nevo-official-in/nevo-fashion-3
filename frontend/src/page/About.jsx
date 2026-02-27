import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export const About = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 md:px-10 pb-20">
      <Helmet><title>NEVO | THE SYSTEM</title></Helmet>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-32"
      >
        <p className="font-mono text-red-600 text-[10px] tracking-widest uppercase mb-4">About_Us</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">
          The_System_&_The_Soul
        </h1>
        <div className="h-[2px] w-24 bg-red-600 mx-auto" />
      </motion.div>

      {/* Story */}
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Section 1 */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="aspect-square bg-zinc-900 border border-white/5 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558171813441-3e1548494339?q=80&w=1000&auto=format&fit=crop" 
              alt="NEVO Origin"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Born_In_The_Void</h2>
            <p className="text-sm leading-relaxed opacity-70 font-light tracking-wide">
              NEVO was not created. It emerged. From the spaces between the noise, from the silence 
              after the chaos. We are not a brand. We are a frequency. A signal for those who walk 
              alone but never feel lost.
            </p>
            <p className="text-sm leading-relaxed opacity-70 font-light tracking-wide">
              Every piece is engineered for the urban wanderer. For those who see the city not as 
              a place, but as a state of mind. Raw. Industrial. Uncompromising.
            </p>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse"
        >
          <div className="aspect-square bg-zinc-900 border border-white/5 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331691ae?q=80&w=1000&auto=format&fit=crop" 
              alt="NEVO Philosophy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">The_Philosophy</h2>
            <p className="text-sm leading-relaxed opacity-70 font-light tracking-wide">
              We believe in the power of absence. In what is not said. In what is not shown. 
              Luxury is not excess. It is precision. It is the perfect weight of fabric. 
              The exact angle of a seam. The silence in a crowded room.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">100%</div>
                <div className="text-[8px] uppercase tracking-widest opacity-50 mt-2">Premium Materials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">0%</div>
                <div className="text-[8px] uppercase tracking-widest opacity-50 mt-2">Compromise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">∞</div>
                <div className="text-[8px] uppercase tracking-widest opacity-50 mt-2">Attitude</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-20 border-t border-white/10"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">
            Join_The_System
          </h2>
          <p className="text-sm opacity-70 max-w-2xl mx-auto mb-12">
            This is not fashion. This is armor. For those who are ready to step into the void 
            and emerge stronger.
          </p>
          <a 
            href="/collection" 
            className="inline-block bg-white text-black px-16 py-5 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
          >
            Enter_The_Archive
          </a>
        </motion.section>

      </div>
    </div>
  );
};
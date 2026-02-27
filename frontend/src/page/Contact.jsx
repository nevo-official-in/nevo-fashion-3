import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message transmitted to the void 📡');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 md:px-10 pb-20">
      <Helmet><title>NEVO | CONTACT</title></Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <p className="font-mono text-red-600 text-[10px] tracking-widest uppercase mb-4 text-center">
          Establish_Connection
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 text-center">
          Contact_The_System
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-widest">Email</h3>
              <a href="mailto:void@nevo.system" className="text-xs opacity-70 hover:text-red-600 transition-colors">
                void@nevo.system
              </a>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-widest">Location</h3>
              <p className="text-xs opacity-70">
                Designed in the Void<br />
                Available Worldwide
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-widest">Social</h3>
              <div className="flex flex-col gap-2 text-xs opacity-70">
                <a href="#" className="hover:text-red-600 transition-colors">[ Instagram ]</a>
                <a href="#" className="hover:text-red-600 transition-colors">[ Discord ]</a>
                <a href="#" className="hover:text-red-600 transition-colors">[ Twitter ]</a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] opacity-50 leading-relaxed">
                For order inquiries, shipping questions, or system errors. 
                We respond within 24-48 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-2 opacity-70">
                Identifier (Name)
              </label>
              <input 
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-2 opacity-70">
                Frequency (Email)
              </label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-2 opacity-70">
                Signal Type (Subject)
              </label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
              >
                <option value="">Select subject</option>
                <option value="order">Order Inquiry</option>
                <option value="shipping">Shipping Question</option>
                <option value="collab">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-2 opacity-70">
                Transmission (Message)
              </label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
            >
              Transmit_Message
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};
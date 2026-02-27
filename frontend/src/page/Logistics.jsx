import React from 'react';
import { Helmet } from 'react-helmet';

export const Logistics = () => {
  return (
    <>
      <Helmet><title>Logistics | NEVO</title></Helmet>
      <div className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0c14] text-slate-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-16 tracking-tight">Logistics & Delivery</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-blue-400">Shipping</h2>
              <p className="text-slate-400 leading-relaxed">
                Orders are dispatched from our Delhi hub within 48 hours. 
                We use express air shipping to ensure your units arrive 
                within 3-5 business days across India.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-blue-400">Packaging</h2>
              <p className="text-slate-400 leading-relaxed">
                Our packaging is designed for reuse. Every order comes 
                sealed in a moisture-resistant technical shield to 
                protect the fabric integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
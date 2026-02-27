import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 md:px-10 pb-20">
      <Helmet><title>NEVO | Terms of Service</title></Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <Link to="/" className="text-[10px] font-mono uppercase tracking-widest opacity-50 hover:text-red-600 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-normal mt-4">Terms of Service</h1>
          <p className="text-sm opacity-50 mt-2">Effective Date: February 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm opacity-80 leading-relaxed">
          
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">1. Acceptance of Terms</h2>
            <p className="mb-3">
              By accessing or using the NEVO website, you agree to be bound by these Terms of Service. 
              If you do not agree, please discontinue use of our services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">2. Intellectual Property</h2>
            <p className="mb-3">
              All content on this website, including but not limited to designs, logos, product images, 
              text, and code, is the exclusive property of NEVO and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <p className="mb-3">
              <span className="text-red-600 font-bold">Unauthorized use, reproduction, or distribution 
              of any NEVO content is strictly prohibited.</span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">3. User Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 opacity-70">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to hack, scrape, or interfere with website functionality</li>
              <li>Impersonate any person or entity</li>
              <li>Copy, modify, or reverse-engineer any part of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">4. Orders & Payments</h2>
            <p className="mb-3">
              All orders are subject to acceptance and availability. Prices are in INR and include 
              applicable taxes. We reserve the right to cancel any order for any reason.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">5. Limitation of Liability</h2>
            <p className="mb-3">
              NEVO shall not be liable for any indirect, incidental, or consequential damages arising 
              from the use of our website or products. Our total liability shall not exceed the amount 
              paid by you for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">6. Governing Law</h2>
            <p className="mb-3">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to 
              the exclusive jurisdiction of courts in [Your City], India.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">7. Contact</h2>
            <p className="mb-3">
              For questions about these Terms, contact us at: 
              <span className="text-red-600 block mt-1">legal@nevo.system</span>
            </p>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">
            © 2026 NEVO. All Rights Reserved.
          </p>
          <p className="text-[8px] opacity-30 mt-2">
            Unauthorized copying or distribution of this document is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};
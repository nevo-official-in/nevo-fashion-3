import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 md:px-10 pb-20">
      <Helmet><title>NEVO | Privacy Policy</title></Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <Link to="/" className="text-[10px] font-mono uppercase tracking-widest opacity-50 hover:text-red-600 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-normal mt-4">Privacy Policy</h1>
          <p className="text-sm opacity-50 mt-2">Last Updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm opacity-80 leading-relaxed">
          
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">1. Information We Collect</h2>
            <p className="mb-3">
              When you visit NEVO, we may collect basic information such as your name, email address, 
              shipping address, and payment details only when you make a purchase or create an account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">2. How We Use Your Information</h2>
            <p className="mb-3">
              We use your information solely to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 opacity-70">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">3. Data Protection</h2>
            <p className="mb-3">
              We implement industry-standard security measures to protect your personal information. 
              Your payment details are processed through secure, encrypted channels and are never 
              stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">4. Third-Party Services</h2>
            <p className="mb-3">
              We may use trusted third-party services for payment processing, shipping, and analytics. 
              These partners are bound by confidentiality agreements and data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">5. Your Rights</h2>
            <p className="mb-3">
              You have the right to access, update, or delete your personal information at any time. 
              Contact us at <span className="text-red-600">privacy@nevo.system</span> for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">6. Changes to This Policy</h2>
            <p className="mb-3">
              We may update this Privacy Policy periodically. Any changes will be posted on this page 
              with an updated "Last Updated" date.
            </p>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">
            © 2026 NEVO. All Rights Reserved.
          </p>
          <p className="text-[8px] opacity-30 mt-2">
            This document is protected under international copyright laws.
          </p>
        </div>
      </div>
    </div>
  );
};
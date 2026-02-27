import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Loader, AlertTriangle, RefreshCw } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore(state => state.clearCart);
  const [orderStatus, setOrderStatus] = useState('checking'); // checking, success, pending, error, expired
  const [orderNumber, setOrderNumber] = useState('');
  const [pollAttempts, setPollAttempts] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setOrderStatus('error');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`${API}/checkout/status/${sessionId}`);
        
        if (response.data.payment_status === 'paid') {
          setOrderStatus('success');
          setOrderNumber(response.data.order_number);
          clearCart(); // Cart khali karna mat bhulna!
        } else if (response.data.status === 'expired') {
          setOrderStatus('expired');
        } else if (pollAttempts < 5) {
          // Retry logic if payment is still processing
          setTimeout(() => setPollAttempts(prev => prev + 1), 3000);
        } else {
          setOrderStatus('pending');
          setOrderNumber(response.data.order_number || 'PROCESSING');
        }
      } catch (error) {
        console.error('System Sync Error:', error);
        if (pollAttempts < 5) {
          setTimeout(() => setPollAttempts(prev => prev + 1), 3000);
        } else {
          setOrderStatus('error');
        }
      }
    };

    checkPaymentStatus();
  }, [sessionId, pollAttempts, clearCart]);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <Helmet>
        <title>CONFIRMATION | NEVO SYSTEM</title>
      </Helmet>

      <div className="min-h-screen pt-32 pb-16 px-6 md:px-12 bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-xl w-full text-center relative z-10 bg-neutral-900/40 border border-white/5 p-12 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            
            {/* 1. CHECKING STATUS */}
            {orderStatus === 'checking' && (
              <motion.div key="checking" exit={{ opacity: 0 }}>
                <RefreshCw className="w-12 h-12 mx-auto mb-8 text-accent animate-spin" />
                <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4 font-heading">
                  Validating_Session
                </h1>
                <p className="text-neutral-500 text-[10px] font-mono tracking-[0.3em] uppercase">
                  Syncing with Global Payment Gateway... [{pollAttempts}/5]
                </p>
              </motion.div>
            )}

            {/* 2. SUCCESS STATUS */}
            {orderStatus === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-black" strokeWidth={1.5} />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-6 font-heading">
                  Order_Secure
                </h1>
                <div className="inline-block px-4 py-2 border border-white/10 mb-8">
                  <p className="text-[10px] font-mono tracking-[0.2em] text-neutral-400">
                    ID: <span className="text-white select-all">{orderNumber}</span>
                  </p>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto font-body">
                  Your acquisition is confirmed. A digital manifest has been dispatched to your email address.
                </p>
                <Link to="/">
                  <button className="w-full bg-white text-black py-4 uppercase font-bold tracking-widest text-xs hover:bg-accent hover:text-white transition-all">
                    Return to Nexus
                  </button>
                </Link>
              </motion.div>
            )}

            {/* 3. ERROR / EXPIRED STATUS */}
            {(orderStatus === 'error' || orderStatus === 'expired') && (
              <motion.div key="error">
                <AlertTriangle className="w-16 h-16 mx-auto mb-8 text-red-500" />
                <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4 font-heading">
                  System_Failure
                </h1>
                <p className="text-neutral-500 text-sm mb-10 font-body">
                  {orderStatus === 'expired' 
                    ? 'The transaction window has closed. No funds were captured.' 
                    : 'A critical error occurred during payment verification.'}
                </p>
                <Link to="/checkout">
                  <button className="w-full border border-white/20 text-white py-4 uppercase font-bold tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                    Restart Checkout
                  </button>
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        {/* Technical Footer Decoration */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center opacity-20 hidden md:block">
          <p className="text-[8px] font-mono tracking-[0.5em] text-white uppercase">
            NEVO Terminal v2.0.4 // Lat: 28.6139 Lon: 77.2090
          </p>
        </div>
      </div>
    </>
  );
};
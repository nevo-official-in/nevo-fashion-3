import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Package, Truck } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success('Order placed successfully! 🎉');
      clearCart();
      navigate('/');
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <Package className="w-16 h-16 mx-auto opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">Your Bag Is Empty</p>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-normal">No Items Found</h1>
          <button 
            onClick={() => navigate('/collection')}
            className="inline-block border border-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-normal mb-2">Checkout</h1>
          <p className="text-sm opacity-50">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* LEFT: Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Items */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>
              
              <div className="space-y-6">
                {items.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-24 h-32 bg-zinc-900 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400'} 
                        alt={item.product.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-sm uppercase tracking-tight">{item.product.name}</h3>
                      <div className="space-y-1 text-xs opacity-60">
                        <p>Size: <span className="text-white">{item.size}</span></p>
                        <p>Qty: <span className="text-white">{item.quantity}</span></p>
                      </div>
                      <p className="text-sm font-bold text-red-600 pt-2">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      {item.product.originalPrice && (
                        <p className="text-[10px] line-through opacity-40">₹{item.product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-60 uppercase tracking-wider text-xs">Subtotal</span>
                <span className="font-medium">₹{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60 uppercase tracking-wider text-xs flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className="font-medium text-green-500">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-base font-bold uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-red-600">₹{getTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3 text-xs opacity-50">
                <Lock className="w-4 h-4" />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-xs opacity-50">
                <CreditCard className="w-4 h-4" />
                <span>Payment secured by Razorpay</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Shipping Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 pb-4 border-b border-white/10">
                  Shipping Details
                </h2>
                
                <div className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-60">First Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-60">Last Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-60">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-60">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-60">Street Address *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                      placeholder="123 Main Street, Apartment"
                    />
                  </div>

                  {/* City & Postal */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-60">City *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-60">Postal Code *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-60">Order Notes (Optional)</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-zinc-900/50 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-red-600 transition-all placeholder:opacity-30 resize-none"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                  loading 
                    ? 'bg-zinc-800 text-white/50 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-red-600 hover:text-white'
                }`}
              >
                {loading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </motion.button>

              {/* Terms */}
              <p className="text-[10px] opacity-40 text-center leading-relaxed">
                By placing this order, you agree to our Terms of Service and Privacy Policy. 
                All sales are subject to our return policy.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
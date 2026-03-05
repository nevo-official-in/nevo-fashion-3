import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { X, Plus, Minus } from 'lucide-react';

const BagPage = () => {
  const {
    items: cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
  } = useCartStore();

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 selection:bg-red-600 selection:text-white">
      <div className="container mx-auto px-4 md:px-12">
        
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.3em]">
            Your Bag
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="mb-6 text-white/80">Your bag is empty.</p>
            <Link
              to="/collections"
              className="inline-block bg-red-600 text-white py-3 px-8 uppercase tracking-widest text-sm hover:bg-red-700 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex items-start gap-4 border-b border-white/10 pb-6">
                  <div className="flex-shrink-0">
                    <img src={item.images?.[0]} alt={item.name} className="w-24 h-32 object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-xs text-white/60 mb-2">Size: {item.size}</p>
                    <p className="text-sm font-bold text-red-600">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-white/20">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-2 hover:bg-white/10 transition-colors"><Minus size={14} /></button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-2 hover:bg-white/10 transition-colors"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-white/60 hover:text-red-600 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#111] p-8 border border-white/10">
                <h2 className="font-sans text-xl uppercase tracking-[0.2em] mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-6 pt-6">
                  <div className="flex justify-between font-bold uppercase">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="mt-8 w-full block text-center bg-red-600 text-white py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-all duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default BagPage;

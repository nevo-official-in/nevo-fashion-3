// Yeh code apne product card component mein use kar

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import { toast } from 'sonner';

// Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    // For simplicity, let's assume the first available size and quantity of 1
    const size = product.sizes?.[0];
    if (!size) {
      toast.error('This product is currently unavailable.');
      return;
    }
    addToCart(product, size, 1);
    
    toast.success(`${product.name} (${size}) added to your bag!`, {
      action: {
        label: "View Bag",
        onClick: () => openCart(),
      },
    });
  };


  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        
        {/* Image 1 - Default (Front) - Now with lazy loading and fade-in */}
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/600x800'}
          alt={product.name}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${
              isImageLoaded
                ? (isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100')
                : 'opacity-0'
            }
          `}
        />
        
        {/* Image 2 - Hover (Back/Different Angle) - Now with lazy loading */}
        {product.images?.[1] && (
          <img 
            src={product.images[1]}
            alt={`${product.name} - angle 2`}
            loading="lazy"
            className={`
              absolute inset-0 w-full h-full object-cover transition-all duration-700
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          />
        )}

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase z-10">
            -{product.discount}%
          </div>
        )}

        {/* Add to Bag Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600 hover:text-white z-10 text-center"
        >
          Add to Bag
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-tight">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-[10px] opacity-50 font-mono">{product.category}</p>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-[10px] line-through opacity-40">₹{product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-sm font-bold text-red-600">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

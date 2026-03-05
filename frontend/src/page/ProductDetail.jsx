import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { Heart, Share2, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';

const DUMMY_ARTIFACTS = [
  { 
    id: 'nevo-cyber-tee-001', 
    name: 'Cybernilism Hoodie', 
    price: 2499, 
    originalPrice: 3999,
    category: 'APPAREL', 
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800',
    ], 
    sizes: ['S','M','L','XL'], 
    stock: 20,
    discount: 38
  },
  {
    id: 'nevo-shell-jacket-002',
    name: 'Tech Shell Jacket',
    price: 4999,
    originalPrice: 7999,
    category: 'OUTERWEAR',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800',
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 15,
    discount: 38
  },
  {
    id: 'nevo-cargo-pant-003',
    name: 'Utility Cargo Pant',
    price: 3499,
    originalPrice: 5499,
    category: 'APPAREL',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800',
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
    ],
    sizes: ['28', '30', '32', '34'],
    stock: 25,
    discount: 36
  },
  {
    id: 'nevo-item-004',
    name: 'System Cap',
    price: 1299,
    originalPrice: 1999,
    category: 'ACCESSORIES',
    images: [
      'https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800',
    ],
    sizes: ['FREE'],
    stock: 50,
    discount: 35
  },
  {
    id: 'nevo-bomber-005',
    name: 'Stealth Bomber Jacket',
    price: 5999,
    originalPrice: 8999,
    category: 'OUTERWEAR',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800',
      'https://images.unsplash.com/photo-1559582798-678dfc712ccd?q=80&w=800',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 12,
    discount: 33
  },
  {
    id: 'nevo-tee-006',
    name: 'Void Graphic Tee',
    price: 1799,
    originalPrice: 2499,
    category: 'APPAREL',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    discount: 28
  },
  {
    id: 'nevo-jeans-007',
    name: 'Distressed Denim',
    price: 3999,
    originalPrice: 5999,
    category: 'APPAREL',
    images: [
      'https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800',
      'https://images.unsplash.com/photo-1582552966370-980d13d31f62?q=80&w=800',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 18,
    discount: 33
  },
  {
    id: 'nevo-sneakers-008',
    name: 'Urban Runner Sneakers',
    price: 6999,
    originalPrice: 9999,
    category: 'FOOTWEAR',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800',
    ],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 22,
    discount: 30
  },
  {
    id: 'nevo-backpack-009',
    name: 'Tactical Backpack',
    price: 4499,
    originalPrice: 6499,
    category: 'ACCESSORIES',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800',
    ],
    sizes: ['ONE SIZE'],
    stock: 30,
    discount: 31
  },
  {
    id: 'nevo-sweater-010',
    name: 'Oversized Knit Sweater',
    price: 3799,
    originalPrice: 5499,
    category: 'APPAREL',
    images: [
      'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    discount: 31
  },
  {
    id: 'nevo-shorts-011',
    name: 'Tech Cargo Shorts',
    price: 2299,
    originalPrice: 3299,
    category: 'APPAREL',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    discount: 30
  },
  {
    id: 'nevo-watch-012',
    name: 'Minimalist Steel Watch',
    price: 8999,
    originalPrice: 12999,
    category: 'ACCESSORIES',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800',
    ],
    sizes: ['ONE SIZE'],
    stock: 15,
    discount: 31
  },
];


export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const selectedProduct = DUMMY_ARTIFACTS.find((p) => p.id === id);

        if (selectedProduct) {
          setProduct(selectedProduct);
          if (selectedProduct.sizes?.length) setSelectedSize(selectedProduct.sizes[0]);
        } else {
          toast.error('Product not found');
          navigate('/collection');
        }
      } catch (err) {
        console.error('Product load failed:', err);
        toast.error('Failed to load product');
        navigate('/collection');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
    window.scrollTo(0, 0);
  }, [id, navigate]);


  const handleAddToCart = () => {
    if (!product) {
      toast.error('Product not available');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    openCart();
    toast.success(`${product.name} (${selectedSize}) x${quantity} added to bag! 🔥`);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold uppercase">Product Not Found</h2>
          <Link to="/collection" className="inline-block border border-white px-6 py-3 text-xs font-bold uppercase hover:bg-white hover:text-black transition-all">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const accordionItems = [
    {
      title: 'Product Details',
      content: product.description || 'Premium quality construction with attention to every detail. Designed for the modern individual who values both style and substance.'
    },
    {
      title: 'Material & Care',
      content: product.material || '100% Premium Cotton. Machine wash cold, hang dry. Do not bleach. Iron on low heat if needed.'
    },
    {
      title: 'Shipping & Returns',
      content: 'Free shipping on orders over ₹2000. Easy 7-day returns. Items must be unworn with original tags attached.'
    },
    {
      title: 'Size Guide',
      content: (
        <div className="space-y-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2">Size</th>
                <th className="text-left py-2">Chest (cm)</th>
                <th className="text-left py-2">Length (cm)</th>
              </tr>
            </thead>
            <tbody className="opacity-70">
              <tr><td className="py-2">S</td><td>104</td><td>68</td></tr>
              <tr><td className="py-2">M</td><td>108</td><td>70</td></tr>
              <tr><td className="py-2">L</td><td>112</td><td>72</td></tr>
              <tr><td className="py-2">XL</td><td>116</td><td>74</td></tr>
            </tbody>
          </table>
          <p className="text-[10px] opacity-50 mt-2">Model is 6'1" wearing size M</p>
        </div>
      )
    }
  ];

  const mainImage = product.images?.[selectedImage]?.trim() || 
                    product.images?.[0]?.trim() || 
                    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800';

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Breadcrumb */}
      <div className="px-4 md:px-10 mb-8">
        <nav className="text-[10px] font-mono uppercase tracking-widest opacity-40">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collection" className="hover:text-red-600 transition-colors">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 px-4 md:px-10 max-w-7xl mx-auto">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group"
          >
            <img 
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800';
              }}
            />
          </motion.div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-24 border-2 transition-all ${
                    selectedImage === idx ? 'border-red-600' : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <img 
                    src={img.trim()} 
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="space-y-8 lg:sticky lg:top-32 h-fit">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl md:text-4xl font-bold tracking-normal uppercase leading-tight">
                {product.name}
              </h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:text-red-600 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                </button>
                <button className="p-2 hover:text-red-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-red-600">₹{product.price?.toLocaleString()}</p>
              {product.originalPrice && (
                <p className="text-lg line-through opacity-40">₹{product.originalPrice?.toLocaleString()}</p>
              )}
              {product.discount && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              <span className="text-sm opacity-60">
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Sold Out'}
              </span>
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-mono uppercase tracking-wider opacity-60">Select Size</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-red-600 bg-red-600/10 text-red-600'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-[10px] text-green-500">Size {selectedSize} selected</p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <span className="text-sm font-mono uppercase tracking-wider opacity-60">Quantity</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-white/20">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm opacity-50">Max 5 per order</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || !selectedSize}
            className={`w-full py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
              product.stock > 0 && selectedSize
                ? 'bg-white text-black hover:bg-red-600 hover:text-white'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? (selectedSize ? 'Add to Bag' : 'Select Size') : 'Sold Out'}
          </motion.button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
            <div className="text-center space-y-1">
              <svg className="w-5 h-5 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-[10px] opacity-50 uppercase tracking-wider">Free Shipping</p>
            </div>
            <div className="text-center space-y-1">
              <svg className="w-5 h-5 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-[10px] opacity-50 uppercase tracking-wider">Easy Returns</p>
            </div>
            <div className="text-center space-y-1">
              <svg className="w-5 h-5 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-[10px] opacity-50 uppercase tracking-wider">Secure Payment</p>
            </div>
          </div>

          {/* Accordion Details */}
          <div className="space-y-2">
            {accordionItems.map((item, index) => (
              <div key={index} className="border border-white/10">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium uppercase tracking-wider">{item.title}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-sm opacity-70 leading-relaxed">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
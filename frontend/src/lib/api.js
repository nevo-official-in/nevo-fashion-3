import axios from 'axios';

// Cloud Workstations ke liye hardcoded URL (temporary fix)
const API_URL = 'https://8000-firebase-nevo-fashion-cloud-1772556336752.cluster-bqwaigqtxbeautecnatk4o6ynk.cloudworkstations.dev/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
  timeout: 15000,
});

export const getProductSlug = (id) => {
  if (!id) return '';
  if (typeof id === 'string' && (id.startsWith('nevo-') || id.includes('-'))) {
    return id;
  }
  return `nevo-item-${id}`;
};

// ✅ HARDCODED FALLBACK DATA
const FALLBACK_PRODUCTS = {
  'nevo-cyber-tee-001': {
    id: 'nevo-cyber-tee-001',
    slug: 'nevo-cyber-tee-001',
    name: 'Cybernilism Hoodie',
    price: 2499,
    originalPrice: 3999,
    category: 'APPAREL',
    description: 'Premium heavyweight hoodie with cyberpunk aesthetics.',
    material: '100% Premium Cotton (450 GSM)',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    discount: 38
  },
  'nevo-shell-jacket-002': {
    id: 'nevo-shell-jacket-002',
    slug: 'nevo-shell-jacket-002',
    name: 'Tech Shell Jacket',
    price: 4999,
    originalPrice: 7999,
    category: 'OUTERWEAR',
    description: 'Technical shell jacket with waterproof membrane.',
    material: 'Polyester with DWR coating',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800',
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 20,
    discount: 38
  },
  'nevo-cargo-pant-003': {
    id: 'nevo-cargo-pant-003',
    slug: 'nevo-cargo-pant-003',
    name: 'Utility Cargo Pant',
    price: 3499,
    originalPrice: 5499,
    category: 'APPAREL',
    description: 'Multi-pocket cargo pants with adjustable cuffs.',
    material: 'Cotton Twill Blend',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800',
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
    ],
    sizes: ['28', '30', '32', '34'],
    stock: 35,
    discount: 36
  },
  'nevo-item-004': {
    id: 'nevo-item-004',
    slug: 'nevo-item-004',
    name: 'System Cap',
    price: 1299,
    originalPrice: 1999,
    category: 'ACCESSORIES',
    description: 'Minimalist cap with embroidered logo.',
    material: '100% Cotton',
    images: [
      'https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800',
    ],
    sizes: ['FREE'],
    stock: 50,
    discount: 35
  },
};

export const fetchProducts = async (category = null) => {
  return Object.values(FALLBACK_PRODUCTS);
};

export const fetchProduct = async (id) => {
  const slug = getProductSlug(id);
  const product = FALLBACK_PRODUCTS[slug];
  if (product) {
    return product;
  }
  throw new Error('Product not found');
};

export default api;
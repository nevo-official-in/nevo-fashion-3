import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getProductSlug = (id) => {
  if (!id) return '';
  if (typeof id === 'string' && id.includes('-')) return id;
  return `nevo-item-${id}`;
};

export const fetchProducts = async (category = null) => {
  const res = await api.get('/products', { params: { category } });
  return res.data;
};

export const fetchProduct = async (id) => {
  const slug = getProductSlug(id);
  const res = await api.get(`/products/${slug}`);
  return res.data;
};
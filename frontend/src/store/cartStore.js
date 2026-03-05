import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product, size, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === product.id && item.size === size
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, size, quantity }],
          });
        }
      },

      removeFromCart: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'nevo-cart-storage', // localStorage key
    }
  )
);
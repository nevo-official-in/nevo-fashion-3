import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      // UI Actions
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      // Add Item (with quantity support)
      addItem: (product, size = "FREE SIZE", quantity = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingItemIndex > -1) {
          const newItems = [...items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
          set({ items: newItems });
        } else {
          set({ items: [...items, { product, size, quantity }] });
        }
        
        // Auto open cart for better UX
        set({ isCartOpen: true });
      },

      // Remove Item
      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      // Update Quantity
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        const items = get().items;
        const itemIndex = items.findIndex(
          (item) => item.product.id === productId && item.size === size
        );

        if (itemIndex > -1) {
          const newItems = [...items];
          newItems[itemIndex] = { ...newItems[itemIndex], quantity };
          set({ items: newItems });
        }
      },

      // Clear Cart
      clearCart: () => set({ items: [] }),

      // Calculate Total
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price || 0) * item.quantity,
          0
        );
      },

      // Get Item Count (for cart badge)
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // Check if Item is in Cart
      isInCart: (productId, size) => {
        return get().items.some(
          (item) => item.product.id === productId && item.size === size
        );
      },

      // Get Item Quantity
      getItemQuantity: (productId, size) => {
        const item = get().items.find(
          (item) => item.product.id === productId && item.size === size
        );
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'nevo-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
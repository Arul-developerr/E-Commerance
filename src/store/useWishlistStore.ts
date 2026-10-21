import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PRODUCTS } from '@/data/products';

interface WishlistState {
  items: string[]; // Array of product IDs
  toggleItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'nexacart-wishlist',
      merge: (persisted, current) => {
        const candidate = persisted as { items?: unknown } | null;
        const items = Array.isArray(candidate?.items) ? candidate.items.filter((id): id is string => typeof id === 'string' && MOCK_PRODUCTS.some(product => product.id === id)) : [];
        return { ...current, items };
      },
    }
  )
);

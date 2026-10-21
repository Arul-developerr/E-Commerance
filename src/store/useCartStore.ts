import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
import { MOCK_PRODUCTS } from '@/data/products';

const stockFor = (productId: string) => MOCK_PRODUCTS.find(product => product.id === productId)?.stock ?? 0;
const sameVariant = (a: Record<string, string>, b: Record<string, string>) => JSON.stringify(a) === JSON.stringify(b);

function validStoredItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.productId === 'string' && stockFor(item.productId) > 0 &&
    typeof item.quantity === 'number' && Number.isInteger(item.quantity) && item.quantity > 0 &&
    !!item.variantSelection && typeof item.variantSelection === 'object' && !Array.isArray(item.variantSelection) &&
    Object.values(item.variantSelection).every(option => typeof option === 'string');
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantSelection: Record<string, string>) => void;
  updateQuantity: (productId: string, variantSelection: Record<string, string>, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: (products: Product[]) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const stock = stockFor(item.productId);
        if (!stock) return;
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (i) => i.productId === item.productId && 
          sameVariant(i.variantSelection, item.variantSelection)
        );

        if (existingItemIndex > -1) {
          set({ items: currentItems.map((current, index) => index === existingItemIndex
            ? { ...current, quantity: Math.min(stock, current.quantity + item.quantity) }
            : current) });
        } else {
          set({ items: [...currentItems, { ...item, quantity: Math.min(stock, Math.max(1, item.quantity)) }] });
        }
      },
      removeItem: (productId, variantSelection) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && sameVariant(i.variantSelection, variantSelection))
          ),
        });
      },
      updateQuantity: (productId, variantSelection, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantSelection);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && sameVariant(i.variantSelection, variantSelection)
              ? { ...i, quantity: Math.min(quantity, stockFor(productId)) }
              : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: (products) => {
        return get().items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          return total + (product?.price || 0) * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'nexacart-cart',
      merge: (persisted, current) => {
        const candidate = persisted as { items?: unknown } | null;
        const items = Array.isArray(candidate?.items) ? candidate.items.filter(validStoredItem).map(item => ({ ...item, quantity: Math.min(item.quantity, stockFor(item.productId)) })) : [];
        return { ...current, items };
      },
    }
  )
);

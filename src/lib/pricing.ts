import type { CartItem } from "@/types";
import { MOCK_PRODUCTS } from "@/data/products";
export function getCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((total, item) => total + (MOCK_PRODUCTS.find(product => product.id === item.productId)?.price ?? 0) * item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 15 : 0;
  const tax = subtotal * .08;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

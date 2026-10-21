"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/components/features/CartItem";
import { OrderSummary } from "@/components/features/OrderSummary";

export default function CartPage() {
  const items = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);
  if (!items.length) return <div className="site-container flex min-h-[55vh] flex-col items-center justify-center py-20 text-center"><ShoppingBag size={54} className="text-brand-primary" /><p className="eyebrow mt-6 text-brand-secondary">Your bag</p><h1 className="display-serif mt-3 text-4xl">Nothing in your bag yet.</h1><p className="mt-3 text-brand-text-secondary">Find something you love and it will appear here.</p><Link href="/search" className="mt-6 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white">Explore products</Link></div>;
  return <div className="site-container py-9 md:py-14"><p className="eyebrow mb-3 text-brand-secondary">Your bag</p><h1 className="display-serif text-4xl md:text-6xl">Good choices.</h1><p className="mt-3 text-brand-text-secondary">{items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "item" : "items"} in your demo bag.</p><div className="mt-9 grid gap-8 lg:grid-cols-[1fr_350px]"><div><div className="space-y-4">{items.map(item => { const product = MOCK_PRODUCTS.find(candidate => candidate.id === item.productId); return product ? <CartItem key={`${item.productId}-${JSON.stringify(item.variantSelection)}`} product={product} quantity={item.quantity} variantSelection={item.variantSelection} onUpdate={quantity => updateQuantity(item.productId, item.variantSelection, quantity)} onRemove={() => removeItem(item.productId, item.variantSelection)} /> : null; })}</div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={clearCart} className="min-h-11 text-sm font-semibold text-brand-error hover:underline">Clear bag</button><Link href="/search" className="text-sm font-semibold text-brand-primary hover:underline">Continue shopping</Link></div></div><div className="h-fit space-y-4 lg:sticky lg:top-40"><OrderSummary /><Link href="/checkout" className="flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-6 font-semibold text-white hover:bg-[#183aaf]">Continue to checkout preview</Link></div></div></div>;
}


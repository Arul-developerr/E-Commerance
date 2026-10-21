"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/features/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const ids = useWishlistStore(state => state.items);
  const products = MOCK_PRODUCTS.filter(product => ids.includes(product.id));
  if (!products.length) return <div className="site-container flex min-h-[55vh] flex-col items-center justify-center py-20 text-center"><Heart size={54} className="text-brand-primary" /><p className="eyebrow mt-6 text-brand-secondary">Your edit</p><h1 className="display-serif mt-3 text-4xl">Nothing saved yet.</h1><p className="mt-3 text-brand-text-secondary">Tap the heart on any product to keep it close.</p><Link href="/search" className="mt-6 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white">Explore products</Link></div>;
  return <div className="site-container py-9 md:py-14"><p className="eyebrow mb-3 text-brand-secondary">Your edit</p><h1 className="display-serif text-4xl md:text-6xl">Saved for later.</h1><p className="mt-3 text-brand-text-secondary">{products.length} {products.length === 1 ? "product" : "products"} saved in this browser.</p><div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{products.map(product => <ProductCard key={product.id} product={product} />)}</div></div>;
}

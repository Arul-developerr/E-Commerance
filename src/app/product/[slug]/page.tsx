"use client";

import { Suspense, use, useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_CATEGORIES } from "@/data/categories";
import { ProductGrid } from "@/components/features/ProductGrid";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = MOCK_PRODUCTS.find(item => item.slug === slug);
  const saved = useWishlistStore(state => product ? state.items.includes(product.id) : false);
  const toggleSaved = useWishlistStore(state => state.toggleItem);
  const addItem = useCartStore(state => state.addItem);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  if (!product) return <div className="site-container py-24 text-center"><h1 className="display-serif text-4xl">Product not found.</h1><Link href="/search" className="mt-5 inline-block text-brand-primary underline">Explore all products</Link></div>;
  const currentProduct = product;
  const category = MOCK_CATEGORIES.find(item => item.id === product.categoryId);
  const related = MOCK_PRODUCTS.filter(item => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
  function addToCart() {
    if (currentProduct.variants.some(variant => !selected[variant.name])) { setMessage("Choose an option for each variant first."); return; }
    addItem({ productId: currentProduct.id, quantity, variantSelection: selected });
    setMessage(`${quantity} added to your demo bag.`);
  }
  return <div className="site-container py-8 md:py-12">
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-brand-text-secondary"><Link href="/">Home</Link> / <Link href={category ? `/category/${category.slug}` : "/search"}>{category?.name ?? "Shop"}</Link> / {product.name}</nav>
    <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
      <div><div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#ececea]"><ProductImage product={product} sizes="(max-width: 1024px) 100vw, 50vw" /></div><p className="mt-3 text-xs text-brand-text-secondary">Illustrative product imagery for this demo.</p></div>
      <div className="flex flex-col justify-center"><p className="eyebrow text-brand-secondary">{product.brand} · {category?.name}</p><h1 className="display-serif mt-4 text-4xl leading-[1.08] md:text-6xl">{product.name}</h1><p className="mt-4 text-sm text-brand-text-secondary">{product.reviewCount ? `Sample catalogue rating ${product.rating.toFixed(1)} / 5 · ${product.reviewCount} sample ratings` : "No sample ratings yet"}</p><div className="mt-7 flex items-end gap-3"><span className="text-3xl font-bold">${product.price.toFixed(2)}</span>{product.originalPrice && <span className="pb-1 text-lg text-brand-text-secondary line-through">${product.originalPrice.toFixed(2)}</span>}</div><p className="mt-6 max-w-xl leading-7 text-brand-text-secondary">{product.description}</p><p className={`mt-5 text-sm font-semibold ${product.stock ? "text-brand-success" : "text-brand-error"}`}>{product.stock ? `In stock · ${product.stock} in sample data` : "Out of stock"}</p>
      <div className="mt-7 space-y-6">{product.variants.map(variant => <fieldset key={variant.id}><legend className="mb-3 text-sm font-bold">{variant.name} <span className="font-normal text-brand-text-secondary">{selected[variant.name] ? `· ${variant.options.find(option => option.value === selected[variant.name])?.label}` : "· Choose one"}</span></legend><div className="flex flex-wrap gap-2">{variant.options.map(option => <button type="button" key={option.value} disabled={!option.available} aria-pressed={selected[variant.name] === option.value} onClick={() => { setSelected({ ...selected, [variant.name]: option.value }); setMessage(""); }} className={`min-h-11 rounded-full border px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${selected[variant.name] === option.value ? "border-brand-primary bg-brand-primary text-white" : "border-brand-border bg-white hover:border-brand-primary"}`}>{option.label}</button>)}</div></fieldset>)}</div>
      <div className="mt-8 flex flex-wrap gap-3 border-t border-brand-border pt-7"><div className="flex h-12 items-center rounded-full border border-brand-border bg-white"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" className="flex h-11 w-11 items-center justify-center"><Minus size={17} /></button><span className="w-8 text-center text-sm font-bold">{quantity}</span><button type="button" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} aria-label="Increase quantity" className="flex h-11 w-11 items-center justify-center"><Plus size={17} /></button></div><button type="button" disabled={!product.stock} onClick={addToCart} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 font-bold text-white hover:bg-[#183aaf] disabled:opacity-40"><ShoppingBag size={19} />Add to bag</button><button type="button" onClick={() => toggleSaved(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-white"><Heart size={20} className={saved ? "fill-brand-secondary text-brand-secondary" : ""} /></button></div>{message && <p role="status" className="mt-3 text-sm font-semibold text-brand-primary">{message}</p>}<div className="mt-8 rounded-2xl bg-white p-5 text-sm leading-6 text-brand-text-secondary"><span className="font-bold text-brand-text-primary">Demo shopping note.</span> No delivery estimate or payment service is connected. Bag and wishlist choices stay in this browser.</div>
      </div>
    </div>
    <div className="mt-16 border-t border-brand-border pt-10"><h2 className="display-serif text-3xl">Product details.</h2><p className="mt-4 max-w-3xl leading-7 text-brand-text-secondary">{product.description}</p><p className="mt-3 text-sm text-brand-text-secondary">Specifications beyond the description are not available in the sample catalogue.</p></div>
    {related.length > 0 && <div className="mt-8"><ProductGrid title="You might also like." subtitle="More from this category." products={related} /></div>}
  </div>;
}
export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) { return <Suspense fallback={<div className="site-container py-20">Loading product...</div>}><ProductContent params={params} /></Suspense>; }



"use client";

import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { ArrowUpRight, Heart, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export function ProductCard({ product }: { product: Product }) {
  const saved = useWishlistStore(state => state.items.includes(product.id));
  const toggleSaved = useWishlistStore(state => state.toggleItem);
  const addItem = useCartStore(state => state.addItem);
  const hasVariants = product.variants.length > 0;
  return (
    <article className="group min-w-0 overflow-hidden rounded-[1.25rem] border border-brand-border bg-white transition-shadow hover:shadow-[0_20px_45px_-28px_rgba(24,34,56,.5)]">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#f0f0ef]">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 block">
          <ProductImage product={product} className="image-hover" />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-text-primary">New</span>}
          {product.isBestSeller && <span className="rounded-full bg-brand-text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Popular</span>}
        </div>
        <button type="button" onClick={() => toggleSaved(product.id)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-text-primary shadow-sm hover:text-brand-secondary"><Heart size={19} className={saved ? "fill-brand-secondary text-brand-secondary" : ""} /></button>
      </div>
      <div className="flex min-h-[164px] flex-col p-4 sm:p-5">
        <p className="eyebrow text-brand-text-secondary">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="mt-2 line-clamp-2 text-sm font-semibold leading-5 hover:text-brand-primary sm:text-base">{product.name}</Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div><p className="text-base font-bold sm:text-lg">${product.price.toFixed(2)}</p>{product.originalPrice && <p className="text-xs text-brand-text-secondary line-through">${product.originalPrice.toFixed(2)}</p>}</div>
          {hasVariants ? <Link href={`/product/${product.slug}`} aria-label={`Choose options for ${product.name}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-text-primary hover:border-brand-primary hover:text-brand-primary"><ArrowUpRight size={19} /></Link> : <button type="button" onClick={() => addItem({ productId: product.id, quantity: 1, variantSelection: {} })} disabled={product.stock < 1} aria-label={`Add ${product.name} to cart`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white hover:bg-[#183aaf] disabled:opacity-40"><Plus size={20} /></button>}
        </div>
      </div>
    </article>
  );
}

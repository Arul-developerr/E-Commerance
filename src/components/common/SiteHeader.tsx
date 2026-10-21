"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Heart, UserRound, Menu, X, ArrowUpRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_CATEGORIES } from "@/data/categories";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

function SearchBox({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const normalized = query.trim().toLowerCase();
  const suggestions = normalized ? MOCK_PRODUCTS.filter(product => `${product.name} ${product.brand}`.toLowerCase().includes(normalized)).slice(0, 4) : [];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setFocused(false);
    onNavigate?.();
  }
  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <label className="sr-only" htmlFor={onNavigate ? "mobile-search" : "desktop-search"}>Search products</label>
      <input id={onNavigate ? "mobile-search" : "desktop-search"} value={query} onChange={event => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} placeholder="Search products, brands and more" className="h-12 w-full rounded-full border border-brand-border bg-brand-bg pl-5 pr-14 text-sm outline-none transition-colors placeholder:text-brand-text-secondary focus:border-brand-primary focus:bg-white" />
      <button type="submit" aria-label="Submit search" className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white hover:bg-[#183aaf]"><Search size={19} /></button>
      {focused && suggestions.length > 0 && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-brand-border bg-white p-2 shadow-xl">
        <p className="eyebrow px-3 py-2 text-brand-text-secondary">Suggestions</p>
        {suggestions.map(product => <Link key={product.id} href={`/product/${product.slug}`} onClick={onNavigate} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm hover:bg-brand-bg"><span>{product.name}</span><ArrowUpRight size={16} /></Link>)}
      </div>}
    </form>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useWishlistStore(state => state.items.length);
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-lg">
      <div className="bg-brand-text-primary text-center text-[11px] font-medium tracking-wide text-white sm:text-xs"><div className="site-container py-2">Thoughtful finds for every day <span className="mx-2 text-white/35">·</span> Free demo shipping on orders over $500</div></div>
      <div className="site-container flex h-[76px] items-center gap-1 sm:gap-5 lg:gap-10">
        <Link href="/" className="flex shrink-0 items-center gap-1 text-xl font-black tracking-[-.06em] text-brand-text-primary sm:gap-2 sm:text-2xl" aria-label="NexaCart home"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary text-lg text-white sm:h-9 sm:w-9 sm:text-xl">N</span>Nexa<span className="text-brand-primary">Cart</span></Link>
        <div className="hidden max-w-xl flex-1 md:block"><SearchBox /></div>
        <nav aria-label="Account and shopping" className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link href="/account/profile" className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-brand-bg sm:flex"><UserRound size={20} /><span className="hidden lg:inline">Account</span></Link>
          <Link href="/wishlist" aria-label={`Wishlist, ${wishlistCount} saved`} className="relative flex h-10 min-w-10 items-center justify-center rounded-full hover:bg-brand-bg sm:h-11 sm:min-w-11"><Heart size={21} />{wishlistCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-secondary px-1 text-[10px] text-white">{wishlistCount}</span>}</Link>
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="relative flex h-10 min-w-10 items-center justify-center rounded-full hover:bg-brand-bg sm:h-11 sm:min-w-11"><ShoppingBag size={21} />{cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] text-white">{cartCount}</span>}</Link>
          <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-brand-bg sm:h-11 sm:w-11 md:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </nav>
      </div>
      <div className="hidden border-t border-brand-border md:block"><nav aria-label="Shop categories" className="site-container flex items-center gap-6 overflow-x-auto py-3 text-[13px] font-semibold text-brand-text-secondary"><Link href="/search" className="whitespace-nowrap text-brand-primary hover:underline">Shop all</Link>{MOCK_CATEGORIES.map(category => <Link key={category.id} href={`/category/${category.slug}`} className="whitespace-nowrap hover:text-brand-primary">{category.name}</Link>)}<Link href="/seller" className="ml-auto whitespace-nowrap hover:text-brand-primary">Seller demo</Link></nav></div>
      {open && <div className="border-t border-brand-border bg-white md:hidden"><div className="site-container space-y-4 py-4"><SearchBox onNavigate={() => setOpen(false)} /><nav aria-label="Mobile categories" className="grid grid-cols-2 gap-1 text-sm font-semibold"><Link onClick={() => setOpen(false)} href="/search" className="rounded-lg px-3 py-3 text-brand-primary">Shop all</Link><Link onClick={() => setOpen(false)} href="/account/profile" className="rounded-lg px-3 py-3">Account demo</Link>{MOCK_CATEGORIES.map(category => <Link onClick={() => setOpen(false)} key={category.id} href={`/category/${category.slug}`} className="rounded-lg px-3 py-3 hover:bg-brand-bg">{category.name}</Link>)}</nav></div></div>}
    </header>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MOCK_CATEGORIES } from "@/data/categories";

export function SiteFooter() {
  return <footer className="border-t border-brand-border bg-[#eaece9] pt-14">
    <div className="site-container grid gap-10 pb-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
      <div><Link href="/" className="text-2xl font-black tracking-[-.06em]">Nexa<span className="text-brand-primary">Cart</span></Link><p className="mt-4 max-w-xs text-sm leading-7 text-brand-text-secondary">Thoughtfully chosen finds for your everyday. This is a frontend demo storefront with sample products and local shopping state.</p><Link href="/search" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-primary hover:underline">Explore the collection <ArrowUpRight size={15} /></Link></div>
      <div><h2 className="eyebrow mb-5 text-brand-text-primary">Shop</h2><ul className="space-y-3 text-sm text-brand-text-secondary"><li><Link href="/search" className="hover:text-brand-primary">All products</Link></li>{MOCK_CATEGORIES.slice(0, 4).map(category => <li key={category.id}><Link href={`/category/${category.slug}`} className="hover:text-brand-primary">{category.name}</Link></li>)}</ul></div>
      <div><h2 className="eyebrow mb-5 text-brand-text-primary">Your space</h2><ul className="space-y-3 text-sm text-brand-text-secondary"><li><Link href="/wishlist" className="hover:text-brand-primary">Wishlist</Link></li><li><Link href="/cart" className="hover:text-brand-primary">Shopping bag</Link></li><li><Link href="/account/profile" className="hover:text-brand-primary">Account demo</Link></li><li><Link href="/seller" className="hover:text-brand-primary">Seller demo</Link></li></ul></div>
      <div><h2 className="eyebrow mb-5 text-brand-text-primary">About this demo</h2><p className="text-sm leading-7 text-brand-text-secondary">Cart and wishlist save to this browser. Checkout is a simulation; no payment, order, shipping or support service is connected.</p></div>
    </div>
    <div className="border-t border-brand-text-primary/10"><div className="site-container flex flex-col justify-between gap-2 py-5 text-xs text-brand-text-secondary sm:flex-row"><span>© 2026 NexaCart.</span><span>Designed for discovery · Frontend demonstration</span></div></div>
  </footer>;
}

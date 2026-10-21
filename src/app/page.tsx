import { ArrowRight, Heart, PackageCheck, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/features/Hero";
import { CategoryDiscovery } from "@/components/features/CategoryDiscovery";
import { ProductGrid } from "@/components/features/ProductGrid";
import { PromoBanner } from "@/components/features/PromoBanner";
import { MOCK_PRODUCTS } from "@/data/products";

export default function HomePage() {
  const featured = MOCK_PRODUCTS.filter(product => product.isFeatured).slice(0, 4);
  const bestSellers = MOCK_PRODUCTS.filter(product => product.isBestSeller);
  const newArrivals = MOCK_PRODUCTS.filter(product => product.isNew);
  return <>
    <Hero />
    <div className="site-container mt-5 grid gap-2 rounded-2xl border border-brand-border bg-white px-5 py-4 text-xs font-semibold text-brand-text-secondary sm:grid-cols-3 sm:gap-4 md:text-sm"><div className="flex items-center gap-3"><SlidersHorizontal size={18} className="text-brand-primary" />Discover by category and price</div><div className="flex items-center gap-3"><Heart size={18} className="text-brand-primary" />Save favorites for later</div><div className="flex items-center gap-3"><PackageCheck size={18} className="text-brand-primary" />Simple demo checkout</div></div>
    <CategoryDiscovery />
    <ProductGrid title="The good list." subtitle="Pieces that stand out across the collection." products={featured} />
    <div className="site-container py-3 md:py-8"><PromoBanner title="A little more room for living." subtitle="Thoughtful home pieces and useful objects for the spaces you love most." ctaText="Explore home" ctaLink="/category/home-kitchen" imageIndex={4} /></div>
    <ProductGrid title="Popular picks." subtitle="Explore favorites from the demo catalogue." products={bestSellers} />
    <div className="site-container py-3 md:py-8"><PromoBanner variant="secondary" title="Fresh perspective, fresh finds." subtitle="A smaller edit of recent additions to the collection." ctaText="See new arrivals" ctaLink="/search?sort=new" imageIndex={5} /></div>
    <ProductGrid title="Just landed." subtitle="Newly added to NexaCart." products={newArrivals} />
    <div className="site-container mb-16 mt-4 flex flex-col items-start justify-between gap-5 rounded-[1.75rem] bg-brand-primary p-8 text-white sm:flex-row sm:items-center md:p-12"><div><p className="eyebrow text-white/70">The whole collection</p><h2 className="display-serif mt-2 text-3xl md:text-4xl">Your next favorite is here.</h2></div><Link href="/search" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-brand-primary">Shop all products <ArrowRight size={17} /></Link></div>
  </>;
}

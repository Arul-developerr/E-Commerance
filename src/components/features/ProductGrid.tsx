import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ArrowUpRight } from "lucide-react";

export function ProductGrid({ products, title, subtitle }: { products: Product[]; title: string; subtitle?: string }) {
  if (!products.length) return null;
  return <section className={title ? "site-container py-10 md:py-16" : ""}>
    {title && <div className="mb-7 flex items-end justify-between gap-4 md:mb-9"><div><p className="eyebrow mb-3 text-brand-secondary">NexaCart edit</p><h2 className="display-serif text-4xl leading-none md:text-5xl">{title}</h2>{subtitle && <p className="mt-3 text-sm text-brand-text-secondary md:text-base">{subtitle}</p>}</div><Link href="/search" className="hidden shrink-0 items-center gap-2 text-sm font-bold text-brand-primary hover:underline sm:flex">View all <ArrowUpRight size={16} /></Link></div>}
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
  </section>;
}

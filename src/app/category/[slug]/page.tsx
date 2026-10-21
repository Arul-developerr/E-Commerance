"use client";

import { Suspense, use, useMemo, useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_CATEGORIES } from "@/data/categories";
import { ProductGrid } from "@/components/features/ProductGrid";
import { FilterSidebar } from "@/components/features/FilterSidebar";
import { defaultFilters, type CatalogFilters } from "@/lib/catalog";
import { filterProducts, sortProducts, type SortOrder } from "@/lib/product-catalog";

function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = MOCK_CATEGORIES.find(item => item.slug === slug);
  const [filters, setFilters] = useState<CatalogFilters>({ ...defaultFilters });
  const [sort, setSort] = useState<SortOrder>("featured");
  const source = useMemo(() => MOCK_PRODUCTS.filter(product => product.categoryId === category?.id), [category]);
  const brands = [...new Set(source.map(product => product.brand))];
  const products = useMemo(() => sortProducts(filterProducts(source, filters), sort), [source, filters, sort]);
  if (!category) return <div className="site-container py-24 text-center"><h1 className="display-serif text-4xl">Category not found.</h1><Link href="/search" className="mt-5 inline-block text-brand-primary underline">Shop all products</Link></div>;
  return <div className="site-container py-8 md:py-12">
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-brand-text-secondary"><Link href="/" className="hover:text-brand-primary">Home</Link> / <Link href="/search" className="hover:text-brand-primary">Shop</Link> / {category.name}</nav>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3 text-brand-secondary">NexaCart categories</p><h1 className="display-serif text-4xl md:text-6xl">{category.name}</h1><p className="mt-3 max-w-xl text-brand-text-secondary">{category.description} <span className="font-semibold text-brand-text-primary">{products.length} products</span></p></div><label className="flex items-center gap-3 text-sm font-semibold">Sort by <select value={sort} onChange={event => setSort(event.target.value as SortOrder)} className="min-h-11 rounded-full border border-brand-border bg-white px-4 text-sm"><option value="featured">Featured</option><option value="new">New arrivals</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Rating</option></select></label></div>
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8"><FilterSidebar activeFilters={filters} onFilterChange={setFilters} categories={[]} brands={brands} /><div className="min-w-0 flex-1">{products.length ? <ProductGrid title="" products={products} /> : <div className="surface-card px-6 py-20 text-center"><h2 className="display-serif text-3xl">No products match these filters.</h2><button type="button" onClick={() => setFilters({ ...defaultFilters })} className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Clear filters</button></div>}</div></div>
  </div>;
}
export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { return <Suspense fallback={<div className="site-container py-20">Loading category...</div>}><CategoryContent params={params} /></Suspense>; }

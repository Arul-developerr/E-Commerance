"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_CATEGORIES } from "@/data/categories";
import { ProductGrid } from "@/components/features/ProductGrid";
import { FilterSidebar } from "@/components/features/FilterSidebar";
import { defaultFilters, type CatalogFilters } from "@/lib/catalog";
import { filterProducts, sortProducts, type SortOrder } from "@/lib/product-catalog";

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [filters, setFilters] = useState<CatalogFilters>({ ...defaultFilters });
  const [sort, setSort] = useState<SortOrder>(params.get("sort") === "new" ? "new" : "featured");
  const categories = MOCK_CATEGORIES.map(category => category.name);
  const brands = [...new Set(MOCK_PRODUCTS.map(product => product.brand))];
  const products = useMemo(() => sortProducts(filterProducts(MOCK_PRODUCTS, filters, query), sort), [filters, query, sort]);
  return <div className="site-container py-8 md:py-12">
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-brand-text-secondary"><Link href="/" className="hover:text-brand-primary">Home</Link> / Shop all</nav>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3 text-brand-secondary">The collection</p><h1 className="display-serif text-4xl md:text-6xl">{query ? `Results for “${query}”` : "Explore it all."}</h1><p className="mt-3 text-sm text-brand-text-secondary">{products.length} {products.length === 1 ? "product" : "products"} found</p></div><label className="flex items-center gap-3 text-sm font-semibold">Sort by <select value={sort} onChange={event => setSort(event.target.value as SortOrder)} className="min-h-11 rounded-full border border-brand-border bg-white px-4 text-sm"><option value="featured">Featured</option><option value="new">New arrivals</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Rating</option></select></label></div>
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8"><FilterSidebar activeFilters={filters} onFilterChange={setFilters} categories={categories} brands={brands} /><div className="min-w-0 flex-1">{products.length ? <ProductGrid title="" products={products} /> : <div className="surface-card px-6 py-20 text-center"><h2 className="display-serif text-3xl">No matches this time.</h2><p className="mt-3 text-brand-text-secondary">Try another search or clear your filters.</p><button type="button" onClick={() => setFilters({ ...defaultFilters })} className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Clear filters</button></div>}</div></div>
  </div>;
}
export default function SearchPage() { return <Suspense fallback={<div className="site-container py-20">Loading products...</div>}><SearchContent /></Suspense>; }

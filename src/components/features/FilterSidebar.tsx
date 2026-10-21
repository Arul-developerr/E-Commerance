"use client";

import { useState } from "react";
import type { CatalogFilters } from "@/lib/catalog";
import { defaultFilters } from "@/lib/catalog";

interface FilterSidebarProps { activeFilters: CatalogFilters; onFilterChange: (filters: CatalogFilters) => void; categories: string[]; brands: string[] }
export function FilterSidebar({ activeFilters, onFilterChange, categories, brands }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  function toggle(type: "categories" | "brands", value: string) {
    const selected = activeFilters[type];
    onFilterChange({ ...activeFilters, [type]: selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value] });
  }
  return <aside className="surface-card h-fit overflow-hidden lg:w-64 lg:shrink-0">
    <button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} className="w-full px-5 py-4 text-left text-sm font-bold lg:hidden">Filter products <span className="float-right text-brand-primary">{mobileOpen ? "−" : "＋"}</span></button>
    <div className={`${mobileOpen ? "block" : "hidden"} space-y-6 border-t border-brand-border p-5 lg:block lg:border-0`}>
      <div className="flex items-center justify-between"><h2 className="text-base font-bold">Filters</h2><button type="button" onClick={() => onFilterChange({ ...defaultFilters })} className="text-xs font-semibold text-brand-primary hover:underline">Clear all</button></div>
      {categories.length > 0 && <fieldset><legend className="eyebrow mb-3 text-brand-text-secondary">Categories</legend><div className="space-y-2">{categories.map(category => <label key={category} className="flex min-h-9 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={activeFilters.categories.includes(category)} onChange={() => toggle("categories", category)} className="h-4 w-4 accent-brand-primary" />{category}</label>)}</div></fieldset>}
      <fieldset><legend className="eyebrow mb-3 text-brand-text-secondary">Brands</legend><div className="max-h-48 space-y-2 overflow-auto">{brands.map(brand => <label key={brand} className="flex min-h-9 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={activeFilters.brands.includes(brand)} onChange={() => toggle("brands", brand)} className="h-4 w-4 accent-brand-primary" />{brand}</label>)}</div></fieldset>
      <fieldset><legend className="eyebrow mb-3 text-brand-text-secondary">Price</legend><div className="flex gap-2"><label className="min-w-0 flex-1 text-xs text-brand-text-secondary">Min <input type="number" min="0" value={activeFilters.priceRange[0]} onChange={event => onFilterChange({ ...activeFilters, priceRange: [Number(event.target.value), activeFilters.priceRange[1]] })} className="mt-1 w-full rounded-lg border border-brand-border p-2 text-sm text-brand-text-primary" /></label><label className="min-w-0 flex-1 text-xs text-brand-text-secondary">Max <input type="number" min="0" value={activeFilters.priceRange[1]} onChange={event => onFilterChange({ ...activeFilters, priceRange: [activeFilters.priceRange[0], Number(event.target.value)] })} className="mt-1 w-full rounded-lg border border-brand-border p-2 text-sm text-brand-text-primary" /></label></div></fieldset>
      <fieldset><legend className="eyebrow mb-3 text-brand-text-secondary">Minimum rating</legend><div className="flex gap-2">{[0, 3, 4].map(rating => <button key={rating} type="button" aria-pressed={activeFilters.minRating === rating} onClick={() => onFilterChange({ ...activeFilters, minRating: rating })} className={`min-h-9 rounded-full border px-3 text-xs font-semibold ${activeFilters.minRating === rating ? "border-brand-primary bg-brand-primary text-white" : "border-brand-border bg-white"}`}>{rating ? `${rating}+ ★` : "Any"}</button>)}</div></fieldset>
      <label className="flex min-h-9 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={activeFilters.inStock} onChange={event => onFilterChange({ ...activeFilters, inStock: event.target.checked })} className="h-4 w-4 accent-brand-primary" />In stock only</label>
    </div>
  </aside>;
}

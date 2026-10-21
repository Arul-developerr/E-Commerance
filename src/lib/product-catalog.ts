import type { Product } from "@/types";
import { MOCK_CATEGORIES } from "@/data/categories";
import type { CatalogFilters } from "@/lib/catalog";

export type SortOrder = "featured" | "new" | "price-asc" | "price-desc" | "rating";
export function filterProducts(products: Product[], filters: CatalogFilters, query = "") {
  const search = query.trim().toLowerCase();
  return products.filter(product => {
    const category = MOCK_CATEGORIES.find(item => item.id === product.categoryId);
    const searchable = `${product.name} ${product.brand} ${category?.name ?? ""} ${product.description}`.toLowerCase();
    return (!search || searchable.includes(search)) &&
      (!filters.categories.length || !!category && filters.categories.includes(category.name)) &&
      (!filters.brands.length || filters.brands.includes(product.brand)) &&
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1] &&
      product.rating >= filters.minRating && (!filters.inStock || product.stock > 0);
  });
}
export function sortProducts(products: Product[], sort: SortOrder) {
  const result = [...products];
  if (sort === "price-asc") return result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return result.sort((a, b) => b.price - a.price);
  if (sort === "rating") return result.sort((a, b) => b.rating - a.rating);
  if (sort === "new") return result.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  return result.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
}

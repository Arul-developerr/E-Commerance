export type CatalogFilters = {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  minRating: number;
  inStock: boolean;
};

export const defaultFilters: CatalogFilters = { categories: [], brands: [], priceRange: [0, 10000], minRating: 0, inStock: false };

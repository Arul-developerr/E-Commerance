export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
};

export type ProductVariant = {
  id: string;
  name: string; // e.g., "Color" or "Size"
  options: {
    label: string;
    value: string;
    hex?: string; // For colors
    available: boolean;
  }[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export type CartItem = {
  productId: string;
  variantSelection: Record<string, string>; // e.g., { "Color": "Blue", "Size": "L" }
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }[];
};

import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/data/products";
export function generateStaticParams() { return MOCK_PRODUCTS.map(product => ({ slug: product.slug })); }
export const metadata: Metadata = { title: "Product details | NexaCart", description: "Explore product details, options and illustrative imagery in the NexaCart demo catalogue." };
export default function ProductLayout({ children }: { children: React.ReactNode }) { return children; }

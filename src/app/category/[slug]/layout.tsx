import type { Metadata } from "next";
import { MOCK_CATEGORIES } from "@/data/categories";
export function generateStaticParams() { return MOCK_CATEGORIES.map(category => ({ slug: category.slug })); }
export const metadata: Metadata = { title: "Shop categories | NexaCart", description: "Discover products by category in the NexaCart demo catalogue." };
export default function CategoryLayout({ children }: { children: React.ReactNode }) { return children; }

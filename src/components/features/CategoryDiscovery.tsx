import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MOCK_CATEGORIES } from "@/data/categories";

export function CategoryDiscovery() {
  return <section className="site-container py-14 md:py-20">
    <div className="mb-7 flex items-end justify-between gap-4 md:mb-9"><div><p className="eyebrow mb-3 text-brand-secondary">Browse by mood</p><h2 className="display-serif text-4xl md:text-5xl">Find your corner.</h2></div><Link href="/search" className="hidden items-center gap-2 text-sm font-bold text-brand-primary hover:underline sm:flex">Explore everything <ArrowUpRight size={16} /></Link></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-7">{MOCK_CATEGORIES.map(category => <Link href={`/category/${category.slug}`} key={category.id} className="group min-w-0"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9e8e4]"><Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw" className="image-hover object-cover" /></div><div className="mt-3 flex items-center justify-between gap-1"><h3 className="text-sm font-semibold sm:text-base">{category.name}</h3><ArrowUpRight size={16} className="shrink-0 text-brand-primary" /></div></Link>)}</div>
  </section>;
}


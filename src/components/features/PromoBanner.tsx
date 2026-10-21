import Link from "next/link";
import { AtlasImage } from "@/components/ui/AtlasImage";
import { ArrowUpRight } from "lucide-react";

export interface PromoBannerProps { title: string; subtitle: string; ctaText: string; ctaLink: string; imageIndex: number; variant?: "primary" | "secondary" }
export function PromoBanner({ title, subtitle, ctaText, ctaLink, imageIndex, variant = "primary" }: PromoBannerProps) {
  return <div className={`grid overflow-hidden rounded-[1.75rem] md:grid-cols-2 ${variant === "primary" ? "bg-[#e9e8e2]" : "bg-[#e0e7ea]"}`}>
    <div className="flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16"><p className="eyebrow mb-5 text-brand-secondary">A closer look</p><h2 className="display-serif max-w-lg text-4xl leading-[1.05] md:text-5xl">{title}</h2><p className="mt-5 max-w-md leading-7 text-brand-text-secondary">{subtitle}</p><Link href={ctaLink} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-text-primary px-6 text-sm font-semibold text-white hover:bg-brand-primary">{ctaText}<ArrowUpRight size={17} /></Link></div>
    <div className="relative min-h-[260px] overflow-hidden md:min-h-[380px]"><AtlasImage index={imageIndex} /></div>
  </div>;
}

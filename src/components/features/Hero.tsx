import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="site-container pt-5 md:pt-8">
      <div className="relative grid min-h-[540px] overflow-hidden rounded-[1.75rem] bg-[#d9dfdd] md:grid-cols-[.95fr_1.05fr] md:rounded-[2.25rem]">
        <div className="relative z-10 flex min-w-0 flex-col justify-center p-6 pb-10 sm:p-12 lg:p-16">
          <span className="eyebrow mb-7 flex items-center gap-2 text-brand-primary"><Sparkles size={15} /> The good things, thoughtfully chosen</span>
          <h1 className="display-serif max-w-[690px] text-[clamp(2.55rem,13vw,3.25rem)] leading-[.96] text-brand-text-primary md:text-[clamp(3.25rem,7vw,6.9rem)]">Find your<br /><em className="font-normal text-brand-primary">everyday</em><br />exceptional.</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-brand-text-secondary md:text-lg">Explore standout pieces for the way you live, work and unwind. A better way to discover what you love.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/search" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-primary px-6 font-semibold text-white transition-colors hover:bg-[#183aaf]">Explore products <ArrowUpRight size={18} /></Link>
            <Link href="/category/fashion" className="inline-flex min-h-12 items-center rounded-full border border-[#788598] px-6 font-semibold text-brand-text-primary transition-colors hover:bg-white/60">Shop the edit</Link>
          </div>
          <p className="mt-9 text-xs font-medium tracking-wide text-brand-text-secondary">A curated demo storefront · 8 sample products</p>
        </div>
        <div className="relative min-h-[290px] md:min-h-full">
          <Image src="/editorial-hero.png" alt="A thoughtfully styled living room with curated objects" fill sizes="(max-width: 768px) 100vw, 55vw" priority className="object-cover" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#d9dfdd] via-[#d9dfdd]/15 to-transparent md:block" />
          <div className="absolute bottom-6 right-6 rounded-2xl border border-white/60 bg-white/85 px-5 py-4 shadow-xl backdrop-blur-sm">
            <p className="eyebrow text-brand-secondary">In focus</p>
            <p className="display-serif mt-1 text-2xl">The new essentials</p>
          </div>
        </div>
      </div>
    </section>
  );
}

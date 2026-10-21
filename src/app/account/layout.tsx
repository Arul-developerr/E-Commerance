import type { ReactNode } from "react";
import Link from "next/link";
import { UserRound, PackageOpen, Heart } from "lucide-react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <div className="site-container py-9 md:py-14"><p className="eyebrow mb-3 text-brand-secondary">Your space</p><h1 className="display-serif text-4xl md:text-6xl">Account demo.</h1><p className="mt-4 max-w-2xl text-brand-text-secondary">No sign-in or customer account is connected. Profile details are saved only in this browser.</p><div className="mt-10 grid gap-6 lg:grid-cols-[240px_1fr]"><nav aria-label="Account sections" className="surface-card flex h-fit flex-col p-3 text-sm font-semibold"><Link href="/account/profile" className="flex min-h-11 items-center gap-3 rounded-xl px-4 hover:bg-brand-bg"><UserRound size={18} />Profile</Link><Link href="/account/orders" className="flex min-h-11 items-center gap-3 rounded-xl px-4 hover:bg-brand-bg"><PackageOpen size={18} />Orders</Link><Link href="/wishlist" className="flex min-h-11 items-center gap-3 rounded-xl px-4 hover:bg-brand-bg"><Heart size={18} />Wishlist</Link></nav><main className="surface-card min-w-0 p-6 md:p-9">{children}</main></div></div>;
}

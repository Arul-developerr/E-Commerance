"use client";

import { useCartStore } from "@/store/useCartStore";
import { getCartTotals } from "@/lib/pricing";

export function OrderSummary() {
  const items = useCartStore(state => state.items);
  const { subtotal, shipping, tax, total } = getCartTotals(items);
  return <div className="surface-card p-6"><h2 className="text-lg font-bold">Bag summary</h2><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between"><span className="text-brand-text-secondary">Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span className="text-brand-text-secondary">Demo shipping</span><span>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</span></div><div className="flex justify-between"><span className="text-brand-text-secondary">Estimated tax (8%)</span><span>${tax.toFixed(2)}</span></div><div className="flex justify-between border-t border-brand-border pt-4 text-base font-bold"><span>Demo total</span><span>${total.toFixed(2)}</span></div></div><p className="mt-5 text-xs leading-5 text-brand-text-secondary">These are sample estimates. No delivery or tax service is connected.</p></div>;
}

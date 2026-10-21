import Image from "next/image";
import type { Product } from "@/types";

export function ProductImage({ product, className = "", sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" }: { product: Product; className?: string; sizes?: string }) {
  return <Image src={product.images[0]} alt={product.name} fill sizes={sizes} className={`object-cover ${className}`} />;
}

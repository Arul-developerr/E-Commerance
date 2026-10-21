import type { CSSProperties } from "react";
import Image from "next/image";

export function AtlasImage({ index, alt = "", className = "" }: { index: number; alt?: string; className?: string }) {
  const style: CSSProperties = { width: "400%", height: "200%", maxWidth: "none", left: `-${(index % 4) * 100}%`, top: `-${Math.floor(index / 4) * 100}%` };
  return <Image src="/product-atlas.png" width={1536} height={1024} alt={alt} aria-hidden={alt ? undefined : true} className={`absolute ${className}`} style={style} />;
}

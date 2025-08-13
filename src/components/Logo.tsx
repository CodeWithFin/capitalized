"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logo({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState<string>("/logo.svg");
  return (
    <Image
      src={src}
      alt="Capitalized logo"
      width={180}
      height={40}
      priority
      className={className}
      onError={() => {
        // If a custom PNG is later provided and fails, fall back to SVG
        if (src !== "/logo.svg") setSrc("/logo.svg");
      }}
    />
  );
}



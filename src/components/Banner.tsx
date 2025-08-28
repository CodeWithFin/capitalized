"use client";
import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const [src, setSrc] = useState<string>("/images/capitalized3.png");
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={src}
          alt="Capitalized fireside breakfast chat - Energy x AI"
          fill
          className="object-cover"
          priority
          onError={() => setSrc("/images/main-banner.jpg")}
        />
      </div>
      <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-600">Powered by Capital Club, Siscom</div>
    </div>
  );
}



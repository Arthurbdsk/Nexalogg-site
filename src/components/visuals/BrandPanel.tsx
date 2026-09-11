'use client';

import Image from 'next/image';
import { usePointerOffset } from '@/hooks/usePointerOffset';

export function BrandPanel() {
  const { ref: pointerRef, offset } = usePointerOffset<HTMLDivElement>(1);

  return (
    <div
      ref={pointerRef}
      className="pointer-events-none absolute inset-y-0 right-[-22%] hidden w-[70%] items-center sm:flex lg:right-[-12%] lg:w-[54%]"
      aria-hidden="true"
    >
      <div
        className="relative aspect-[1.074] w-full opacity-90 transition-transform duration-700 ease-outexpo motion-safe:animate-driftin"
        style={{
          transform: `translate3d(${offset.x * 10}px, ${offset.y * 10}px, 0)`,
        }}
      >
        <Image
          src="/images/nexallog-simbolo-oficial.png"
          alt=""
          fill
          priority
          sizes="54vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

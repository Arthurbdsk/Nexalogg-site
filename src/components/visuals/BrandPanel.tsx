import Image from 'next/image';

export function BrandPanel() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-[clamp(1rem,3vw,4rem)] w-[68%] opacity-10 sm:w-[48%] sm:opacity-90 lg:w-[42%]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 motion-safe:animate-x-enter-top"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
      >
        <Image
          src="/images/nexallog-simbolo-oficial.png"
          alt=""
          fill
          priority
          sizes="(max-width: 639px) 68vw, (max-width: 1023px) 48vw, 42vw"
          className="object-contain object-right"
        />
      </div>

      <div
        className="absolute inset-0 motion-safe:animate-x-enter-bottom"
        style={{ clipPath: 'inset(50% 0 0 0)' }}
      >
        <Image
          src="/images/nexallog-simbolo-oficial.png"
          alt=""
          fill
          priority
          sizes="(max-width: 639px) 68vw, (max-width: 1023px) 48vw, 42vw"
          className="object-contain object-right"
        />
      </div>
    </div>
  );
}

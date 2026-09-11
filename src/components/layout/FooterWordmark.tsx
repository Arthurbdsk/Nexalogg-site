import { Logo } from '@/components/ui/Logo';

export function FooterWordmark() {
  return (
    <div aria-hidden="true" className="mt-16 border-t border-line/15 pt-12 lg:mt-20 lg:pt-16">
      <Logo surface="dark" className="w-full max-w-[48rem]" />
    </div>
  );
}

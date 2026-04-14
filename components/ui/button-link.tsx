import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ButtonLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-cyan-30 bg-white-10 px-5 py-3 text-sm font-medium text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:border-cyan-60 hover:bg-white-15',
        className,
      )}
    >
      {children}
    </Link>
  );
}

import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({ href, children, className = '' }: ButtonLinkProps) {
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  );
}

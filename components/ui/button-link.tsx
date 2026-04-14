import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function ButtonLink({ 
  href, 
  children, 
  className = '',
  variant = 'primary' 
}: ButtonLinkProps) {
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 ${className} ${
        variant === 'primary' 
          ? 'bg-gradient-to-r from-cyan to-cyan/80 text-black hover:shadow-[0_10px_30px_rgba(0,242,255,0.4)]' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      {children}
    </Link>
  );
}

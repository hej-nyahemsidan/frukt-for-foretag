import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResellerLogoProps {
  src: string;
  name: string;
  className?: string;
}

export default function ResellerLogo({ src, name, className }: ResellerLogoProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (failedSource === src) {
    return <span className="font-semibold text-foreground">{name}</span>;
  }

  return (
    <span className={cn('inline-flex max-w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-charcoal', className)}>
      <img
        src={src}
        alt={name}
        className="h-10 w-auto max-w-40 object-contain sm:max-w-48"
        onError={() => setFailedSource(src)}
      />
    </span>
  );
}
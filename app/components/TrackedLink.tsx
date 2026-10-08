'use client';

import type { ReactNode } from 'react';
import { track } from '@vercel/analytics';

type Props = {
  href: string;
  event: string;
  data?: Record<string, string>;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

/** A plain link that also records a Vercel Analytics event when clicked. */
export default function TrackedLink({ href, event, data, external, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, data)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

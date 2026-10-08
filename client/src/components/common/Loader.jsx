import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader({ className = '', size = 24 }) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`} aria-label="Loading">
      <Loader2 size={size} className="animate-spin text-accent" />
    </div>
  );
}

export function Skeleton({ className = '', variant = 'line' }) {
  const baseClasses = 'bg-glass-strong animate-pulse border border-glass-border';
  const variants = {
    line: 'h-4 w-full rounded',
    card: 'h-32 w-full rounded-xl',
    circle: 'h-10 w-10 rounded-full'
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} aria-hidden="true" />;
}

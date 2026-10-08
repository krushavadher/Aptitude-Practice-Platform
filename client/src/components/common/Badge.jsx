import React from 'react';

export function Badge({ variant = 'neutral', icon: Icon, children, className = '' }) {
  const variants = {
    neutral: 'border-glass-border text-secondary',
    success: 'border-success text-success-text',
    error: 'border-error text-error-text',
    warning: 'border-warning text-warning-text',
    accent: 'border-accent text-accent',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-glass ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}

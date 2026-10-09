import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  to,
  href,
  children,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
  };

  const variantClasses = {
    primary: 'bg-[color:var(--primary)] text-white hover:bg-[color:var(--primary-hover)]',
    secondary: 'bg-glass border border-glass-border hover:bg-glass-strong',
    ghost: 'hover:bg-glass hover:text-[color:var(--primary)]',
    danger: 'bg-error text-white border border-error hover:opacity-90',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  const finalDisabled = disabled || isLoading;

  if (to || href) {
    const Component = to ? Link : 'a';
    const linkProps = to ? { to } : { href };
    return (
      <Component className={combinedClasses} {...linkProps} {...props} aria-busy={isLoading}>
        {content}
      </Component>
    );
  }

  return (
    <button className={combinedClasses} disabled={finalDisabled} aria-busy={isLoading} {...props}>
      {content}
    </button>
  );
}

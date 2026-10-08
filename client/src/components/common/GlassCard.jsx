import React from 'react';

/**
 * @param {boolean} strong - Use strong glass background
 * @param {string} padding - Padding class, default 'p-6'
 * @param {string} className - Additional classes
 * @param {string|React.ElementType} as - Render element
 */
export function GlassCard({ strong = false, padding = 'p-6', className = '', as: Component = 'div', children, ...props }) {
  const baseClass = strong ? 'glass-strong' : 'glass';
  return (
    <Component className={`${baseClass} ${padding} ${className}`} {...props}>
      {children}
    </Component>
  );
}

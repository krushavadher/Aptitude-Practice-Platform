import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, currentPage, totalPages, onChange, onPageChange, className = '' }) {
  const current = page || currentPage || 1;
  const handleChange = onChange || onPageChange;

  if (totalPages <= 1) return null;

  // Calculate sliding window for pages (max 5 visible)
  let start = Math.max(1, current - 2);
  let end = Math.min(totalPages, current + 2);
  
  if (current <= 3) end = Math.min(totalPages, 5);
  if (current >= totalPages - 2) start = Math.max(1, totalPages - 4);
  
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      <button
        onClick={() => handleChange(current - 1)}
        disabled={current === 1}
        className="p-1 rounded-lg hover:bg-glass-strong disabled:opacity-50 focus-visible surface-solid transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>
      
      <div className="flex gap-1 hidden sm:flex">
        {start > 1 && (
          <>
            <button onClick={() => handleChange(1)} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors focus-visible surface-solid text-primary hover:bg-glass-strong">1</button>
            {start > 2 && <span className="w-8 h-8 flex items-center justify-center text-secondary">...</span>}
          </>
        )}
        
        {pages.map(p => (
          <button
            key={p}
            onClick={() => handleChange(p)}
            aria-current={current === p ? 'page' : undefined}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors focus-visible ${
              current === p ? 'bg-accent text-on-accent' : 'surface-solid text-primary hover:bg-glass-strong'
            }`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="w-8 h-8 flex items-center justify-center text-secondary">...</span>}
            <button onClick={() => handleChange(totalPages)} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors focus-visible surface-solid text-primary hover:bg-glass-strong">{totalPages}</button>
          </>
        )}
      </div>
      
      <div className="sm:hidden text-sm font-medium text-primary px-3">
        Page {current} of {totalPages}
      </div>

      <button
        onClick={() => handleChange(current + 1)}
        disabled={current === totalPages}
        className="p-1 rounded-lg hover:bg-glass-strong disabled:opacity-50 focus-visible surface-solid transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>
    </nav>
  );
}

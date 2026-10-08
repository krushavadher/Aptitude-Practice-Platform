import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, totalPages, onChange, className = '' }) {
  if (totalPages <= 1) return null;

  // Simple pagination logic for pages 1..totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-1 rounded-lg hover:bg-glass-strong disabled:opacity-50 focus-visible surface-solid transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>
      
      <div className="flex gap-1 hidden sm:flex">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={page === p ? 'page' : undefined}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors focus-visible ${
              page === p ? 'bg-accent text-on-accent' : 'surface-solid text-primary hover:bg-glass-strong'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      
      <div className="sm:hidden text-sm font-medium text-primary px-3">
        Page {page} of {totalPages}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-1 rounded-lg hover:bg-glass-strong disabled:opacity-50 focus-visible surface-solid transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>
    </nav>
  );
}

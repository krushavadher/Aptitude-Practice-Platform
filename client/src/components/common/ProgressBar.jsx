import React from 'react';

export function ProgressBar({ value, max, label, tone = 'accent', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const toneClasses = {
    accent: 'bg-accent',
    warning: 'bg-warning',
    error: 'bg-error'
  };

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max} aria-label={label}>
      <div className="h-2 w-full bg-glass-strong rounded-full overflow-hidden border border-glass-border">
        <div 
          className={`h-full ${toneClasses[tone]} transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

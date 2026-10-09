import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export function OptionList({ options, selectedIndex, onSelect, result, disabled }) {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        if (index < options.length) {
          onSelect(index);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, options.length, onSelect]);

  return (
    <div className="space-y-3" role="radiogroup">
      {options.map((option, index) => {
        const labelText = String.fromCharCode(65 + index); // A, B, C, D
        const isSelected = selectedIndex === index;
        
        let stateClass = 'surface-solid text-primary hover:bg-glass-strong border border-glass-border';
        let icon = null;
        let srText = '';
        let resultLabel = null;

        if (result) {
          // It has been graded
          if (isSelected) {
            if (result.isCorrect) {
              stateClass = 'bg-[color:var(--primary-soft)] border border-[color:var(--primary)] text-[color:var(--primary)]';
              icon = <CheckCircle className="w-5 h-5 text-[color:var(--primary)]" />;
              srText = 'Correct';
              resultLabel = <span className="text-sm font-bold ml-auto text-[color:var(--primary)]">{srText}</span>;
            } else {
              stateClass = 'bg-[color:var(--danger-soft)] border border-[color:var(--danger)] text-[color:var(--danger)]';
              icon = <XCircle className="w-5 h-5 text-[color:var(--danger)]" />;
              srText = 'Incorrect';
              resultLabel = <span className="text-sm font-bold ml-auto text-[color:var(--danger)]">{srText}</span>;
            }
          } else if (index === result.correctIndex) {
            stateClass = 'bg-transparent border-[color:var(--primary)] border text-[color:var(--primary)]';
            icon = <CheckCircle className="w-5 h-5 text-[color:var(--primary)]" />;
            srText = 'Correct answer';
            resultLabel = <span className="text-sm font-bold ml-auto text-[color:var(--primary)]">{srText}</span>;
          } else {
            stateClass = 'bg-[color:var(--surface)] text-[color:var(--text-muted)] border border-transparent opacity-60';
          }
        } else if (isSelected) {
          stateClass = 'bg-[color:var(--primary-soft)] border border-[color:var(--primary)] text-[color:var(--primary)]';
        }

        return (
          <button
            key={index}
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-colors focus-visible outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] ${stateClass} ${disabled && !result ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${isSelected && !result ? 'bg-[color:var(--primary)] text-white' : 'bg-[color:var(--surface-strong)] border border-[color:var(--border)] text-[color:var(--text-muted)]'}`}>
              {labelText}
            </div>
            
            <span className="flex-1 whitespace-pre-wrap">{option}</span>
            
            {icon && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {resultLabel}
                {icon}
              </div>
            )}
            <span className="sr-only">{srText}</span>
          </button>
        );
      })}
    </div>
  );
}

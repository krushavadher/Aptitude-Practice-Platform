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
              stateClass = 'bg-success bg-opacity-10 border-success text-success-text';
              icon = <CheckCircle className="w-5 h-5" />;
              srText = 'Correct';
              resultLabel = <span className="text-sm font-bold ml-auto">{srText}</span>;
            } else {
              stateClass = 'bg-error bg-opacity-10 border-error text-error-text';
              icon = <XCircle className="w-5 h-5" />;
              srText = 'Incorrect';
              resultLabel = <span className="text-sm font-bold ml-auto">{srText}</span>;
            }
          } else if (index === result.correctIndex) {
            stateClass = 'bg-transparent border-success border-2 text-primary';
            icon = <CheckCircle className="w-5 h-5 text-success" />;
            srText = 'Correct answer';
            resultLabel = <span className="text-sm font-bold ml-auto text-success-text">{srText}</span>;
          } else {
            stateClass = 'surface-solid text-secondary opacity-50 border border-transparent';
          }
        } else if (isSelected) {
          stateClass = 'bg-accent bg-opacity-10 border-accent text-primary ring-1 ring-accent';
        }

        return (
          <button
            key={index}
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-colors focus-visible outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${stateClass} ${disabled && !result ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${isSelected && !result ? 'bg-accent text-on-accent' : 'bg-glass border border-glass-border'}`}>
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

import React from 'react';

export function ExplanationPanel({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="mt-6 p-6 glass rounded-xl border-l-4 border-l-[color:var(--primary)]">
      <h4 className="text-lg font-bold text-primary mb-2">Explanation</h4>
      <div className="text-secondary whitespace-pre-wrap leading-relaxed">
        {explanation}
      </div>
    </div>
  );
}

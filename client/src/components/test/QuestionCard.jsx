import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';

export function QuestionCard({ number, total, subtopic, difficulty, text }) {
  const getDifficultyBadge = (diff) => {
    switch(diff) {
      case 'easy': return <Badge variant="success">Easy</Badge>;
      case 'medium': return <Badge variant="warning">Medium</Badge>;
      case 'hard': return <Badge variant="error">Hard</Badge>;
      default: return <Badge>{diff}</Badge>;
    }
  };

  return (
    <GlassCard strong className="mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-glass-border pb-4">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
          Question {number} {total ? `of ${total}` : ''}
        </span>
        <div className="flex items-center gap-2">
          {subtopic && <Badge>{subtopic}</Badge>}
          {difficulty && getDifficultyBadge(difficulty)}
        </div>
      </div>
      
      <div className="text-lg text-primary whitespace-pre-wrap break-words leading-relaxed">
        {text}
      </div>
    </GlassCard>
  );
}

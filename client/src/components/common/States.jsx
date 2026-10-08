import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center glass rounded-xl ${className}`}>
      {Icon && <Icon className="w-12 h-12 text-secondary mb-4 opacity-50" />}
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-secondary max-w-sm mb-6">{description}</p>
      {action && action}
    </div>
  );
}

export function ErrorState({ message, onRetry, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center glass rounded-xl border-error border-opacity-30 ${className}`}>
      <AlertCircle className="w-12 h-12 text-error mb-4 opacity-80" />
      <h3 className="text-lg font-semibold text-primary mb-2">Something went wrong</h3>
      <p className="text-error-text max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

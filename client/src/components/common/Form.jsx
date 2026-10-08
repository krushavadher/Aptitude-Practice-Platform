import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const FieldWrapper = ({ label, error, helperText, children, id }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label htmlFor={id} className="text-sm font-medium text-primary">{label}</label>}
    {children}
    {error && (
      <p id={`${id}-error`} className="text-sm text-error-text flex items-center gap-1">
        <AlertCircle className="w-4 h-4 text-error" /> {error}
      </p>
    )}
    {helperText && !error && <p id={`${id}-helper`} className="text-sm text-secondary">{helperText}</p>}
  </div>
);

const baseInputClasses = "w-full rounded-lg glass-strong border border-glass-border px-3 py-2 text-primary focus-visible transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent";

export const Input = forwardRef(({ label, error, helperText, id, type = 'text', className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <FieldWrapper label={label} error={error} helperText={helperText} id={id}>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={inputType}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`${baseInputClasses} ${isPassword ? 'pr-10' : ''} ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary focus-visible rounded"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </FieldWrapper>
  );
});

export const Textarea = forwardRef(({ label, error, helperText, id, className = '', ...props }, ref) => (
  <FieldWrapper label={label} error={error} helperText={helperText} id={id}>
    <textarea
      ref={ref}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
      className={`${baseInputClasses} min-h-[100px] resize-y ${error ? 'border-error' : ''} ${className}`}
      {...props}
    />
  </FieldWrapper>
));

export const Select = forwardRef(({ label, error, helperText, id, options = [], className = '', ...props }, ref) => (
  <FieldWrapper label={label} error={error} helperText={helperText} id={id}>
    <select
      ref={ref}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
      className={`${baseInputClasses} appearance-none bg-glass ${error ? 'border-error' : ''} ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="surface-solid text-primary">
          {opt.label}
        </option>
      ))}
    </select>
  </FieldWrapper>
));

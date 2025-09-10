import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-ember-orange ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'form-input',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-deep-wood/60 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
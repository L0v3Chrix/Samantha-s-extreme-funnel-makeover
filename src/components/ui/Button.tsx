import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'sms' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary', 
  sms: 'btn-sms',
  ghost: 'btn bg-transparent text-night-indigo hover:bg-night-indigo/10 px-4 py-2 text-sm',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants[variant],
        variant !== 'primary' && variant !== 'secondary' && variant !== 'sms' && buttonSizes[size],
        loading && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
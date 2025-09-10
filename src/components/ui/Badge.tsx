import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'alumni';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  default: 'bg-parchment text-deep-wood border border-candle-gold/30',
  success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  warning: 'bg-ember-orange/20 text-ember-orange border border-ember-orange/30',
  info: 'bg-night-indigo/10 text-night-indigo border border-night-indigo/20',
  alumni: 'bg-gradient-to-r from-candle-gold to-ember-orange text-night-indigo font-semibold border border-candle-gold/50',
};

const badgeSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Badge({ 
  variant = 'default', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all duration-200',
        'shadow-sm hover:shadow-md',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
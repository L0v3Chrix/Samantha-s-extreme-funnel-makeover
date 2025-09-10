import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'constellation' | 'alchemy';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const progressVariants = {
  default: {
    track: 'bg-parchment border border-candle-gold/20',
    fill: 'bg-gradient-to-r from-candle-gold to-ember-orange',
  },
  constellation: {
    track: 'bg-night-indigo/10 border border-arcane-violet/20',
    fill: 'bg-gradient-to-r from-arcane-violet via-candle-gold to-ember-orange',
  },
  alchemy: {
    track: 'bg-deep-wood/10 border border-candle-gold/30',
    fill: 'bg-gradient-to-r from-ember-orange via-candle-gold to-parchment',
  },
};

const progressSizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn('w-full space-y-2', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-deep-wood font-medium">
            {label || `Progress: ${Math.round(percentage)}%`}
          </span>
          <span className="text-candle-gold font-semibold">
            {value}/{max}
          </span>
        </div>
      )}
      
      <div
        className={cn(
          'relative overflow-hidden rounded-full shadow-inner',
          progressVariants[variant].track,
          progressSizes[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out shadow-sm',
            progressVariants[variant].fill,
            animated && 'animate-glow-pulse'
          )}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? 'width 0.5s ease-out' : 'none'
          }}
        />
        
        {/* Constellation variant sparkle effect */}
        {variant === 'constellation' && percentage > 0 && (
          <div 
            className="absolute top-0 h-full w-2 bg-white/40 rounded-full animate-constellation-twinkle"
            style={{ 
              left: `${Math.max(percentage - 5, 0)}%`,
              transition: 'left 0.5s ease-out'
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Progress;
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'magical' | 'warning';
  delay?: number;
  className?: string;
}

const positionClasses = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
};

const arrowClasses = {
  top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
};

const tooltipVariants = {
  default: {
    background: 'bg-night-indigo text-parchment border border-night-indigo/20',
    arrow: 'border-night-indigo',
  },
  magical: {
    background: 'bg-gradient-to-br from-arcane-violet via-night-indigo to-deep-wood text-candle-gold border border-candle-gold/30',
    arrow: 'border-arcane-violet',
  },
  warning: {
    background: 'bg-ember-orange text-night-indigo border border-ember-orange/30',
    arrow: 'border-ember-orange',
  },
};

export function Tooltip({
  children,
  content,
  position = 'top',
  variant = 'default',
  delay = 500,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before animation
      setTimeout(() => setIsVisible(true), 10);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
    // Keep rendered during fade-out animation
    setTimeout(() => setShouldRender(false), 200);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {shouldRender && (
        <div
          className={cn(
            'absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg',
            'transition-all duration-200 transform',
            'whitespace-nowrap max-w-xs',
            positionClasses[position],
            tooltipVariants[variant].background,
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95',
            className
          )}
          role="tooltip"
        >
          {content}
          
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[position],
              tooltipVariants[variant].arrow
            )}
          />
          
          {/* Magical variant sparkle effect */}
          {variant === 'magical' && (
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-candle-gold/20 to-transparent animate-constellation-twinkle pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
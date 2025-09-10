'use client';

import React from 'react';
import Image from 'next/image';
import { Badge, SMSButton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn('relative min-h-screen flex items-center py-20', className)}>
      {/* Magical background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-indigo via-deep-wood to-arcane-violet opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(246,198,109,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(152,80,200,0.1),transparent_50%)]" />
      
      {/* Floating constellation elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-candle-gold rounded-full animate-constellation-twinkle opacity-60" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-arcane-violet rounded-full animate-constellation-twinkle opacity-80 animation-delay-1000" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-ember-orange rounded-full animate-constellation-twinkle opacity-70 animation-delay-2000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8 text-center lg:text-left">
              
              {/* Alumni Badge */}
              <div className="flex justify-center lg:justify-start">
                <Badge variant="alumni" size="lg" className="animate-glow-pulse">
                  🎓 Alumni-Only Exclusive
                </Badge>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="font-heading text-5xl lg:text-7xl font-bold text-candle-gold leading-tight">
                  Samantha's
                  <br />
                  <span className="bg-gradient-to-r from-candle-gold via-ember-orange to-arcane-violet bg-clip-text text-transparent animate-glow-pulse">
                    Extreme Funnel
                  </span>
                  <br />
                  <span className="text-parchment">
                    Makeover
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-parchment/90 font-medium leading-relaxed max-w-lg">
                  The <span className="text-candle-gold font-bold">$3,000 custom funnel</span> that's 
                  been quietly converting at <span className="text-ember-orange font-bold">67%</span> for 
                  my private clients...
                </p>
              </div>
              
              {/* Value Props */}
              <div className="space-y-3 text-parchment/80">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-2 h-2 bg-candle-gold rounded-full animate-glow-pulse" />
                  <span className="text-lg">Complete funnel psychology overhaul</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-2 h-2 bg-ember-orange rounded-full animate-glow-pulse animation-delay-500" />
                  <span className="text-lg">3 custom conversion tools included</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-2 h-2 bg-arcane-violet rounded-full animate-glow-pulse animation-delay-1000" />
                  <span className="text-lg">Delivered in 10 business days</span>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <SMSButton 
                    message="Samantha! I'm ready for the Extreme Funnel Makeover. Let's make this happen! 🚀"
                    variant="sms"
                    size="xl"
                    className="shadow-2xl hover:shadow-candle-gold/25"
                  >
                    🪄 Text Samantha Now
                  </SMSButton>
                </div>
                
                {/* Urgency indicator */}
                <div className="text-center lg:text-left">
                  <p className="text-ember-orange font-semibold text-sm uppercase tracking-wider">
                    ⚡ Only 3 spots remaining this month
                  </p>
                  <p className="text-parchment/60 text-sm mt-1">
                    Next opening: January 2025
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Samantha's Image */}
            <div className="relative">
              <div className="relative max-w-md mx-auto">
                {/* Magical glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-candle-gold/30 via-ember-orange/20 to-arcane-violet/30 rounded-full blur-3xl animate-glow-pulse" />
                
                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-candle-gold/20 to-ember-orange/20 rounded-full p-4 border border-candle-gold/30 shadow-2xl">
                  <div className="relative rounded-full overflow-hidden bg-parchment">
                    <Image
                      src="/samantha-headshot.jpg"
                      alt="Samantha - Funnel Psychology Expert"
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover object-center"
                      priority
                    />
                    
                    {/* Overlay gradient for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-night-indigo/20 via-transparent to-transparent" />
                  </div>
                </div>
                
                {/* Floating credentials */}
                <div className="absolute -bottom-4 -left-4 bg-parchment rounded-lg p-3 border border-candle-gold/30 shadow-xl animate-float">
                  <p className="text-xs text-deep-wood font-semibold">67% Avg Conversion</p>
                  <p className="text-xs text-candle-gold">$2.1M+ Generated</p>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-parchment rounded-lg p-3 border border-ember-orange/30 shadow-xl animate-float animation-delay-1000">
                  <p className="text-xs text-deep-wood font-semibold">Psychology-First</p>
                  <p className="text-xs text-ember-orange">Approach</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-candle-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-candle-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
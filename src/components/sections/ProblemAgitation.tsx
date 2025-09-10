'use client';

import React from 'react';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ProblemAgitationProps {
  className?: string;
}

export function ProblemAgitation({ className }: ProblemAgitationProps) {
  const painPoints = [
    {
      icon: TrendingDown,
      title: "Your Current Funnel Is Bleeding Money",
      description: "Every day you delay is another $500-2,000 walking out the door. That 23% conversion rate? It should be 65%+.",
      stat: "77% Revenue Loss",
      color: "ember-orange"
    },
    {
      icon: Clock,
      title: "Time Is Your Enemy Right Now",
      description: "While you're \"thinking about it,\" your competitors are capturing the leads that should be yours. Q4 is almost over.",
      stat: "3 Months Lost",
      color: "arcane-violet"
    },
    {
      icon: AlertTriangle,
      title: "Amateur Psychology = Amateur Results",
      description: "Generic funnels ignore how buyers actually think. Your visitors leave because the psychology is all wrong.",
      stat: "67% Bounce Rate",
      color: "ember-orange"
    }
  ];

  return (
    <section className={cn('py-20 relative', className)}>
      {/* Dark, ominous background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-wood via-night-indigo to-deep-wood" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(232,150,58,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(152,80,200,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-ember-orange mb-6 leading-tight">
              Here's The
              <span className="text-parchment block">Brutal Truth</span>
            </h2>
            
            <p className="text-xl text-parchment/80 leading-relaxed max-w-3xl mx-auto">
              You already know your funnel isn't working. The question is: 
              <span className="text-candle-gold font-semibold"> how much longer will you let it bleed money?</span>
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {painPoints.map((pain, index) => {
              const IconComponent = pain.icon;
              return (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-night-indigo/40 border-ember-orange/20 hover:border-ember-orange/40 backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105"
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-${pain.color}/20 flex items-center justify-center mb-4`}>
                        <IconComponent className={`w-8 h-8 text-${pain.color}`} />
                      </div>
                      
                      {/* Floating stat */}
                      <div className={`absolute -top-2 -right-4 bg-${pain.color} text-night-indigo px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                        {pain.stat}
                      </div>
                    </div>
                    
                    <h3 className="font-heading text-xl font-bold text-parchment mb-4">
                      {pain.title}
                    </h3>
                    
                    <p className="text-parchment/70 leading-relaxed">
                      {pain.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reality Check Section */}
          <div className="bg-gradient-to-r from-ember-orange/10 via-arcane-violet/10 to-ember-orange/10 rounded-2xl p-8 border border-ember-orange/20 backdrop-blur-sm">
            <h3 className="font-heading text-3xl font-bold text-ember-orange mb-6">
              The Mathematics of Mediocrity
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-ember-orange mb-2">23%</div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">Your Current Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-candle-gold mb-2">67%</div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">Samantha's Average</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-arcane-violet mb-2">$147k</div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">Revenue Lost (Annual)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-parchment mb-2">∞</div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">Opportunity Cost</div>
              </div>
            </div>
            
            <div className="border-t border-ember-orange/20 pt-6">
              <p className="text-lg text-parchment/80 leading-relaxed">
                Every month you wait is another <span className="text-candle-gold font-semibold">$12,250 in missed revenue.</span>
                <br />
                <span className="text-ember-orange font-semibold">How long can you afford to "think about it"?</span>
              </p>
            </div>
          </div>

          {/* Emotional Hook */}
          <div className="mt-16 text-center">
            <p className="text-2xl text-parchment font-medium leading-relaxed max-w-3xl mx-auto">
              You didn't build your business to watch opportunities slip away.
              <br />
              <span className="text-candle-gold font-bold">
                You built it to win.
              </span>
            </p>
            
            {/* Transition teaser */}
            <div className="mt-8 pt-8 border-t border-candle-gold/20">
              <p className="text-candle-gold font-semibold">
                But what if there was a different way? ↓
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProblemAgitation;
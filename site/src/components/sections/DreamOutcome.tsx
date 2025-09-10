'use client';

import React from 'react';
import { Star, TrendingUp, Zap, Crown, Sparkles, Target } from 'lucide-react';
import { Card, CardContent, Badge, SMSButton, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DreamOutcomeProps {
  className?: string;
}

export function DreamOutcome({ className }: DreamOutcomeProps) {
  const outcomes = [
    {
      icon: TrendingUp,
      title: "67%+ Conversion Rates",
      description: "Your funnel becomes a psychological masterpiece that converts nearly 7 out of 10 visitors into qualified leads.",
      before: "23%",
      after: "67%",
      impact: "+191% increase"
    },
    {
      icon: Zap,
      title: "Psychology-First Framework",
      description: "Every element speaks directly to your buyer's subconscious desires, fears, and decision-making patterns.",
      before: "Generic",
      after: "Psychological",
      impact: "Mind-reading accuracy"
    },
    {
      icon: Target,
      title: "3 Custom Conversion Tools",
      description: "Interactive quizzes and calculators that make your prospects sell themselves on your solution.",
      before: "0 tools",
      after: "3 tools",
      impact: "40% engagement boost"
    }
  ];

  const transformationStats = [
    { metric: "Revenue Impact", value: "$247k+", period: "First Year", color: "candle-gold" },
    { metric: "Lead Quality", value: "89%", period: "Qualified Rate", color: "arcane-violet" },
    { metric: "Time to ROI", value: "14 days", period: "Average", color: "ember-orange" },
    { metric: "Client Satisfaction", value: "100%", period: "Success Rate", color: "candle-gold" }
  ];

  return (
    <section className={cn('py-20 relative overflow-hidden', className)}>
      {/* Magical, aspirational background */}
      <div className="absolute inset-0 bg-gradient-to-br from-arcane-violet via-night-indigo to-deep-wood" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(246,198,109,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(152,80,200,0.12),transparent_60%)]" />
      
      {/* Floating golden particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-candle-gold/60 rounded-full animate-constellation-twinkle" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-ember-orange/80 rounded-full animate-constellation-twinkle animation-delay-1000" />
      <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-arcane-violet/70 rounded-full animate-constellation-twinkle animation-delay-2000" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-candle-gold/50 rounded-full animate-constellation-twinkle animation-delay-1500" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse">
                <Crown className="w-4 h-4 mr-2" />
                The Transformation
              </Badge>
            </div>
            
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-candle-gold mb-6 leading-tight">
              Imagine Your Funnel
              <br />
              <span className="bg-gradient-to-r from-candle-gold via-ember-orange to-arcane-violet bg-clip-text text-transparent">
                Converting Like Magic
              </span>
            </h2>
            
            <p className="text-xl text-parchment/90 leading-relaxed max-w-3xl mx-auto">
              This isn't just about better conversion rates. This is about 
              <span className="text-candle-gold font-semibold"> transforming your entire business </span>
              into a psychological masterpiece that makes prospects <em>beg</em> to work with you.
            </p>
          </div>

          {/* Transformation Outcomes */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {outcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;
              return (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-parchment/95 hover:bg-parchment border-candle-gold/30 hover:border-candle-gold/60 backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-candle-gold/20"
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-candle-gold/20 to-ember-orange/20 flex items-center justify-center mb-4 border border-candle-gold/30">
                        <IconComponent className="w-8 h-8 text-candle-gold" />
                      </div>
                      
                      <h3 className="font-heading text-xl font-bold text-night-indigo mb-4">
                        {outcome.title}
                      </h3>
                      
                      <p className="text-deep-wood/80 leading-relaxed mb-6">
                        {outcome.description}
                      </p>
                    </div>
                    
                    {/* Before/After Comparison */}
                    <div className="bg-gradient-to-r from-candle-gold/10 to-ember-orange/10 rounded-lg p-4 border border-candle-gold/20">
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-center">
                          <div className="text-deep-wood/60 uppercase tracking-wide mb-1">Before</div>
                          <div className="font-semibold text-deep-wood">{outcome.before}</div>
                        </div>
                        <div className="text-candle-gold">→</div>
                        <div className="text-center">
                          <div className="text-deep-wood/60 uppercase tracking-wide mb-1">After</div>
                          <div className="font-semibold text-candle-gold">{outcome.after}</div>
                        </div>
                      </div>
                      <div className="text-center mt-2 pt-2 border-t border-candle-gold/20">
                        <span className="text-xs text-ember-orange font-semibold">{outcome.impact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Transformation Stats */}
          <div className="bg-gradient-to-r from-candle-gold/20 via-ember-orange/20 to-arcane-violet/20 rounded-2xl p-8 border border-candle-gold/30 backdrop-blur-sm mb-16">
            <div className="text-center mb-8">
              <h3 className="font-heading text-3xl font-bold text-parchment mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 mr-3 text-candle-gold" />
                Real Results From Real Clients
                <Sparkles className="w-8 h-8 ml-3 text-candle-gold" />
              </h3>
              <p className="text-parchment/80">
                These aren't projections. These are actual results from the last 90 days.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {transformationStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl font-bold text-${stat.color} mb-2 animate-glow-pulse`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-parchment/60 uppercase tracking-wide mb-1">
                    {stat.metric}
                  </div>
                  <div className="text-xs text-parchment/80">
                    {stat.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Vision */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-parchment/10 to-candle-gold/10 rounded-2xl p-8 border border-candle-gold/20 backdrop-blur-sm">
              <h3 className="font-heading text-3xl font-bold text-candle-gold mb-6">
                Picture This...
              </h3>
              
              <div className="space-y-4 text-lg text-parchment/90 leading-relaxed">
                <p>
                  It's 30 days from now. Your phone buzzes with another notification: 
                  <span className="text-candle-gold font-semibold"> "New high-quality lead submitted."</span>
                </p>
                
                <p>
                  You smile because this isn't unusual anymore. Your funnel has become a 
                  <span className="text-ember-orange font-semibold"> psychological magnet </span>
                  that attracts your ideal clients and repels everyone else.
                </p>
                
                <p>
                  Your calendar is booked solid with qualified prospects who are already 
                  <span className="text-arcane-violet font-semibold"> pre-sold </span>
                  before they even get on the phone with you.
                </p>
                
                <p className="text-xl text-candle-gold font-semibold pt-4 border-t border-candle-gold/20">
                  This is what happens when psychology meets conversion science.
                </p>
              </div>
            </div>
            
            {/* Tools Demo CTA */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-arcane-violet/20 via-candle-gold/20 to-ember-orange/20 rounded-xl p-6 border border-candle-gold/30 mb-8">
                <h4 className="text-xl font-heading font-bold text-candle-gold mb-3">
                  🎯 Want to Experience This First-Hand?
                </h4>
                <p className="text-parchment/90 mb-4 leading-relaxed">
                  Try the interactive demo tools that showcase exactly how psychology-first design works. 
                  See why these tools get 70%+ completion rates.
                </p>
                <Link href="/tools">
                  <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl">
                    <Target className="w-5 h-5 mr-2" />
                    Try the Interactive Tools
                  </Button>
                </Link>
              </div>
              
              <p className="text-2xl text-parchment mb-8">
                Ready to make this your reality?
              </p>
              
              <SMSButton 
                message="Samantha! I can see the vision. I'm ready to transform my funnel into a psychological masterpiece. Let's do this! ✨"
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-candle-gold/25"
              >
                <Star className="w-5 h-5 mr-2" />
                Yes, I Want This Transformation
              </SMSButton>
              
              <p className="text-sm text-parchment/60 mt-4">
                Limited to 3 clients this month • Next opening: January 2025
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DreamOutcome;
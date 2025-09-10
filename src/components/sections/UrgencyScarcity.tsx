'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Flame, Calendar, Users, Zap } from 'lucide-react';
import { Card, CardContent, Badge, SMSButton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface UrgencyScarcityProps {
  className?: string;
}

export function UrgencyScarcity({ className }: UrgencyScarcityProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to end of month (for demo purposes, set to 7 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scarcityFactors = [
    {
      icon: Users,
      title: "Only 3 Spots Remaining",
      description: "I limit myself to 3 funnel transformations per month to ensure premium quality and personal attention.",
      urgency: "High"
    },
    {
      icon: Calendar,
      title: "Next Opening: January 2025",
      description: "My calendar is completely booked through December. These are the last 3 opportunities until 2025.",
      urgency: "Critical"
    },
    {
      icon: Clock,
      title: "Q4 Revenue Window Closing",
      description: "Miss this deadline and you'll lose the entire Q4 revenue opportunity. That's $50k-200k+ for most businesses.",
      urgency: "Extreme"
    }
  ];

  const consequencesList = [
    "Another month of 23% conversion rates while your competitors capture your market",
    "$12,250+ in missed revenue (conservative estimate based on current traffic)",
    "Watching qualified prospects bounce because your funnel doesn't speak their language",
    "Starting 2025 with the same broken system that's been bleeding money all year"
  ];

  return (
    <section className={cn('py-20 relative overflow-hidden', className)}>
      {/* Intense, urgent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ember-orange via-deep-wood to-night-indigo" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,150,58,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(152,80,200,0.15),transparent_60%)]" />
      
      {/* Pulsing urgency elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-ember-orange/80 rounded-full animate-glow-pulse" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-candle-gold/90 rounded-full animate-glow-pulse animation-delay-500" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-ember-orange/60 rounded-full animate-glow-pulse animation-delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Badge variant="warning" size="lg" className="animate-glow-pulse">
                <Flame className="w-4 h-4 mr-2" />
                URGENT: Limited Time
              </Badge>
            </div>
            
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-ember-orange mb-6 leading-tight">
              Time Is Running Out
              <br />
              <span className="text-parchment">
                Act Now Or Wait Until 2025
              </span>
            </h2>
            
            <p className="text-xl text-parchment/90 leading-relaxed max-w-4xl mx-auto">
              I only take <span className="text-candle-gold font-bold">3 funnel clients per month</span> to ensure 
              each gets my complete focus and guaranteed results. December is already booked solid.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-ember-orange/20 via-candle-gold/20 to-ember-orange/20 rounded-2xl p-8 border border-ember-orange/30 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="font-heading text-3xl font-bold text-candle-gold mb-2">
                  Deadline for November Spots:
                </h3>
                <p className="text-parchment/80">
                  After this countdown hits zero, next opening is January 15, 2025
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-night-indigo rounded-lg p-4 border border-candle-gold/30 shadow-lg">
                      <div className="text-3xl md:text-4xl font-bold text-ember-orange mb-1 font-mono">
                        {time.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-parchment/60 uppercase tracking-wider">
                        {time.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scarcity Factors */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {scarcityFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              const urgencyColors = {
                High: 'candle-gold',
                Critical: 'ember-orange', 
                Extreme: 'ember-orange'
              };
              
              return (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-parchment/95 border-ember-orange/30 hover:border-ember-orange/60 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-ember-orange/20 to-candle-gold/20 flex items-center justify-center border border-ember-orange/30">
                        <IconComponent className="w-8 h-8 text-ember-orange" />
                      </div>
                      
                      {/* Urgency indicator */}
                      <div className={`absolute -top-2 -right-4 bg-${urgencyColors[factor.urgency as keyof typeof urgencyColors]} text-night-indigo px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-glow-pulse`}>
                        {factor.urgency}
                      </div>
                    </div>
                    
                    <h3 className="font-heading text-xl font-bold text-night-indigo">
                      {factor.title}
                    </h3>
                    
                    <p className="text-deep-wood/80 leading-relaxed">
                      {factor.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Consequence of Inaction */}
          <div className="bg-gradient-to-r from-deep-wood/80 via-night-indigo/80 to-deep-wood/80 rounded-2xl p-8 border border-ember-orange/20 backdrop-blur-sm mb-16">
            <div className="text-center mb-8">
              <h3 className="font-heading text-3xl font-bold text-ember-orange mb-4 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                The Cost of Waiting
                <AlertTriangle className="w-8 h-8 ml-3" />
              </h3>
              <p className="text-parchment/80">
                If you don't secure your spot today, here's what happens:
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {consequencesList.map((consequence, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-ember-orange/10 rounded-lg border border-ember-orange/20">
                  <div className="w-6 h-6 rounded-full bg-ember-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-ember-orange font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-parchment/90 leading-relaxed">
                    {consequence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-ember-orange/20 to-candle-gold/20 rounded-2xl p-8 border border-candle-gold/30 backdrop-blur-sm">
              <h3 className="font-heading text-4xl font-bold text-candle-gold mb-6">
                Don't Let This Slip Away
              </h3>
              
              <div className="space-y-4 text-lg text-parchment/90 leading-relaxed mb-8">
                <p>
                  You've seen the value. You know the results. You understand the guarantees.
                </p>
                
                <p>
                  The only question left is: <span className="text-ember-orange font-bold">Will you take action?</span>
                </p>
                
                <p className="text-xl text-candle-gold font-bold">
                  Your future self will either thank you or regret this moment.
                </p>
              </div>
              
              <SMSButton 
                message="Samantha! I refuse to let this opportunity pass by. I'm claiming my spot RIGHT NOW before it's too late! 🔥"
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-ember-orange/25 animate-glow-pulse"
              >
                <Zap className="w-5 h-5 mr-2" />
                SECURE MY SPOT NOW
              </SMSButton>
              
              <div className="mt-6 text-center">
                <p className="text-ember-orange font-bold text-lg mb-2">
                  ⚡ LAST 3 SPOTS • Next Opening: January 2025
                </p>
                <p className="text-sm text-parchment/60">
                  Don't spend another day with a broken funnel
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default UrgencyScarcity;
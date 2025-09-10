'use client';

import React from 'react';
import { Check, Zap, Star, Crown, Sparkles, TrendingUp, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, SMSButton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ValueStackProps {
  className?: string;
}

export function ValueStack({ className }: ValueStackProps) {
  const stackItems = [
    {
      title: "Complete Funnel Psychology Overhaul",
      description: "Every word, color, and button placement scientifically designed to trigger your prospect's buying psychology",
      value: "$4,500",
      icon: Zap,
      features: [
        "Cognitive bias implementation",
        "Emotional trigger mapping", 
        "Decision fatigue elimination",
        "Trust indicator placement"
      ]
    },
    {
      title: "3 Custom Interactive Conversion Tools",
      description: "Constellation Score Quiz, ROI Calculator, and Funnel Diagnostic that make prospects sell themselves",
      value: "$2,500",
      icon: Target,
      features: [
        "Psychology-based questionnaires",
        "Personalized result pages",
        "Lead qualification scoring",
        "Engagement gamification"
      ]
    },
    {
      title: "Mobile-First Responsive Design",
      description: "Flawlessly converts on every device with thumb-friendly interactions and lightning-fast loading",
      value: "$1,800",
      icon: TrendingUp,
      features: [
        "Sub-3 second loading times",
        "Touch-optimized interactions",
        "Progressive web app features",
        "Cross-browser compatibility"
      ]
    },
    {
      title: "Advanced Analytics & Conversion Tracking",
      description: "See exactly where prospects drop off and what makes them convert with surgical precision",
      value: "$1,200",
      icon: Users,
      features: [
        "Heatmap integration setup",
        "Conversion funnel analysis",
        "A/B testing framework",
        "ROI reporting dashboard"
      ]
    }
  ];

  const bonuses = [
    {
      title: "30-Day Social Media Content Calendar",
      description: "Ready-to-post content that drives traffic to your new funnel",
      value: "$800"
    },
    {
      title: "20 HeyGen-Ready Video Scripts",
      description: "AI avatar scripts optimized for your new funnel psychology",
      value: "$600"
    },
    {
      title: "Priority Implementation (10 Business Days)",
      description: "Skip the 6-week waiting list and get your funnel live fast",
      value: "$1,500"
    }
  ];

  const totalValue = stackItems.reduce((sum, item) => sum + parseInt(item.value.replace('$', '').replace(',', '')), 0) +
                    bonuses.reduce((sum, bonus) => sum + parseInt(bonus.value.replace('$', '').replace(',', '')), 0);

  return (
    <section className={cn('py-20 relative', className)}>
      {/* Rich, value-focused background */}
      <div className="absolute inset-0 bg-gradient-to-b from-parchment via-candle-gold/5 to-parchment" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(246,198,109,0.1),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse">
                <Crown className="w-4 h-4 mr-2" />
                What You Get
              </Badge>
            </div>
            
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-night-indigo mb-6 leading-tight">
              The Complete
              <br />
              <span className="bg-gradient-to-r from-candle-gold via-ember-orange to-arcane-violet bg-clip-text text-transparent">
                Funnel Transformation
              </span>
            </h2>
            
            <p className="text-xl text-deep-wood/80 leading-relaxed max-w-3xl mx-auto">
              This isn't just a funnel. It's a complete 
              <span className="text-candle-gold font-semibold"> psychological conversion system </span>
              that turns visitors into buyers using proven behavioral triggers.
            </p>
          </div>

          {/* Main Value Stack */}
          <div className="space-y-6 mb-12">
            {stackItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-parchment border-candle-gold/30 hover:border-candle-gold/60 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 lg:flex-1">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-candle-gold/20 to-ember-orange/20 flex items-center justify-center border border-candle-gold/30 flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-candle-gold" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-night-indigo mb-2">
                            {item.title}
                          </h3>
                          <p className="text-deep-wood/70 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Features & Value */}
                      <div className="lg:w-80">
                        <div className="bg-candle-gold/10 rounded-lg p-4 border border-candle-gold/20 mb-4">
                          <div className="grid grid-cols-1 gap-2">
                            {item.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center text-sm text-deep-wood">
                                <Check className="w-4 h-4 text-candle-gold mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-candle-gold">
                            {item.value}
                          </div>
                          <div className="text-sm text-deep-wood/60">
                            Value
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Bonus Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="font-heading text-3xl font-bold text-night-indigo mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 mr-3 text-candle-gold" />
                Plus These Exclusive Bonuses
                <Sparkles className="w-8 h-8 ml-3 text-candle-gold" />
              </h3>
              <p className="text-deep-wood/70">
                Because I want to make this a complete no-brainer...
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {bonuses.map((bonus, index) => (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-gradient-to-br from-ember-orange/10 via-candle-gold/10 to-arcane-violet/10 border-candle-gold/20 hover:border-candle-gold/40"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-candle-gold/20 flex items-center justify-center mb-4 border border-candle-gold/30">
                      <Star className="w-6 h-6 text-candle-gold" />
                    </div>
                    
                    <h4 className="font-heading text-lg font-bold text-night-indigo mb-3">
                      {bonus.title}
                    </h4>
                    
                    <p className="text-sm text-deep-wood/70 mb-4 leading-relaxed">
                      {bonus.description}
                    </p>
                    
                    <div className="text-lg font-bold text-candle-gold">
                      {bonus.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Value Summary & Price Reveal */}
          <div className="bg-gradient-to-r from-night-indigo via-deep-wood to-night-indigo rounded-2xl p-8 border border-candle-gold/30 text-center">
            <h3 className="font-heading text-3xl font-bold text-candle-gold mb-6">
              Total Value Breakdown
            </h3>
            
            <div className="max-w-md mx-auto space-y-3 mb-8">
              <div className="flex justify-between items-center text-parchment/80 border-b border-candle-gold/20 pb-2">
                <span>Core Funnel System:</span>
                <span className="font-semibold">${stackItems.reduce((sum, item) => sum + parseInt(item.value.replace('$', '').replace(',', '')), 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-parchment/80 border-b border-candle-gold/20 pb-2">
                <span>Exclusive Bonuses:</span>
                <span className="font-semibold">${bonuses.reduce((sum, bonus) => sum + parseInt(bonus.value.replace('$', '').replace(',', '')), 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-candle-gold pt-4">
                <span>Total Value:</span>
                <span>${totalValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-ember-orange/20 rounded-xl p-6 border border-ember-orange/30 mb-8">
              <p className="text-parchment mb-4 text-lg">
                But because you're an alumni and I believe in your success...
              </p>
              
              <div className="text-4xl font-bold text-ember-orange mb-2">
                Your Investment: $3,000
              </div>
              
              <div className="text-candle-gold font-semibold">
                Save ${(totalValue - 3000).toLocaleString()} • 74% Off Regular Price
              </div>
            </div>

            <SMSButton 
              message="Samantha! I see the incredible value here. I'm ready to invest $3,000 in transforming my funnel. Let's make this happen! 🚀"
              variant="sms"
              size="xl"
              className="shadow-2xl hover:shadow-candle-gold/25 mb-4"
            >
              <Crown className="w-5 h-5 mr-2" />
              Claim My Funnel Transformation
            </SMSButton>
            
            <p className="text-sm text-parchment/60">
              ⚡ Only 3 spots available this month • 10-day delivery guaranteed
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ValueStack;
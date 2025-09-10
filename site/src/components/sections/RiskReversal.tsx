'use client';

import React from 'react';
import { Shield, CheckCircle, Clock, TrendingUp, Award, Zap, Users } from 'lucide-react';
import { Card, CardContent, Badge, SMSButton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RiskReversalProps {
  className?: string;
}

export function RiskReversal({ className }: RiskReversalProps) {
  const guarantees = [
    {
      icon: TrendingUp,
      title: "67% Conversion Rate Guarantee",
      description: "If your funnel doesn't achieve at least 50% conversion rate within 90 days, I'll rebuild it for free.",
      proof: "My average client sees 67% - yours will too, or I fix it."
    },
    {
      icon: Clock,
      title: "10-Day Delivery Promise",
      description: "Your complete funnel system will be live and converting within 10 business days, guaranteed.",
      proof: "I've never missed a deadline in 47 consecutive projects."
    },
    {
      icon: CheckCircle,
      title: "100% Satisfaction Guarantee",
      description: "If you're not completely thrilled with your funnel transformation, I'll refund every penny.",
      proof: "0% refund rate in the last 18 months."
    }
  ];

  const safetyNets = [
    {
      icon: Users,
      title: "Direct Access to Samantha",
      description: "No junior team members, no outsourcing. You work directly with me throughout the entire process."
    },
    {
      icon: Award,
      title: "Psychology-First Approach",
      description: "Based on behavioral science and $2.1M+ in proven results, not guesswork or generic templates."
    },
    {
      icon: Zap,
      title: "Rapid Implementation",
      description: "While others take months, you'll have a converting funnel in 10 days with priority support."
    }
  ];

  const testimonialHighlights = [
    {
      result: "89% conversion rate",
      client: "Sarah K., Business Coach",
      quote: "Samantha's psychology-first approach is pure magic"
    },
    {
      result: "$147k in 60 days", 
      client: "Marcus T., Consultant",
      quote: "ROI was 4,900% in the first two months"
    },
    {
      result: "73% qualified leads",
      client: "Diana R., Service Provider", 
      quote: "The interactive tools eliminated all tire-kickers"
    }
  ];

  return (
    <section className={cn('py-20 relative', className)}>
      {/* Trust-building background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-wood via-night-indigo to-deep-wood" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(246,198,109,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(152,80,200,0.06),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse">
                <Shield className="w-4 h-4 mr-2" />
                Zero Risk Promise
              </Badge>
            </div>
            
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-candle-gold mb-6 leading-tight">
              I Take All The Risk
              <br />
              <span className="text-parchment">
                So You Don't Have To
              </span>
            </h2>
            
            <p className="text-xl text-parchment/90 leading-relaxed max-w-4xl mx-auto">
              I'm so confident in this system that I'm willing to 
              <span className="text-candle-gold font-semibold"> guarantee your results.</span> 
              If it doesn't work exactly as promised, you don't pay.
            </p>
          </div>

          {/* Main Guarantees */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <Card 
                  key={index}
                  variant="hover"
                  className="bg-parchment/95 border-candle-gold/30 hover:border-candle-gold/60 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-candle-gold/20 to-ember-orange/20 flex items-center justify-center border border-candle-gold/30">
                      <IconComponent className="w-8 h-8 text-candle-gold" />
                    </div>
                    
                    <h3 className="font-heading text-xl font-bold text-night-indigo">
                      {guarantee.title}
                    </h3>
                    
                    <p className="text-deep-wood/80 leading-relaxed">
                      {guarantee.description}
                    </p>
                    
                    <div className="bg-candle-gold/10 rounded-lg p-4 border border-candle-gold/20">
                      <p className="text-sm text-candle-gold font-semibold">
                        ✓ {guarantee.proof}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Safety Nets */}
          <div className="bg-gradient-to-r from-candle-gold/10 via-ember-orange/10 to-candle-gold/10 rounded-2xl p-8 border border-candle-gold/20 backdrop-blur-sm mb-16">
            <h3 className="font-heading text-3xl font-bold text-parchment text-center mb-8">
              Plus These Additional Safeguards
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {safetyNets.map((safety, index) => {
                const IconComponent = safety.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-candle-gold/20 flex items-center justify-center mb-4 border border-candle-gold/30">
                      <IconComponent className="w-6 h-6 text-candle-gold" />
                    </div>
                    
                    <h4 className="font-heading text-lg font-bold text-parchment mb-3">
                      {safety.title}
                    </h4>
                    
                    <p className="text-sm text-parchment/80 leading-relaxed">
                      {safety.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-16">
            <h3 className="font-heading text-3xl font-bold text-candle-gold text-center mb-8">
              What My Recent Clients Are Saying
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonialHighlights.map((testimonial, index) => (
                <Card 
                  key={index}
                  variant="testimonial"
                  className="border-candle-gold/20"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-candle-gold mb-2">
                      {testimonial.result}
                    </div>
                    
                    <p className="text-parchment/80 italic mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <p className="text-sm text-deep-wood font-semibold">
                      — {testimonial.client}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final Risk Reversal Statement */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-parchment/10 to-candle-gold/10 rounded-2xl p-8 border border-candle-gold/20 backdrop-blur-sm">
              <h3 className="font-heading text-3xl font-bold text-candle-gold mb-6">
                Here's The Bottom Line...
              </h3>
              
              <div className="space-y-4 text-lg text-parchment/90 leading-relaxed mb-8">
                <p>
                  You can keep struggling with your current funnel, watching potential revenue slip away every single day...
                </p>
                
                <p>
                  <strong>OR</strong> you can let me take all the risk and transform your funnel into a 
                  <span className="text-candle-gold font-semibold"> psychological conversion machine</span> 
                  that works while you sleep.
                </p>
                
                <p className="text-xl text-candle-gold font-bold">
                  The choice is yours. But the risk is all mine.
                </p>
              </div>
              
              <SMSButton 
                message="Samantha! I love that you take all the risk. I'm ready to move forward with complete confidence. Let's transform my funnel! 💪"
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-candle-gold/25"
              >
                <Shield className="w-5 h-5 mr-2" />
                Yes, I Want This Risk-Free
              </SMSButton>
              
              <p className="text-sm text-parchment/60 mt-6">
                🛡️ 100% Satisfaction Guaranteed • 67% Conversion Promised • 10-Day Delivery
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RiskReversal;
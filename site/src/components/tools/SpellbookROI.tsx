'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap, BookOpen, Crown, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Badge, SMSButton } from '@/components/ui';
import { cn, formatCurrency } from '@/lib/utils';

interface ROIData {
  currentRevenue: number;
  currentConversion: number;
  targetConversion: number;
  trafficVolume: number;
  averageValue: number;
}

interface ROIResults {
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  monthlyIncrease: number;
  annualIncrease: number;
  roi: number;
  paybackPeriod: number;
}

interface SpellbookROIProps {
  onComplete?: (data: { results: ROIResults; email: string; phone?: string }) => void;
  className?: string;
}

export function SpellbookROI({ onComplete, className }: SpellbookROIProps) {
  const [step, setStep] = useState<'calculator' | 'email' | 'results'>('calculator');
  const [roiData, setROIData] = useState<ROIData>({
    currentRevenue: 0,
    currentConversion: 0,
    targetConversion: 67, // Samantha's average
    trafficVolume: 0,
    averageValue: 0
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState<ROIResults | null>(null);

  const calculateROI = (): ROIResults => {
    const { currentRevenue, currentConversion, targetConversion, trafficVolume, averageValue } = roiData;
    
    // Calculate current monthly metrics
    const currentLeads = (trafficVolume * currentConversion) / 100;
    const currentMonthlyRevenue = currentLeads * averageValue;
    
    // Calculate projected metrics with Samantha's average conversion rate
    const projectedLeads = (trafficVolume * targetConversion) / 100;
    const projectedMonthlyRevenue = projectedLeads * averageValue;
    
    // Calculate increases
    const monthlyIncrease = projectedMonthlyRevenue - currentMonthlyRevenue;
    const annualIncrease = monthlyIncrease * 12;
    
    // Calculate ROI and payback period (investment is $3,000)
    const investment = 3000;
    const roi = ((annualIncrease - investment) / investment) * 100;
    const paybackPeriod = investment / monthlyIncrease;

    return {
      currentMonthlyRevenue,
      projectedMonthlyRevenue,
      monthlyIncrease,
      annualIncrease,
      roi,
      paybackPeriod
    };
  };

  const handleCalculate = () => {
    const calculatedResults = calculateROI();
    setResults(calculatedResults);
    setStep('email');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !results) return;
    
    setStep('results');
    
    if (onComplete) {
      onComplete({ results, email, phone });
    }
  };

  const inputValid = roiData.currentRevenue > 0 && 
                    roiData.currentConversion > 0 && 
                    roiData.trafficVolume > 0 && 
                    roiData.averageValue > 0;

  if (step === 'results' && results) {
    return (
      <div className={cn('max-w-4xl mx-auto', className)}>
        <Card className="bg-gradient-to-br from-arcane-violet via-night-indigo to-deep-wood border-candle-gold/30">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Your Spellbook ROI Analysis
              </Badge>
              
              <h2 className="text-4xl font-heading font-bold text-candle-gold mb-4">
                The Numbers Don't Lie
              </h2>
              <p className="text-lg text-parchment/80 max-w-2xl mx-auto leading-relaxed">
                Here's exactly what Samantha's psychology-first approach could do for your business
              </p>
            </div>

            {/* ROI Visualization */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-parchment/10 rounded-lg p-6 border border-candle-gold/20">
                <div className="text-3xl font-bold text-ember-orange mb-2">
                  {formatCurrency(results.monthlyIncrease)}
                </div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">
                  Additional Monthly Revenue
                </div>
              </div>
              
              <div className="bg-parchment/10 rounded-lg p-6 border border-candle-gold/20">
                <div className="text-3xl font-bold text-candle-gold mb-2">
                  {formatCurrency(results.annualIncrease)}
                </div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">
                  Additional Annual Revenue
                </div>
              </div>
              
              <div className="bg-parchment/10 rounded-lg p-6 border border-candle-gold/20">
                <div className="text-3xl font-bold text-arcane-violet mb-2">
                  {Math.round(results.roi).toLocaleString()}%
                </div>
                <div className="text-sm text-parchment/60 uppercase tracking-wide">
                  Return on Investment
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-gradient-to-r from-candle-gold/10 via-ember-orange/10 to-candle-gold/10 rounded-2xl p-6 border border-candle-gold/20 backdrop-blur-sm mb-8">
              <h3 className="text-2xl font-heading font-bold text-candle-gold mb-6">
                The Transformation Breakdown
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-xl font-semibold text-parchment mb-2">Current State</div>
                  <div className="space-y-2 text-parchment/80">
                    <div>Conversion Rate: {roiData.currentConversion}%</div>
                    <div>Monthly Revenue: {formatCurrency(results.currentMonthlyRevenue)}</div>
                    <div className="text-ember-orange font-medium">Missing Potential</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-semibold text-candle-gold mb-2">With Samantha's System</div>
                  <div className="space-y-2 text-parchment/80">
                    <div>Conversion Rate: {roiData.targetConversion}%</div>
                    <div>Monthly Revenue: {formatCurrency(results.projectedMonthlyRevenue)}</div>
                    <div className="text-candle-gold font-medium">Psychology-Optimized</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4 border-t border-candle-gold/20">
                <div className="text-lg text-parchment/90">
                  Investment Recovery Time: <span className="text-candle-gold font-bold">
                    {results.paybackPeriod < 1 ? 
                      `${Math.round(results.paybackPeriod * 30)} days` : 
                      `${results.paybackPeriod.toFixed(1)} months`}
                  </span>
                </div>
              </div>
            </div>

            {/* Reality Check */}
            <div className="bg-gradient-to-r from-ember-orange/20 to-arcane-violet/20 rounded-xl p-6 border border-ember-orange/30 mb-8">
              <h4 className="text-xl font-heading font-bold text-ember-orange mb-3">
                💰 What This Really Means
              </h4>
              <div className="space-y-2 text-parchment/90">
                <p>
                  • Every month you delay costs you <span className="text-candle-gold font-bold">
                    {formatCurrency(results.monthlyIncrease)}
                  </span> in missed revenue
                </p>
                <p>
                  • Your $3,000 investment pays for itself in <span className="text-candle-gold font-bold">
                    {results.paybackPeriod < 1 ? 
                      `${Math.round(results.paybackPeriod * 30)} days` : 
                      `${results.paybackPeriod.toFixed(1)} months`}
                  </span>
                </p>
                <p>
                  • After year one, you're ahead by <span className="text-candle-gold font-bold">
                    {formatCurrency(results.annualIncrease - 3000)}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-parchment">
                Ready to unlock this revenue potential?
              </p>
              
              <SMSButton 
                message={`Samantha! Just used your ROI calculator. With your system, I could add ${formatCurrency(results.monthlyIncrease)} per month (${formatCurrency(results.annualIncrease)} annually) with ${Math.round(results.roi)}% ROI! I need this transformation. Let's talk! 💰`}
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-candle-gold/25"
                customization={{ 
                  MONTHLY_INCREASE: formatCurrency(results.monthlyIncrease),
                  ANNUAL_INCREASE: formatCurrency(results.annualIncrease),
                  ROI_PERCENT: Math.round(results.roi).toString(),
                  EMAIL: email
                }}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Text These Results to Samantha
              </SMSButton>
              
              <p className="text-sm text-parchment/60">
                Get a custom strategy session based on your ROI analysis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'email') {
    return (
      <div className={cn('max-w-2xl mx-auto', className)}>
        <Card className="bg-parchment border-candle-gold/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-night-indigo mb-4">
              Unlock Your ROI Analysis
            </CardTitle>
            <p className="text-deep-wood/80 leading-relaxed">
              Enter your email to reveal your personalized revenue projections 
              and see exactly what Samantha's system could do for your business.
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="your@email.com"
                required
                className="text-lg"
              />
              
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone Number (Optional)"
                placeholder="(555) 123-4567"
                helperText="For priority consultation scheduling"
              />
              
              <Button type="submit" size="xl" className="w-full">
                <Calculator className="w-5 h-5 mr-2" />
                Reveal My ROI Analysis
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="text-center mb-8">
        <Badge variant="alumni" size="lg" className="animate-glow-pulse mb-4">
          <BookOpen className="w-4 h-4 mr-2" />
          Spellbook ROI Calculator
        </Badge>
        
        <h2 className="text-4xl font-heading font-bold text-night-indigo mb-4">
          Calculate Your Revenue Transformation
        </h2>
        <p className="text-lg text-deep-wood/80 max-w-3xl mx-auto leading-relaxed">
          See exactly how much additional revenue Samantha's psychology-first funnel system 
          could generate for your business. The math might shock you.
        </p>
      </div>

      <Card className="bg-parchment border-candle-gold/30 shadow-xl">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-night-indigo mb-4">
                Your Current Numbers
              </h3>
              
              <Input
                type="number"
                value={roiData.currentRevenue || ''}
                onChange={(e) => setROIData(prev => ({ ...prev, currentRevenue: parseFloat(e.target.value) || 0 }))}
                label="Monthly Revenue"
                placeholder="50000"
                helperText="Your current monthly revenue"
              />
              
              <Input
                type="number"
                value={roiData.currentConversion || ''}
                onChange={(e) => setROIData(prev => ({ ...prev, currentConversion: parseFloat(e.target.value) || 0 }))}
                label="Conversion Rate (%)"
                placeholder="23"
                helperText="Current funnel conversion percentage"
              />
              
              <Input
                type="number"
                value={roiData.trafficVolume || ''}
                onChange={(e) => setROIData(prev => ({ ...prev, trafficVolume: parseFloat(e.target.value) || 0 }))}
                label="Monthly Website Visitors"
                placeholder="2000"
                helperText="Average monthly traffic to your funnel"
              />
              
              <Input
                type="number"
                value={roiData.averageValue || ''}
                onChange={(e) => setROIData(prev => ({ ...prev, averageValue: parseFloat(e.target.value) || 0 }))}
                label="Average Customer Value"
                placeholder="2500"
                helperText="Average value per customer/client"
              />
            </div>

            {/* Preview/Target Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-night-indigo mb-4">
                Samantha's Target Results
              </h3>
              
              <div className="bg-gradient-to-br from-candle-gold/10 to-ember-orange/10 rounded-lg p-6 border border-candle-gold/20">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-candle-gold mb-2">67%</div>
                  <div className="text-sm text-deep-wood/60 uppercase tracking-wide">
                    Target Conversion Rate
                  </div>
                  <div className="text-xs text-deep-wood/50 mt-1">
                    Samantha's client average
                  </div>
                </div>
              </div>
              
              {inputValid && (
                <div className="bg-gradient-to-br from-arcane-violet/10 to-night-indigo/10 rounded-lg p-6 border border-arcane-violet/20 animate-glow-pulse">
                  <h4 className="text-lg font-semibold text-night-indigo mb-4">Live Preview</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-deep-wood/70">Current Monthly:</span>
                      <span className="font-semibold text-deep-wood">
                        {formatCurrency((roiData.trafficVolume * roiData.currentConversion / 100) * roiData.averageValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-deep-wood/70">Projected Monthly:</span>
                      <span className="font-semibold text-candle-gold">
                        {formatCurrency((roiData.trafficVolume * roiData.targetConversion / 100) * roiData.averageValue)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-arcane-violet/20 pt-2">
                      <span className="font-semibold text-night-indigo">Monthly Increase:</span>
                      <span className="font-bold text-ember-orange">
                        {formatCurrency(
                          ((roiData.trafficVolume * roiData.targetConversion / 100) * roiData.averageValue) -
                          ((roiData.trafficVolume * roiData.currentConversion / 100) * roiData.averageValue)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleCalculate}
                disabled={!inputValid}
                size="xl"
                className="w-full"
              >
                <Zap className="w-5 h-5 mr-2" />
                Calculate My ROI Potential
              </Button>
              
              {!inputValid && (
                <p className="text-xs text-deep-wood/50 text-center">
                  Fill in all fields to see your calculation
                </p>
              )}
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SpellbookROI;
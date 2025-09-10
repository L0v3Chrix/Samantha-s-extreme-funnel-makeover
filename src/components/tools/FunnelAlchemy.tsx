'use client';

import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle, XCircle, ArrowRight, ArrowLeft, Zap, Crown, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Progress, Button, Input, SMSButton, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface DiagnosticStep {
  id: string;
  title: string;
  description: string;
  options: {
    text: string;
    leakSeverity: 'none' | 'minor' | 'major' | 'critical';
    points: number;
    diagnosis: string;
  }[];
}

interface LeakResult {
  area: string;
  severity: 'none' | 'minor' | 'major' | 'critical';
  diagnosis: string;
  impact: string;
  fix: string;
}

interface FunnelAlchemyProps {
  onComplete?: (data: { leaks: LeakResult[]; email: string; phone?: string; totalScore: number }) => void;
  className?: string;
}

const diagnosticSteps: DiagnosticStep[] = [
  {
    id: 'traffic_source',
    title: 'Traffic Source Quality',
    description: 'The quality of your traffic determines everything downstream',
    options: [
      { 
        text: 'Mostly organic/referral traffic from qualified sources', 
        leakSeverity: 'none', 
        points: 5,
        diagnosis: 'High-quality traffic foundation'
      },
      { 
        text: 'Mix of paid and organic, reasonably targeted', 
        leakSeverity: 'minor', 
        points: 3,
        diagnosis: 'Decent traffic quality with room for optimization'
      },
      { 
        text: 'Mostly paid traffic, broad targeting', 
        leakSeverity: 'major', 
        points: 2,
        diagnosis: 'Traffic quality issues affecting conversion'
      },
      { 
        text: 'Poor targeting, cold traffic, or don\'t know sources', 
        leakSeverity: 'critical', 
        points: 1,
        diagnosis: 'Critical traffic quality leak - wrong people seeing your offer'
      }
    ]
  },
  {
    id: 'first_impression',
    title: 'First Impression & Value Prop',
    description: 'Do visitors immediately understand what you offer and why they need it?',
    options: [
      { 
        text: 'Crystal clear value prop that speaks to specific pain points', 
        leakSeverity: 'none', 
        points: 5,
        diagnosis: 'Strong psychological messaging foundation'
      },
      { 
        text: 'Pretty clear what we do, decent headline', 
        leakSeverity: 'minor', 
        points: 3,
        diagnosis: 'Good clarity but missing emotional hooks'
      },
      { 
        text: 'Somewhat confusing, takes time to understand the offer', 
        leakSeverity: 'major', 
        points: 2,
        diagnosis: 'Clarity leak - visitors confused about value'
      },
      { 
        text: 'Visitors leave immediately, high bounce rate', 
        leakSeverity: 'critical', 
        points: 1,
        diagnosis: 'Critical messaging leak - value proposition failure'
      }
    ]
  },
  {
    id: 'trust_credibility',
    title: 'Trust & Credibility Signals',
    description: 'How quickly do visitors trust you enough to engage?',
    options: [
      { 
        text: 'Multiple trust signals: testimonials, social proof, guarantees, authority', 
        leakSeverity: 'none', 
        points: 5,
        diagnosis: 'Strong trust architecture in place'
      },
      { 
        text: 'Some testimonials and social proof, basic credibility', 
        leakSeverity: 'minor', 
        points: 3,
        diagnosis: 'Decent trust but missing key psychological triggers'
      },
      { 
        text: 'Minimal social proof, questionable credibility signals', 
        leakSeverity: 'major', 
        points: 2,
        diagnosis: 'Trust leak - visitors hesitant to engage'
      },
      { 
        text: 'No testimonials, social proof, or trust signals', 
        leakSeverity: 'critical', 
        points: 1,
        diagnosis: 'Critical trust leak - visitors don\'t believe you can deliver'
      }
    ]
  },
  {
    id: 'urgency_scarcity',
    title: 'Urgency & Scarcity Implementation',
    description: 'What motivates visitors to act NOW instead of later?',
    options: [
      { 
        text: 'Multiple urgency layers: time, quantity, bonuses with real consequences', 
        leakSeverity: 'none', 
        points: 5,
        diagnosis: 'Advanced urgency psychology implemented'
      },
      { 
        text: 'Some urgency elements but not consistent throughout', 
        leakSeverity: 'minor', 
        points: 3,
        diagnosis: 'Basic urgency present but missing psychological depth'
      },
      { 
        text: 'Weak urgency attempts, easily ignored', 
        leakSeverity: 'major', 
        points: 2,
        diagnosis: 'Urgency leak - no compelling reason to act now'
      },
      { 
        text: 'No urgency or scarcity elements at all', 
        leakSeverity: 'critical', 
        points: 1,
        diagnosis: 'Critical urgency leak - visitors procrastinate indefinitely'
      }
    ]
  },
  {
    id: 'objection_handling',
    title: 'Objection Handling Strategy',
    description: 'How well do you address visitor doubts and concerns?',
    options: [
      { 
        text: 'Proactive objection handling throughout, psychological reframing', 
        leakSeverity: 'none', 
        points: 5,
        diagnosis: 'Masterful objection elimination psychology'
      },
      { 
        text: 'FAQ section and some objection addressing in copy', 
        leakSeverity: 'minor', 
        points: 3,
        diagnosis: 'Basic objection handling but missing psychological depth'
      },
      { 
        text: 'Minimal objection addressing, mostly reactive', 
        leakSeverity: 'major', 
        points: 2,
        diagnosis: 'Objection leak - doubts killing conversions'
      },
      { 
        text: 'No systematic objection handling strategy', 
        leakSeverity: 'critical', 
        points: 1,
        diagnosis: 'Critical objection leak - visitors talking themselves out of buying'
      }
    ]
  }
];

const getLeakAnalysis = (leaks: LeakResult[]) => {
  const criticalCount = leaks.filter(l => l.severity === 'critical').length;
  const majorCount = leaks.filter(l => l.severity === 'major').length;
  const minorCount = leaks.filter(l => l.severity === 'minor').length;
  
  let overallHealth = 'Healthy';
  let healthColor = 'candle-gold';
  let recommendation = '';

  if (criticalCount > 0) {
    overallHealth = 'Critical Condition';
    healthColor = 'ember-orange';
    recommendation = 'Your funnel has critical leaks that need immediate attention. Every day you delay is costing significant revenue.';
  } else if (majorCount >= 2) {
    overallHealth = 'Major Issues';
    healthColor = 'ember-orange';
    recommendation = 'Multiple major leaks are severely impacting your conversion rates. Professional intervention needed.';
  } else if (majorCount >= 1 || minorCount >= 3) {
    overallHealth = 'Needs Optimization';
    healthColor = 'candle-gold';
    recommendation = 'Your funnel has good bones but significant optimization opportunities. Psychology-first improvements will yield major gains.';
  } else {
    overallHealth = 'Well-Optimized';
    healthColor = 'arcane-violet';
    recommendation = 'Your funnel is performing well. Advanced psychological fine-tuning could push performance even higher.';
  }

  return { overallHealth, healthColor, recommendation, criticalCount, majorCount, minorCount };
};

export function FunnelAlchemy({ onComplete, className }: FunnelAlchemyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: { severity: string; points: number; diagnosis: string } }>({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAnswer = (stepId: string, option: any) => {
    setAnswers(prev => ({ 
      ...prev, 
      [stepId]: { 
        severity: option.leakSeverity, 
        points: option.points, 
        diagnosis: option.diagnosis 
      } 
    }));
    
    if (currentStep < diagnosticSteps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowEmailCapture(true), 300);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const leaks: LeakResult[] = diagnosticSteps.map(step => {
      const answer = answers[step.id];
      return {
        area: step.title,
        severity: answer.severity as any,
        diagnosis: answer.diagnosis,
        impact: getSeverityImpact(answer.severity as any),
        fix: getSeverityFix(answer.severity as any, step.title)
      };
    });
    
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.points, 0);
    
    setShowEmailCapture(false);
    setShowResults(true);
    
    if (onComplete) {
      onComplete({ leaks, email, phone, totalScore });
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / diagnosticSteps.length) * 100;
  const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.points, 0);

  if (showResults) {
    const leaks: LeakResult[] = diagnosticSteps.map(step => {
      const answer = answers[step.id];
      return {
        area: step.title,
        severity: answer.severity as any,
        diagnosis: answer.diagnosis,
        impact: getSeverityImpact(answer.severity as any),
        fix: getSeverityFix(answer.severity as any, step.title)
      };
    });

    const analysis = getLeakAnalysis(leaks);

    return (
      <div className={cn('max-w-6xl mx-auto', className)}>
        <Card className="bg-gradient-to-br from-deep-wood via-night-indigo to-arcane-violet border-candle-gold/30">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse mb-4">
                <FlaskConical className="w-4 h-4 mr-2" />
                Your Funnel Alchemy Report
              </Badge>
              
              <h2 className="text-4xl font-heading font-bold text-candle-gold mb-4">
                Diagnosis Complete
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-2xl font-bold text-parchment">
                  Funnel Health Score: 
                </div>
                <div className={`text-3xl font-bold text-${analysis.healthColor}`}>
                  {totalScore}/25
                </div>
              </div>
              <div className={`text-xl font-semibold text-${analysis.healthColor} mb-2`}>
                Status: {analysis.overallHealth}
              </div>
              <p className="text-lg text-parchment/80 max-w-3xl mx-auto leading-relaxed">
                {analysis.recommendation}
              </p>
            </div>

            {/* Leak Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {leaks.map((leak, index) => (
                <Card key={index} className="bg-parchment/95 border-candle-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {leak.severity === 'none' && <CheckCircle className="w-6 h-6 text-arcane-violet mr-3" />}
                      {leak.severity === 'minor' && <AlertTriangle className="w-6 h-6 text-candle-gold mr-3" />}
                      {leak.severity === 'major' && <XCircle className="w-6 h-6 text-ember-orange mr-3" />}
                      {leak.severity === 'critical' && <XCircle className="w-6 h-6 text-red-500 mr-3" />}
                      
                      <div>
                        <h4 className="font-semibold text-night-indigo text-sm">{leak.area}</h4>
                        <div className={cn(
                          'text-xs uppercase tracking-wider font-bold',
                          leak.severity === 'none' && 'text-arcane-violet',
                          leak.severity === 'minor' && 'text-candle-gold',
                          leak.severity === 'major' && 'text-ember-orange',
                          leak.severity === 'critical' && 'text-red-500'
                        )}>
                          {leak.severity === 'none' ? 'Optimized' : `${leak.severity} Leak`}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-deep-wood/80 text-sm leading-relaxed">
                      {leak.diagnosis}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="bg-gradient-to-r from-candle-gold/10 via-ember-orange/10 to-candle-gold/10 rounded-2xl p-6 border border-candle-gold/20 backdrop-blur-sm mb-8">
              <div className="grid sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-arcane-violet">{leaks.filter(l => l.severity === 'none').length}</div>
                  <div className="text-sm text-parchment/60 uppercase tracking-wide">Optimized Areas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-candle-gold">{analysis.minorCount}</div>
                  <div className="text-sm text-parchment/60 uppercase tracking-wide">Minor Leaks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ember-orange">{analysis.majorCount}</div>
                  <div className="text-sm text-parchment/60 uppercase tracking-wide">Major Leaks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">{analysis.criticalCount}</div>
                  <div className="text-sm text-parchment/60 uppercase tracking-wide">Critical Leaks</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-parchment mb-6">
                Ready to seal these leaks and transform your funnel?
              </p>
              
              <SMSButton 
                message={`Samantha! Just completed your Funnel Alchemy diagnostic. My funnel health score is ${totalScore}/25 (${analysis.overallHealth}) with ${analysis.criticalCount} critical and ${analysis.majorCount} major leaks. ${analysis.recommendation} I need your help to fix these issues! 🔬`}
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-candle-gold/25"
                customization={{ 
                  SCORE: totalScore.toString(),
                  HEALTH_STATUS: analysis.overallHealth,
                  CRITICAL_LEAKS: analysis.criticalCount.toString(),
                  MAJOR_LEAKS: analysis.majorCount.toString(),
                  EMAIL: email
                }}
              >
                <Target className="w-5 h-5 mr-2" />
                Text My Diagnostic to Samantha
              </SMSButton>
              
              <p className="text-sm text-parchment/60 mt-4">
                Get a custom leak-sealing strategy based on your diagnostic
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showEmailCapture) {
    return (
      <div className={cn('max-w-2xl mx-auto', className)}>
        <Card className="bg-parchment border-candle-gold/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-night-indigo mb-4">
              Reveal Your Funnel Diagnosis
            </CardTitle>
            <p className="text-deep-wood/80 leading-relaxed">
              Enter your email to unlock your complete funnel health report 
              and get specific recommendations for sealing your conversion leaks.
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
                helperText="For urgent leak-sealing consultation"
              />
              
              <Button type="submit" size="xl" className="w-full">
                <FlaskConical className="w-5 h-5 mr-2" />
                Generate My Funnel Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = diagnosticSteps[currentStep];

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="alumni" className="animate-glow-pulse">
            <FlaskConical className="w-4 h-4 mr-2" />
            Funnel Alchemy Finder
          </Badge>
          <span className="text-sm text-deep-wood/60">
            Step {currentStep + 1} of {diagnosticSteps.length}
          </span>
        </div>
        
        <Progress 
          value={progress} 
          variant="alchemy" 
          className="mb-2"
          animated
        />
        
        <div className="text-center text-sm text-deep-wood/60">
          {Math.round(progress)}% Complete - Analyzing Your Funnel
        </div>
      </div>

      <Card className="bg-parchment border-candle-gold/30 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-night-indigo mb-4">
              {step.title}
            </h2>
            <p className="text-lg text-deep-wood/70 leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {step.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(step.id, option)}
                className="w-full p-6 text-left bg-white rounded-lg border-2 border-candle-gold/20 hover:border-candle-gold/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-lg text-night-indigo group-hover:text-candle-gold font-medium leading-relaxed block mb-2">
                      {option.text}
                    </span>
                    <div className="flex items-center space-x-2">
                      {option.leakSeverity === 'none' && <CheckCircle className="w-4 h-4 text-arcane-violet" />}
                      {option.leakSeverity === 'minor' && <AlertTriangle className="w-4 h-4 text-candle-gold" />}
                      {option.leakSeverity === 'major' && <XCircle className="w-4 h-4 text-ember-orange" />}
                      {option.leakSeverity === 'critical' && <XCircle className="w-4 h-4 text-red-500" />}
                      
                      <span className={cn(
                        'text-sm font-semibold uppercase tracking-wide',
                        option.leakSeverity === 'none' && 'text-arcane-violet',
                        option.leakSeverity === 'minor' && 'text-candle-gold',
                        option.leakSeverity === 'major' && 'text-ember-orange',
                        option.leakSeverity === 'critical' && 'text-red-500'
                      )}>
                        {option.leakSeverity === 'none' ? 'Optimized' : `${option.leakSeverity} Leak`}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-candle-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-deep-wood/60">
                Comprehensive funnel leak detection
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper functions
function getSeverityImpact(severity: 'none' | 'minor' | 'major' | 'critical'): string {
  switch (severity) {
    case 'none': return 'No negative impact - this area is well optimized';
    case 'minor': return '5-15% conversion loss - minor optimization opportunity';
    case 'major': return '15-35% conversion loss - significant revenue impact';
    case 'critical': return '35-70% conversion loss - massive revenue hemorrhaging';
  }
}

function getSeverityFix(severity: 'none' | 'minor' | 'major' | 'critical', area: string): string {
  if (severity === 'none') return 'Continue current approach - it\'s working well';
  
  const fixes = {
    'Traffic Source Quality': {
      minor: 'Refine targeting parameters and audience segmentation',
      major: 'Overhaul traffic acquisition strategy and improve qualification',
      critical: 'Complete traffic audit and rebuild acquisition funnel'
    },
    'First Impression & Value Prop': {
      minor: 'Strengthen headline and add emotional hooks',
      major: 'Redesign value proposition with psychology-first messaging',
      critical: 'Complete messaging overhaul with behavioral triggers'
    },
    'Trust & Credibility Signals': {
      minor: 'Add more social proof and testimonials',
      major: 'Implement comprehensive trust architecture',
      critical: 'Build complete credibility system from scratch'
    },
    'Urgency & Scarcity Implementation': {
      minor: 'Strengthen existing urgency elements',
      major: 'Implement multi-layer urgency strategy',
      critical: 'Build complete urgency psychology system'
    },
    'Objection Handling Strategy': {
      minor: 'Proactively address top objections in copy',
      major: 'Implement systematic objection elimination',
      critical: 'Complete objection psychology overhaul needed'
    }
  };

  return fixes[area as keyof typeof fixes]?.[severity] || 'Professional funnel optimization needed';
}

export default FunnelAlchemy;
'use client';

import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ArrowLeft, Sparkles, Crown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Progress, Button, Input, SMSButton, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { funnelEvents } from '@/lib/analytics';

interface Question {
  id: string;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    value: number;
    insight: string;
  }[];
}

interface ConstellationScoreProps {
  onComplete?: (data: { score: number; email: string; phone?: string; insights: string[] }) => void;
  className?: string;
}

const questions: Question[] = [
  {
    id: 'funnel_performance',
    question: 'What\'s your current funnel conversion rate?',
    subtitle: 'Be honest - this determines your Constellation alignment',
    options: [
      { text: 'Under 10% (or I don\'t know)', value: 1, insight: 'Your funnel lacks psychological foundation' },
      { text: '10-25%', value: 2, insight: 'Basic conversion principles present' },
      { text: '25-40%', value: 3, insight: 'Good foundation, needs optimization' },
      { text: '40-60%', value: 4, insight: 'Strong performance with potential' },
      { text: 'Over 60%', value: 5, insight: 'You\'re already using advanced psychology' }
    ]
  },
  {
    id: 'psychology_awareness',
    question: 'How well do you understand your buyer\'s psychology?',
    subtitle: 'This reveals your Constellation\'s depth',
    options: [
      { text: 'I focus mainly on features and benefits', value: 1, insight: 'Missing the psychological layer entirely' },
      { text: 'I know some pain points and desires', value: 2, insight: 'Surface-level psychological understanding' },
      { text: 'I understand decision triggers and objections', value: 3, insight: 'Good grasp of buyer psychology' },
      { text: 'I map emotional journeys and cognitive biases', value: 4, insight: 'Advanced psychological insight' },
      { text: 'I engineer subconscious responses and behaviors', value: 5, insight: 'Master-level psychological design' }
    ]
  },
  {
    id: 'urgency_scarcity',
    question: 'How do you create urgency in your offers?',
    subtitle: 'Urgency alignment affects Constellation brightness',
    options: [
      { text: 'I don\'t really use urgency', value: 1, insight: 'Missing critical conversion catalyst' },
      { text: 'Basic countdown timers or "limited time"', value: 2, insight: 'Using urgency but not strategically' },
      { text: 'Deadline-driven with real consequences', value: 3, insight: 'Good urgency implementation' },
      { text: 'Multiple urgency layers (time, quantity, bonus)', value: 4, insight: 'Advanced urgency orchestration' },
      { text: 'Psychological urgency based on loss aversion', value: 5, insight: 'Expert urgency psychology' }
    ]
  },
  {
    id: 'social_proof',
    question: 'How do you leverage social proof?',
    subtitle: 'Social validation strengthens Constellation power',
    options: [
      { text: 'Testimonials on my website', value: 1, insight: 'Basic social proof implementation' },
      { text: 'Customer reviews and case studies', value: 2, insight: 'Standard social proof usage' },
      { text: 'Specific results and transformation stories', value: 3, insight: 'Results-focused social proof' },
      { text: 'Authority positioning and media mentions', value: 4, insight: 'Authority-based social validation' },
      { text: 'Psychological social proof triggers throughout funnel', value: 5, insight: 'Master-level social proof psychology' }
    ]
  },
  {
    id: 'objection_handling',
    question: 'How do you handle objections in your funnel?',
    subtitle: 'Objection mastery reveals Constellation maturity',
    options: [
      { text: 'I don\'t really address objections directly', value: 1, insight: 'Objections are killing your conversion' },
      { text: 'FAQ section covers common questions', value: 2, insight: 'Basic objection acknowledgment' },
      { text: 'Proactive objection handling in copy', value: 3, insight: 'Good objection management' },
      { text: 'Objections addressed before they arise', value: 4, insight: 'Advanced objection prevention' },
      { text: 'Psychological reframing that eliminates objections', value: 5, insight: 'Master-level objection alchemy' }
    ]
  },
  {
    id: 'value_presentation',
    question: 'How do you present your offer\'s value?',
    subtitle: 'Value articulation affects Constellation clarity',
    options: [
      { text: 'List of features and what\'s included', value: 1, insight: 'Feature-focused, not value-focused' },
      { text: 'Benefits and outcomes they\'ll receive', value: 2, insight: 'Benefit-aware but not psychologically driven' },
      { text: 'Transformation and before/after states', value: 3, insight: 'Transformation-focused approach' },
      { text: 'ROI calculation and value stacking', value: 4, insight: 'Advanced value demonstration' },
      { text: 'Psychological value anchoring with emotional triggers', value: 5, insight: 'Expert psychological value presentation' }
    ]
  },
  {
    id: 'funnel_optimization',
    question: 'How do you optimize your funnel performance?',
    subtitle: 'Optimization approach reveals Constellation evolution',
    options: [
      { text: 'I don\'t really track or optimize', value: 1, insight: 'Flying blind without data' },
      { text: 'Basic analytics and occasional tweaks', value: 2, insight: 'Minimal optimization effort' },
      { text: 'Regular A/B testing of elements', value: 3, insight: 'Data-driven optimization mindset' },
      { text: 'Systematic testing with psychological hypotheses', value: 4, insight: 'Advanced optimization strategy' },
      { text: 'Behavioral psychology testing with deep analytics', value: 5, insight: 'Master-level optimization science' }
    ]
  }
];

const getScoreInsights = (score: number) => {
  if (score <= 14) {
    return {
      level: 'Dim Star',
      color: 'ember-orange',
      description: 'Your funnel psychology is just beginning to awaken',
      recommendation: 'You need immediate psychological intervention. Your current approach is leaving massive money on the table.',
      potential: 'With proper psychology implementation, you could see 300-500% conversion improvement.'
    };
  } else if (score <= 21) {
    return {
      level: 'Glowing Ember',
      color: 'candle-gold',
      description: 'You have basic psychological awareness but lack strategic implementation',
      recommendation: 'You understand the concepts but need advanced psychological architecture to see breakthrough results.',
      potential: 'Strategic psychology upgrades could deliver 150-250% conversion increases.'
    };
  } else if (score <= 28) {
    return {
      level: 'Bright Constellation',
      color: 'arcane-violet',
      description: 'You\'re using psychology strategically but missing the advanced triggers',
      recommendation: 'You\'re on the right track. Advanced psychological engineering will push you to elite performance.',
      potential: 'Fine-tuned psychological optimization could add 50-100% to your current results.'
    };
  } else {
    return {
      level: 'Master Constellation',
      color: 'candle-gold',
      description: 'You\'re already operating at an advanced psychological level',
      recommendation: 'You understand deep psychology. You likely just need technical execution and fresh perspective.',
      potential: 'Expert-level refinements and new psychological angles could add 20-40% improvement.'
    };
  }
};

export function ConstellationScore({ onComplete, className }: ConstellationScoreProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: { value: number; insight: string } }>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  // Track tool start
  useEffect(() => {
    funnelEvents.constellationQuizStarted();
    funnelEvents.toolStarted('constellation_score');
  }, []);

  const handleAnswer = (questionId: string, value: number, insight: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { value, insight } }));
    
    // Track question answered
    funnelEvents.constellationQuestionAnswered(currentQuestion, { value, text: insight });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowEmailCapture(true), 300);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.value, 0);
    const insights = Object.values(answers).map(answer => answer.insight);
    const scoreData = getScoreInsights(totalScore);
    
    // Track email capture and results
    funnelEvents.constellationEmailCaptured(email, phone);
    funnelEvents.constellationResultsViewed(totalScore, scoreData.level);
    funnelEvents.toolCompleted('constellation_score', { 
      score: totalScore, 
      level: scoreData.level,
      email,
      hasPhone: !!phone
    });
    
    setShowEmailCapture(false);
    setShowResults(true);
    
    if (onComplete) {
      onComplete({ score: totalScore, email, phone, insights });
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.value, 0);
  const scoreData = getScoreInsights(totalScore);

  if (showResults) {
    return (
      <div className={cn('max-w-4xl mx-auto', className)}>
        <Card className="bg-gradient-to-br from-night-indigo via-deep-wood to-arcane-violet border-candle-gold/30">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <Badge variant="alumni" size="lg" className="animate-glow-pulse mb-4">
                <Crown className="w-4 h-4 mr-2" />
                Your Constellation Score™
              </Badge>
              
              <div className="mb-6">
                <div className="text-6xl font-bold text-candle-gold mb-2">
                  {totalScore}
                  <span className="text-2xl text-parchment/60">/35</span>
                </div>
                <div className={`text-2xl font-heading font-bold text-${scoreData.color} mb-2`}>
                  {scoreData.level}
                </div>
                <p className="text-lg text-parchment/80 max-w-2xl mx-auto leading-relaxed">
                  {scoreData.description}
                </p>
              </div>

              {/* Constellation Visualization */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-candle-gold/20 via-arcane-violet/20 to-ember-orange/20 rounded-full blur-xl animate-glow-pulse" />
                <div className="relative w-full h-full rounded-full border-2 border-candle-gold/30 flex items-center justify-center bg-night-indigo/40 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-3 h-3 rounded-full animate-constellation-twinkle',
                          i < Math.floor((totalScore / 35) * 7) ? `bg-${scoreData.color}` : 'bg-parchment/20'
                        )}
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-parchment/10 rounded-lg p-6 border border-candle-gold/20">
                <h3 className="text-xl font-heading font-bold text-candle-gold mb-3">
                  💡 What This Means
                </h3>
                <p className="text-parchment/90 leading-relaxed mb-4">
                  {scoreData.recommendation}
                </p>
                <p className="text-candle-gold font-semibold">
                  {scoreData.potential}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-parchment mb-4">
                Ready to transform your funnel psychology?
              </p>
              
              <SMSButton 
                message={`Samantha! I just took the Constellation Score quiz and got ${totalScore}/35 (${scoreData.level}). ${scoreData.recommendation} I'm ready to discuss how you can help transform my funnel psychology! ✨`}
                variant="sms"
                size="xl"
                className="shadow-2xl hover:shadow-candle-gold/25"
                customization={{ 
                  SCORE: totalScore.toString(),
                  LEVEL: scoreData.level,
                  EMAIL: email
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Text My Results to Samantha
              </SMSButton>
              
              <p className="text-sm text-parchment/60">
                Get personalized recommendations based on your Constellation Score™
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
              Reveal Your Constellation Score™
            </CardTitle>
            <p className="text-deep-wood/80 leading-relaxed">
              Enter your email to unlock your personalized psychological assessment 
              and get specific recommendations for your funnel transformation.
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
                helperText="For faster communication about your results"
              />
              
              <Button type="submit" size="xl" className="w-full">
                <Star className="w-5 h-5 mr-2" />
                Reveal My Constellation Score™
              </Button>
              
              <p className="text-xs text-deep-wood/60 text-center leading-relaxed">
                Your information is secure and will only be used to provide your 
                personalized assessment results. No spam, ever.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="alumni" className="animate-glow-pulse">
            <Star className="w-4 h-4 mr-2" />
            Constellation Score™ Quiz
          </Badge>
          <span className="text-sm text-deep-wood/60">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <Progress 
          value={progress} 
          variant="constellation" 
          className="mb-2"
          animated
        />
        
        <div className="text-center text-sm text-deep-wood/60">
          {Math.round(progress)}% Complete
        </div>
      </div>

      <Card className="bg-parchment border-candle-gold/30 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-night-indigo mb-4">
              {question.question}
            </h2>
            {question.subtitle && (
              <p className="text-lg text-deep-wood/70">
                {question.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option.value, option.insight)}
                className="w-full p-6 text-left bg-white rounded-lg border-2 border-candle-gold/20 hover:border-candle-gold/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg text-night-indigo group-hover:text-candle-gold font-medium leading-relaxed">
                    {option.text}
                  </span>
                  <ArrowRight className="w-5 h-5 text-candle-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentQuestion === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-deep-wood/60">
                Takes less than 3 minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConstellationScore;
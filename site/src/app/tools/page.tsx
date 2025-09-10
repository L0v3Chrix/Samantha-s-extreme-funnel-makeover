'use client';

import React, { useState } from 'react';
import { Star, Calculator, FlaskConical, ArrowRight, Home } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { ConstellationScore, SpellbookROI, FunnelAlchemy } from '@/components/tools';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ActiveTool = 'none' | 'constellation' | 'roi' | 'alchemy';

const tools = [
  {
    id: 'constellation' as const,
    title: 'Constellation Score™ Quiz',
    description: 'Discover your funnel\'s psychological alignment and conversion potential',
    icon: Star,
    color: 'arcane-violet',
    features: [
      '7-question psychological assessment',
      'Personalized conversion insights',
      'Psychology-based recommendations',
      'Custom SMS results delivery'
    ],
    timeToComplete: '3 minutes',
    completionRate: '73%'
  },
  {
    id: 'roi' as const,
    title: 'Spellbook ROI Calculator',
    description: 'Calculate exact revenue impact of psychology-first funnel optimization',
    icon: Calculator,
    color: 'candle-gold',
    features: [
      'Revenue projection modeling',
      'Conversion rate impact analysis',
      'ROI and payback calculations',
      'Custom financial projections'
    ],
    timeToComplete: '2 minutes',
    completionRate: '68%'
  },
  {
    id: 'alchemy' as const,
    title: 'Funnel Alchemy Finder',
    description: 'Diagnose conversion leaks and identify psychological repair strategies',
    icon: FlaskConical,
    color: 'ember-orange',
    features: [
      'Comprehensive leak detection',
      '5-point diagnostic system',
      'Severity impact analysis',
      'Custom repair recommendations'
    ],
    timeToComplete: '4 minutes',
    completionRate: '71%'
  }
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('none');

  const handleToolComplete = (toolId: string, data: any) => {
    console.log(`Tool ${toolId} completed with data:`, data);
    // Here you would typically send data to analytics or backend
  };

  if (activeTool !== 'none') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-parchment via-candle-gold/5 to-parchment py-8">
        <div className="container mx-auto px-6">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveTool('none')}
              >
                <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                All Tools
              </Button>
            </div>
          </div>

          {/* Active Tool Content */}
          <div className="mb-8">
            {activeTool === 'constellation' && (
              <ConstellationScore 
                onComplete={(data) => handleToolComplete('constellation', data)}
              />
            )}
            {activeTool === 'roi' && (
              <SpellbookROI 
                onComplete={(data) => handleToolComplete('roi', data)}
              />
            )}
            {activeTool === 'alchemy' && (
              <FunnelAlchemy 
                onComplete={(data) => handleToolComplete('alchemy', data)}
              />
            )}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-candle-gold/5 to-parchment py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Back to Main Page
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center mb-6">
            <Badge variant="alumni" size="lg" className="animate-glow-pulse">
              🎯 Interactive Demo Tools
            </Badge>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-night-indigo mb-6 leading-tight">
            Experience Samantha's
            <br />
            <span className="bg-gradient-to-r from-candle-gold via-ember-orange to-arcane-violet bg-clip-text text-transparent">
              Psychology-First Tools
            </span>
          </h1>
          
          <p className="text-xl text-deep-wood/80 leading-relaxed max-w-3xl mx-auto">
            Get a taste of the custom interactive tools that make Samantha's funnels convert at 67%+. 
            Each tool demonstrates the <span className="text-candle-gold font-semibold">psychology-first approach</span> 
            that transforms visitors into buyers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="bg-parchment border-candle-gold/30 hover:border-candle-gold/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer"
                onClick={() => setActiveTool(tool.id)}
              >
                <CardContent className="p-8">
                  
                  {/* Tool Icon & Title */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-${tool.color}/20 to-${tool.color}/30 flex items-center justify-center mb-4 border border-${tool.color}/30 group-hover:animate-glow-pulse`}>
                      <IconComponent className={`w-8 h-8 text-${tool.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-heading font-bold text-night-indigo mb-2 group-hover:text-candle-gold transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-deep-wood/80 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="space-y-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-deep-wood">
                          <div className={`w-1.5 h-1.5 bg-${tool.color} rounded-full mr-3 flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tool Stats */}
                  <div className={`bg-${tool.color}/10 rounded-lg p-4 border border-${tool.color}/20 mb-6`}>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-night-indigo">{tool.timeToComplete}</div>
                        <div className="text-xs text-deep-wood/60 uppercase tracking-wide">Time to Complete</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-night-indigo">{tool.completionRate}</div>
                        <div className="text-xs text-deep-wood/60 uppercase tracking-wide">Completion Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full group-hover:shadow-lg transition-shadow"
                    onClick={() => setActiveTool(tool.id)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    Try This Tool
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-night-indigo via-deep-wood to-night-indigo rounded-2xl p-8 border border-candle-gold/30">
            <h3 className="text-3xl font-heading font-bold text-candle-gold mb-4">
              Ready for Your Custom Tools?
            </h3>
            
            <p className="text-lg text-parchment/90 mb-6 leading-relaxed">
              These demos show just a fraction of what's possible. Your custom funnel includes 
              <span className="text-candle-gold font-semibold"> 3 fully-customized tools </span>
              designed specifically for your business, audience, and psychology.
            </p>
            
            <Link href="/">
              <Button variant="secondary" size="lg" className="shadow-xl hover:shadow-2xl">
                See the Complete System
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
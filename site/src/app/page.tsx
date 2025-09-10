import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections';
import WebVitals from '@/components/WebVitals';

// Lazy load sections that are below the fold for better performance
const ProblemAgitation = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ProblemAgitation })), {
  loading: () => <div className="h-[100vh] animate-pulse bg-gray-50" />
});

const DreamOutcome = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.DreamOutcome })), {
  loading: () => <div className="h-[100vh] animate-pulse bg-gray-50" />
});

const ValueStack = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.ValueStack })), {
  loading: () => <div className="h-[100vh] animate-pulse bg-gray-50" />
});

const RiskReversal = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.RiskReversal })), {
  loading: () => <div className="h-[100vh] animate-pulse bg-gray-50" />
});

const UrgencyScarcity = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.UrgencyScarcity })), {
  loading: () => <div className="h-[100vh] animate-pulse bg-gray-50" />
});

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section - First Impression & Value Prop */}
        <Hero />
        
        {/* Problem Agitation - Pain Points & Current State */}
        <ProblemAgitation />
        
        {/* Dream Outcome - Future State & Transformation */}
        <DreamOutcome />
        
        {/* Value Stack - What They Get & Pricing */}
        <ValueStack />
        
        {/* Risk Reversal - Guarantees & Trust Building */}
        <RiskReversal />
        
        {/* Urgency/Scarcity - Final Push & CTA */}
        <UrgencyScarcity />
      </main>
      
      {/* Performance monitoring */}
      <WebVitals />
    </>
  );
}
import { 
  Hero, 
  ProblemAgitation, 
  DreamOutcome, 
  ValueStack, 
  RiskReversal, 
  UrgencyScarcity 
} from '@/components/sections';
import WebVitals from '@/components/WebVitals';

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
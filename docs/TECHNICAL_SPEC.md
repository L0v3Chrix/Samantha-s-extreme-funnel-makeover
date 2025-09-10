# Technical Specifications: Samantha's Extreme Funnel Makeover

## Architecture Overview

### Technology Stack
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + custom CSS variables
- **UI Components:** shadcn/ui + custom components
- **Animation:** Framer Motion + CSS animations
- **Form Handling:** React Hook Form + Zod validation
- **Analytics:** PostHog for event tracking
- **Deployment:** Vercel (recommended) or custom hosting

### Project Structure
```
/site/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with fonts, analytics
│   │   ├── page.tsx                 # Main landing page
│   │   ├── globals.css              # Global styles + Tailwind imports
│   │   └── api/                     # API routes
│   │       ├── analytics/           # Custom analytics endpoints
│   │       ├── tools/               # Interactive tool APIs
│   │       └── sms/                 # SMS tracking endpoints
│   ├── components/
│   │   ├── sections/                # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ProblemAgitation.tsx
│   │   │   ├── DreamOutcome.tsx
│   │   │   ├── OfferStack.tsx
│   │   │   ├── InteractiveTools.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── RiskReversal.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── tools/                   # Interactive demo tools
│   │   │   ├── ConstellationScore.tsx
│   │   │   ├── SpellbookROI.tsx
│   │   │   └── FunnelAlchemy.tsx
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── AnimatedCounter.tsx
│   │   ├── analytics/               # Analytics components
│   │   │   ├── PostHogProvider.tsx
│   │   │   ├── EventTracker.tsx
│   │   │   └── ScrollTracker.tsx
│   │   └── animations/              # Animation components
│   │       ├── ConstellationField.tsx
│   │       ├── GlowingParticles.tsx
│   │       └── MagicalTransitions.tsx
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   ├── constants.ts             # App constants
│   │   ├── analytics.ts             # Analytics helpers
│   │   ├── sms.ts                   # SMS deep link logic
│   │   ├── validations.ts           # Zod schemas
│   │   └── calculations.ts          # Tool calculation logic
│   ├── styles/
│   │   ├── animations.css           # Custom animation classes
│   │   └── components.css           # Component-specific styles
│   └── types/
│       ├── tools.ts                 # Type definitions for tools
│       ├── analytics.ts             # Analytics event types
│       └── api.ts                   # API response types
├── public/
│   ├── images/                      # Optimized images
│   │   ├── samantha/               # Samantha's photos
│   │   ├── brand/                  # Brand assets
│   │   ├── tools/                  # Tool-related graphics
│   │   └── social/                 # Social proof images
│   ├── fonts/                      # Custom web fonts
│   ├── favicon.ico
│   └── manifest.json
└── Configuration files (package.json, tailwind.config.ts, etc.)
```

## Core Dependencies

### Production Dependencies
```json
{
  "next": "14.2.5",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.2",
  "framer-motion": "^11.3.21",
  "react-hook-form": "^7.47.0",
  "zod": "^3.22.4",
  "@hookform/resolvers": "^3.3.2",
  "posthog-js": "^1.88.4",
  "lucide-react": "^0.292.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.8.0",
  "@types/react": "^18.2.28",
  "@types/react-dom": "^18.2.13",
  "tailwindcss": "^3.3.5",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.31",
  "eslint": "^8.52.0",
  "eslint-config-next": "14.2.5",
  "@tailwindcss/typography": "^0.5.10"
}
```

## Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
```

### Tailwind Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand color palette
        'night-indigo': '#1F2139',
        'candle-gold': '#F6C66D',
        'ember-orange': '#E8963A',
        'parchment': '#F4E8CE',
        'deep-wood': '#5A3B2E',
        'arcane-violet': '#6D4A7F',
        'crystal-teal': '#2FA7A3',
      },
      fontFamily: {
        'heading': ['Fraunces', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'constellation-twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(246, 198, 109, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(246, 198, 109, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Interactive Tools Architecture

### Tool Data Flow
```
User Interaction → Form Validation → Calculation Engine → Result Display → CTA Tracking
      ↓                   ↓                ↓               ↓              ↓
   React State    →    Zod Schema   →   Pure Function  →  Animation   →  PostHog
```

### Tool State Management
Each tool uses React Hook Form with Zod validation:

```typescript
// Example tool structure
interface ToolData {
  answers: Record<string, number | string>;
  result: ToolResult | null;
  isCompleted: boolean;
  startTime: number;
  completionTime?: number;
}

interface ToolResult {
  score: number;
  tier: 'low' | 'medium' | 'high';
  recommendations: string[];
  ctaMessage: string;
}
```

### Calculation Functions
Pure functions for each tool's logic:

```typescript
// Constellation Score calculation
export function calculateConstellationScore(answers: ConstellationAnswers): ConstellationResult {
  const weights = {
    audience: 2,
    offer: 2,
    hook: 1.5,
    social: 1.25,
    nurture: 1.25,
    traffic: 1,
    tech: 1
  };
  
  const score = Math.round(
    (answers.audience * weights.audience +
     answers.offer * weights.offer +
     answers.hook * weights.hook +
     answers.social * weights.social +
     answers.nurture * weights.nurture +
     answers.traffic * weights.traffic +
     answers.tech * weights.tech) / 10 * 100
  );
  
  return {
    score,
    tier: score >= 85 ? 'high' : score >= 60 ? 'medium' : 'low',
    recommendations: generateRecommendations(score, answers),
    ctaMessage: generateCTAMessage(score)
  };
}
```

## SMS Deep Linking Implementation

### SMS URL Generation
```typescript
export function generateSMSLink(message: string, phoneNumber: string): string {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // User agent detection for proper format
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS) {
    return `sms:${cleanPhone}&body=${encodedMessage}`;
  } else if (isAndroid) {
    return `sms:${cleanPhone}?body=${encodedMessage}`;
  } else {
    // Default format for other mobile browsers
    return `sms:${cleanPhone}?body=${encodedMessage}`;
  }
}
```

### Desktop Fallback
```typescript
export function handleSMSCTA(message: string, phoneNumber: string) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.location.href = generateSMSLink(message, phoneNumber);
  } else {
    // Show QR code modal for desktop users
    showQRCodeModal(generateSMSLink(message, phoneNumber), message, phoneNumber);
  }
  
  // Track CTA click
  trackEvent('sms_cta_clicked', {
    device: isMobile ? 'mobile' : 'desktop',
    message,
    phoneNumber
  });
}
```

## Analytics Implementation

### PostHog Configuration
```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // We'll manually track pageviews
      capture_pageleave: true,
      autocapture: false, // We'll manually track events
    });
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};
```

### Key Events to Track
```typescript
// Analytics event types
type AnalyticsEvent = 
  | 'page_view'
  | 'scroll_depth'
  | 'tool_started'
  | 'tool_completed'
  | 'tool_score_calculated'
  | 'email_captured'
  | 'phone_captured'
  | 'sms_cta_clicked'
  | 'founders_counter_viewed'
  | 'faq_opened'
  | 'social_proof_clicked';
```

## Performance Optimization

### Image Optimization
- Use Next.js Image component with priority loading for hero images
- AVIF/WebP format with fallbacks
- Responsive images with proper sizing
- Lazy loading for below-fold content

### Bundle Optimization
- Dynamic imports for heavy components
- Code splitting by route and feature
- Tree shaking for unused exports
- Minimize CSS-in-JS runtime

### Caching Strategy
```typescript
// API route caching headers
export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=86400',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
    },
  });
}
```

## Security Considerations

### Input Validation
- All form inputs validated with Zod schemas
- Rate limiting on API endpoints
- CSRF protection on form submissions

### Data Privacy
- Minimal data collection (email/phone only when consented)
- No sensitive data in localStorage
- Clear data retention policies

### Content Security Policy
```typescript
// next.config.ts security headers
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];
```

## API Design

### Endpoints Structure
```
/api/
├── analytics/
│   ├── track           # POST - Track custom events
│   └── pageview        # POST - Track page views
├── tools/
│   ├── constellation   # POST - Calculate quiz score
│   ├── roi            # POST - Calculate ROI metrics
│   └── diagnostic     # POST - Run funnel diagnostic
├── leads/
│   └── capture        # POST - Capture email/phone
└── sms/
    └── track          # POST - Track SMS CTA clicks
```

### API Response Format
```typescript
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

## Environment Variables

### Required Variables
```bash
# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://samantha-funnel.vercel.app
NEXT_PUBLIC_SMS_PHONE=+16176428741

# Development
NODE_ENV=development
```

### Optional Variables
```bash
# Custom Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Lead Capture (if integrating with external CRM)
CRM_API_KEY=your_crm_api_key_here
CRM_API_URL=https://api.crm-provider.com

# Custom Domain
NEXT_PUBLIC_CUSTOM_DOMAIN=samantha.example.com
```

## Deployment Configuration

### Vercel Deployment
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Build Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "build-analyze": "ANALYZE=true npm run build"
  }
}
```

## Browser Support

### Target Browsers
- Chrome 88+ (95% coverage)
- Safari 14+ (iOS 14+)
- Firefox 85+
- Edge 88+
- Samsung Internet 15+

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced interactions with JavaScript enabled
- Graceful fallbacks for older browsers
- Touch-friendly interactions on mobile

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Color contrast ratio > 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Focus management for interactive elements

### Implementation Checklist
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Color is not the only means of conveying information
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Page has a logical tab order
- [ ] Form labels are properly associated with inputs
- [ ] Error messages are announced to screen readers

This technical specification provides the foundation for building a high-performance, accessible, and maintainable offer page that meets all project requirements while following modern web development best practices.
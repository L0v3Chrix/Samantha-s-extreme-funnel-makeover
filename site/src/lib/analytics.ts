// PostHog Analytics Integration for Samantha's Funnel

import { PostHog } from 'posthog-js';

// PostHog configuration
const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

let posthog: PostHog | null = null;

// Initialize PostHog (client-side only)
export const initPostHog = () => {
  if (typeof window !== 'undefined' && POSTHOG_API_KEY && !posthog) {
    const PostHogLib = require('posthog-js').default;
    PostHogLib.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      autocapture: false, // We'll track specific events manually
      capture_pageview: false, // We'll handle pageviews manually
      disable_session_recording: false,
      loaded: (posthogInstance: PostHog) => {
        if (process.env.NODE_ENV === 'development') {
          posthogInstance.debug();
        }
      }
    });
    posthog = PostHogLib;
  }
  return posthog;
};

// Get PostHog instance
export const getPostHog = (): PostHog | null => {
  if (typeof window === 'undefined') return null;
  return posthog || initPostHog();
};

// Event tracking functions
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const ph = getPostHog();
  if (ph) {
    ph.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title
    });
  }
};

// Page view tracking
export const trackPageView = (pageName?: string) => {
  const ph = getPostHog();
  if (ph) {
    ph.capture('$pageview', {
      page_name: pageName || document.title,
      url: window.location.href
    });
  }
};

// User identification
export const identifyUser = (userId: string, properties: Record<string, any> = {}) => {
  const ph = getPostHog();
  if (ph) {
    ph.identify(userId, properties);
  }
};

// Funnel-specific event tracking
export const funnelEvents = {
  // Page Section Interactions
  heroViewed: () => trackEvent('hero_section_viewed'),
  heroCtaClicked: () => trackEvent('hero_cta_clicked'),
  
  problemAgitationViewed: () => trackEvent('problem_agitation_viewed'),
  dreamOutcomeViewed: () => trackEvent('dream_outcome_viewed'),
  valueStackViewed: () => trackEvent('value_stack_viewed'),
  riskReversalViewed: () => trackEvent('risk_reversal_viewed'),
  urgencyScarcityViewed: () => trackEvent('urgency_scarcity_viewed'),
  
  // Interactive Tools
  toolsPageViewed: () => trackEvent('tools_page_viewed'),
  toolStarted: (toolName: string) => trackEvent('tool_started', { tool_name: toolName }),
  toolCompleted: (toolName: string, data: any) => trackEvent('tool_completed', { 
    tool_name: toolName, 
    completion_data: data 
  }),
  toolAbandoned: (toolName: string, stepCompleted: number, totalSteps: number) => trackEvent('tool_abandoned', {
    tool_name: toolName,
    step_completed: stepCompleted,
    total_steps: totalSteps,
    completion_percentage: (stepCompleted / totalSteps) * 100
  }),
  
  // Constellation Score specific
  constellationQuizStarted: () => trackEvent('constellation_quiz_started'),
  constellationQuestionAnswered: (questionIndex: number, answer: any) => trackEvent('constellation_question_answered', {
    question_index: questionIndex,
    answer_value: answer.value,
    answer_text: answer.text
  }),
  constellationEmailCaptured: (email: string, phone?: string) => trackEvent('constellation_email_captured', {
    has_phone: !!phone
  }),
  constellationResultsViewed: (score: number, level: string) => trackEvent('constellation_results_viewed', {
    score,
    level
  }),
  
  // ROI Calculator specific
  roiCalculatorStarted: () => trackEvent('roi_calculator_started'),
  roiCalculatorCompleted: (results: any) => trackEvent('roi_calculator_completed', {
    monthly_increase: results.monthlyIncrease,
    annual_increase: results.annualIncrease,
    roi_percentage: results.roi,
    payback_period: results.paybackPeriod
  }),
  
  // Funnel Alchemy specific
  alchemyFinderStarted: () => trackEvent('alchemy_finder_started'),
  alchemyStepCompleted: (stepIndex: number, severity: string) => trackEvent('alchemy_step_completed', {
    step_index: stepIndex,
    leak_severity: severity
  }),
  alchemyResultsViewed: (totalScore: number, healthStatus: string) => trackEvent('alchemy_results_viewed', {
    total_score: totalScore,
    health_status: healthStatus
  }),
  
  // SMS Integration
  smsButtonClicked: (message: string, context: string) => trackEvent('sms_button_clicked', {
    message_preview: message.substring(0, 100),
    context,
    is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }),
  smsLaunched: (success: boolean, platform: string) => trackEvent('sms_launched', {
    success,
    platform,
    user_agent: navigator.userAgent
  }),
  desktopFallbackShown: () => trackEvent('desktop_sms_fallback_shown'),
  
  // Lead Capture
  emailCaptured: (email: string, source: string, hasPhone: boolean = false) => trackEvent('email_captured', {
    source,
    has_phone: hasPhone,
    email_domain: email.split('@')[1]
  }),
  
  // Conversion Events
  mainCtaClicked: (location: string) => trackEvent('main_cta_clicked', { location }),
  urgencyTimerViewed: () => trackEvent('urgency_timer_viewed'),
  guaranteesSectionViewed: () => trackEvent('guarantees_section_viewed')
};

// Funnel performance tracking
export const trackFunnelStep = (step: string, additionalData: Record<string, any> = {}) => {
  trackEvent('funnel_step_completed', {
    funnel_step: step,
    ...additionalData
  });
};

// Error tracking
export const trackError = (error: Error, context: string) => {
  trackEvent('error_occurred', {
    error_message: error.message,
    error_stack: error.stack,
    context
  });
};

// Custom conversion events
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion_completed', {
    conversion_type: conversionType,
    conversion_value: value
  });
};

// Session quality tracking
export const trackEngagement = (engagementType: string, duration?: number) => {
  trackEvent('engagement_tracked', {
    engagement_type: engagementType,
    duration_seconds: duration
  });
};

export default {
  init: initPostHog,
  track: trackEvent,
  trackPageView,
  identify: identifyUser,
  funnel: funnelEvents,
  trackFunnelStep,
  trackError,
  trackConversion,
  trackEngagement
};
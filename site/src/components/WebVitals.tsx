'use client'

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { usePostHog } from 'posthog-js/react';

export default function WebVitals() {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    // Track Core Web Vitals
    onCLS((metric) => {
      posthog.capture('web_vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });

    // INP (Interaction to Next Paint) replaces FID
    onINP((metric) => {
      posthog.capture('web_vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });

    onFCP((metric) => {
      posthog.capture('web_vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });

    onLCP((metric) => {
      posthog.capture('web_vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });

    onTTFB((metric) => {
      posthog.capture('web_vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });
  }, [posthog]);

  return null;
}
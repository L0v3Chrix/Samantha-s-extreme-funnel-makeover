'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackPageView } from '@/lib/analytics';

interface PostHogContextType {
  posthog: any;
}

const PostHogContext = createContext<PostHogContextType | undefined>(undefined);

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog on mount
    const posthog = initPostHog();
    
    // Track initial page view
    if (posthog) {
      trackPageView();
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(`Page: ${pathname}`);
    }
  }, [pathname, searchParams]);

  return (
    <PostHogContext.Provider value={{ posthog: initPostHog() }}>
      {children}
    </PostHogContext.Provider>
  );
}

export const usePostHog = () => {
  const context = useContext(PostHogContext);
  if (context === undefined) {
    throw new Error('usePostHog must be used within a PostHogProvider');
  }
  return context;
};

export default PostHogProvider;
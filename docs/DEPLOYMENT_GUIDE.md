# 🚀 Deployment Guide - Samantha's Extreme Funnel Makeover

## Pre-Launch Checklist

### Environment Setup
- [ ] Environment variables configured in hosting platform
- [ ] PostHog analytics key added and verified
- [ ] SMS phone number validated (+1 617 642-8741)
- [ ] All images optimized and compressed
- [ ] Custom domain configured (if applicable)

### Performance Validation
- [ ] Lighthouse scores 90+ in all categories
- [ ] Core Web Vitals in green zone
- [ ] Page load time <3 seconds
- [ ] Mobile responsiveness tested
- [ ] Interactive tools load smoothly

### Content & Copy Review
- [ ] All section copy reviewed for accuracy
- [ ] SMS messages tested on iOS and Android
- [ ] QR codes generated and verified
- [ ] Email gates functioning properly
- [ ] Countdown timer accuracy confirmed

### Analytics & Tracking
- [ ] PostHog events firing correctly
- [ ] Tool completion rates being tracked
- [ ] SMS CTA clicks being recorded
- [ ] Page view analytics working
- [ ] Error tracking configured

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero-config Next.js deployment
- Automatic performance optimization
- Global CDN
- Preview deployments for testing

**Setup Steps:**
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy from main branch
4. Set up custom domain (optional)

**Environment Variables in Vercel:**
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_POSTHOG_API_KEY=phc_your_production_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NODE_ENV=production
```

### Option 2: Netlify

**Advantages:**
- Built-in form handling
- Branch deploys
- Easy A/B testing setup

**Setup Steps:**
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Configure environment variables
5. Set up redirects in `netlify.toml`

### Option 3: Custom Server/VPS

**For full control over hosting environment**

**Requirements:**
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate

---

## Environment Configuration

### Production Environment Variables

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://samantha-funnel.com
NODE_ENV=production

# Analytics
NEXT_PUBLIC_POSTHOG_API_KEY=phc_your_production_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Performance
NEXT_PUBLIC_VERCEL_URL=your-vercel-app.vercel.app

# Optional: Additional Tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
```

### Development Environment Variables

```bash
# Local Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true

# Analytics (use test keys for development)
NEXT_PUBLIC_POSTHOG_API_KEY=phc_your_development_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## PostHog Analytics Integration

### Setup Instructions

1. **Create PostHog Account** at https://app.posthog.com
2. **Get API Key** from Project Settings
3. **Configure Environment Variables** (see above)
4. **Verify Installation** using PostHog dashboard

### Key Events Being Tracked

**Page Events:**
- `page_view` - Page loads
- `hero_cta_click` - Main CTA interactions
- `sms_button_click` - SMS button taps

**Tool Events:**
- `tool_started` - User begins interactive tool
- `tool_completed` - User finishes tool
- `tool_email_submitted` - Email capture success
- `constellation_score_calculated` - Constellation tool completion
- `roi_calculated` - ROI calculator completion
- `funnel_diagnosis_completed` - Alchemy finder completion

**Conversion Events:**
- `email_captured` - Lead generation
- `sms_intent` - SMS CTA engagement
- `high_engagement` - Multiple tool completions

### Custom Properties Tracked

```javascript
// Tool completion tracking
posthog.capture('tool_completed', {
  tool_name: 'constellation_score',
  score: calculatedScore,
  completion_time: timeSpent,
  email_provided: hasEmail
});

// SMS engagement tracking
posthog.capture('sms_button_click', {
  section: 'hero',
  device_type: isMobile ? 'mobile' : 'desktop',
  has_sms_capability: canSendSMS
});
```

---

## Performance Optimization

### Build Optimization

**Automatic Optimizations:**
- Image optimization with Next.js Image component
- Code splitting by route and component
- CSS and JavaScript minification
- Automatic static optimization

**Manual Optimizations:**
- Lazy loading for interactive tools
- Preloading critical assets
- Font optimization with next/font
- Bundle size analysis

### Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** <2.5s
- **First Input Delay (FID):** <100ms
- **Cumulative Layout Shift (CLS):** <0.1
- **First Contentful Paint (FCP):** <1.8s
- **Time to Interactive (TTI):** <3.5s

### Performance Monitoring

```javascript
// Web Vitals tracking with PostHog
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(({ name, value }) => {
  posthog.capture('web_vital', { metric: name, value });
});

// Similar tracking for other vitals
```

---

## Domain Setup & DNS Configuration

### Custom Domain Setup

**For Vercel:**
1. Add domain in Vercel dashboard
2. Configure DNS records:
   - CNAME: `www` → `cname.vercel-dns.com`
   - A: `@` → `76.76.19.61`

**For Netlify:**
1. Add domain in Netlify dashboard
2. Configure DNS records:
   - CNAME: `www` → `your-site.netlify.app`
   - A: `@` → `104.198.14.52`

### SSL Certificate

- **Automatic:** Both Vercel and Netlify provide automatic SSL
- **Custom:** Upload your own certificate if needed
- **Let's Encrypt:** Free SSL option for custom servers

---

## Testing Procedures

### Pre-Launch Testing

**Device Testing:**
- [ ] iPhone (Safari, Chrome)
- [ ] Android (Chrome, Samsung Internet)
- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Tablet (iPad, Android tablet)

**Functionality Testing:**
- [ ] All SMS buttons open native app with correct message
- [ ] QR code fallback displays on desktop
- [ ] Interactive tools calculate scores correctly
- [ ] Email capture forms validate properly
- [ ] Countdown timer displays accurate time
- [ ] All animations play smoothly
- [ ] Error states display appropriately

**Performance Testing:**
- [ ] PageSpeed Insights scores 90+
- [ ] GTmetrix performance grade A
- [ ] WebPageTest results optimal
- [ ] Mobile performance acceptable

### Production Monitoring

**Analytics Verification:**
- Check PostHog dashboard for event flow
- Verify email capture rate >30%
- Monitor tool completion rates
- Track SMS engagement metrics

**Error Monitoring:**
- Set up error tracking (Sentry recommended)
- Monitor 404 errors
- Check console errors across browsers
- Monitor API failures

---

## Launch Day Checklist

### 2 Hours Before Launch
- [ ] Final content review and typo check
- [ ] Environment variables double-checked
- [ ] DNS propagation verified
- [ ] SSL certificate active
- [ ] Analytics tracking confirmed

### 1 Hour Before Launch
- [ ] Full site walkthrough on multiple devices
- [ ] SMS functionality final test
- [ ] Interactive tools final validation
- [ ] Performance scores final check
- [ ] Team notifications sent

### At Launch
- [ ] Switch DNS to live site
- [ ] Monitor error rates for first 30 minutes
- [ ] Check analytics are firing
- [ ] Verify all CTAs working
- [ ] Test from different geographic locations

### 1 Hour After Launch
- [ ] Performance metrics review
- [ ] Initial traffic and conversion data
- [ ] Error log review
- [ ] User feedback monitoring
- [ ] Social media and marketing team notification

---

## Post-Launch Monitoring

### Daily Checks (First Week)
- Performance metrics in PostHog
- Error rates and console logs
- Conversion rates by traffic source
- Tool completion rates
- SMS engagement metrics

### Weekly Reviews
- Lighthouse performance scores
- Core Web Vitals trends
- User behavior flow analysis
- A/B testing opportunities identification

### Monthly Optimization
- Performance improvements based on data
- Content optimization based on user behavior
- Tool enhancements based on completion rates
- Analytics setup refinements

---

## Troubleshooting

### Common Issues

**SMS Links Not Working:**
- Verify phone number format: +1 (617) 642-8741
- Check iOS vs Android URL schemes
- Test QR code fallback functionality

**Analytics Not Tracking:**
- Verify PostHog API key in environment
- Check browser console for errors
- Confirm events in PostHog dashboard
- Test in incognito mode to verify

**Performance Issues:**
- Run Lighthouse audit for specific problems
- Check image optimization
- Verify code splitting working
- Monitor bundle size increases

**Interactive Tools Errors:**
- Check browser console for JavaScript errors
- Verify form validation logic
- Test email capture functionality
- Confirm score calculation accuracy

### Emergency Procedures

**Site Down:**
1. Check hosting platform status page
2. Verify DNS configuration
3. Check SSL certificate status
4. Monitor error logs
5. Contact hosting support if needed

**Analytics Failure:**
1. Verify API keys in environment
2. Check PostHog service status
3. Test events manually
4. Review recent code changes
5. Implement temporary backup tracking

---

## Success Metrics

### Primary KPIs
- **Conversion Rate:** Target 67%+ overall
- **Tool Completion:** Target 30%+ per tool
- **SMS Engagement:** Track click-through rates
- **Email Capture:** Monitor lead generation
- **Performance:** Maintain 90+ Lighthouse scores

### Secondary Metrics
- Time on page
- Scroll depth
- Device breakdown
- Traffic sources
- Geographic distribution

### Weekly Reporting
Generate weekly reports including:
- Traffic and conversion summary
- Performance metrics trends
- User behavior insights
- Optimization recommendations
- Technical health status

---

## Backup & Recovery

### Regular Backups
- Repository automatically backed up in GitHub
- Environment variables documented in secure location
- Analytics configuration saved
- Domain and DNS settings documented

### Recovery Procedures
1. Repository restoration from GitHub
2. Environment variables restoration
3. DNS reconfiguration if needed
4. SSL certificate restoration
5. Analytics reconnection

---

*This deployment guide ensures a smooth, successful launch of Samantha's Extreme Funnel Makeover with comprehensive monitoring and optimization procedures.*
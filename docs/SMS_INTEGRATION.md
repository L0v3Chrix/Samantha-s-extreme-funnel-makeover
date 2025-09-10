# SMS Integration Guide: Deep Linking & Fallback Strategies

## Overview

The SMS integration is the primary conversion mechanism for Samantha's offer page. Every CTA throughout the page triggers the native SMS app with a pre-filled message to Samantha's phone number: **+1 (617) 642-8741**.

### Design Philosophy
- **Friction-Free:** One tap should open SMS with message ready to send
- **Universal Compatibility:** Work across all devices and browsers
- **Graceful Degradation:** Fallbacks for when deep linking fails
- **Trackable:** Monitor success/failure rates for optimization
- **Professional:** Maintain brand consistency even in technical fallbacks

---

## SMS Deep Link Implementation

### Core Functionality

```typescript
interface SMSConfig {
  phoneNumber: string;
  baseMessage: string;
  customization?: Record<string, string>;
}

interface SMSLinkOptions {
  trackingId?: string;
  source?: string;
  toolResult?: any;
}

function generateSMSLink(config: SMSConfig, options?: SMSLinkOptions): string {
  const { phoneNumber, baseMessage, customization = {} } = config;
  
  // Clean phone number (remove formatting)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Customize message with any provided data
  let message = baseMessage;
  Object.entries(customization).forEach(([key, value]) => {
    message = message.replace(`[${key.toUpperCase()}]`, value);
  });
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Detect platform and return appropriate URL scheme
  return formatSMSURL(cleanPhone, encodedMessage);
}

function formatSMSURL(phoneNumber: string, encodedMessage: string): string {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // iOS detection (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return `sms:${phoneNumber}&body=${encodedMessage}`;
  }
  
  // Android detection
  if (/android/.test(userAgent)) {
    return `sms:${phoneNumber}?body=${encodedMessage}`;
  }
  
  // Windows Phone
  if (/windows phone/.test(userAgent)) {
    return `sms:${phoneNumber}?body=${encodedMessage}`;
  }
  
  // Default format (works for most modern browsers)
  return `sms:${phoneNumber}?body=${encodedMessage}`;
}
```

### Platform-Specific URL Schemes

#### iOS (iPhone, iPad, iPod)
**Format:** `sms:+16176428741&body=MESSAGE`
**Behavior:** Opens Messages app with recipient and message pre-filled
**Fallback:** iOS 14+ supports both `&` and `?` formats

```typescript
// iOS-specific implementation
function iOSSMSLink(phone: string, message: string): string {
  // Use & parameter separator for iOS
  return `sms:${phone}&body=${encodeURIComponent(message)}`;
}
```

#### Android
**Format:** `sms:+16176428741?body=MESSAGE`
**Behavior:** Opens default SMS app with message ready
**Considerations:** Some Android browsers may require user confirmation

```typescript
// Android-specific implementation  
function androidSMSLink(phone: string, message: string): string {
  // Use ? parameter separator for Android
  return `sms:${phone}?body=${encodeURIComponent(message)}`;
}
```

#### Desktop Browsers
**Primary:** Show QR code that opens SMS on mobile device
**Secondary:** Display phone number and message for manual entry
**Tertiary:** Provide alternative contact methods

---

## Message Templates & Customization

### Base Message Template
```
Hey Sam, got your message—can't wait to talk. I'm in!
```

### Tool-Specific Customizations

#### Constellation Score Results
```typescript
const constellationMessages = {
  high: "Hey Sam, my Constellation Score is [SCORE] and I'm ready to amplify what's working!",
  medium: "Hey Sam, my score is [SCORE] and I need help connecting the dots!",
  low: "Hey Sam, I scored [SCORE] and need help building the right foundation!"
};
```

#### ROI Calculator Results
```typescript
const roiMessages = {
  high: "Hey Sam, my ROI calculator shows $[ANNUAL] potential - let's talk!",
  medium: "Hey Sam, I could add $[ANNUAL] annually with your system. I'm interested!",
  low: "Hey Sam, even conservative estimates show $[ANNUAL] upside. Let's discuss!"
};
```

#### Funnel Diagnostic Results
```typescript
const diagnosticMessages = {
  magnet: "Hey Sam, my biggest leak is top-of-funnel. I need a better lead magnet!",
  nurture: "Hey Sam, I'm losing leads in follow-up. Need better nurture sequences!",
  friction: "Hey Sam, people want to book but can't easily. Fix my conversion!",
  bridge: "Hey Sam, there's a gap between my free and paid offer. Help me bridge it!",
  balanced: "Hey Sam, my funnel is solid but I want next-level optimization!"
};
```

### Dynamic Message Generation

```typescript
function generateCustomMessage(
  toolResult: ToolResult, 
  userProfile?: UserProfile
): string {
  const baseTemplate = getMessageTemplate(toolResult.tool, toolResult.tier);
  
  // Replace placeholders with actual data
  let customMessage = baseTemplate
    .replace('[SCORE]', toolResult.score?.toString() || '')
    .replace('[ANNUAL]', formatCurrency(toolResult.annualImpact || 0))
    .replace('[TIER]', toolResult.tier)
    .replace('[NAME]', userProfile?.firstName || '');
  
  // Add context if available
  if (toolResult.urgency === 'high') {
    customMessage += ' This is urgent!';
  }
  
  return customMessage;
}
```

---

## Desktop Fallback System

### QR Code Implementation

When SMS deep linking isn't available (desktop browsers), display a QR code that encodes the SMS URL for scanning with a mobile device.

```typescript
import QRCode from 'qrcode';

interface QRFallbackOptions {
  smsURL: string;
  phoneNumber: string;
  message: string;
  size?: number;
}

async function generateQRFallback(options: QRFallbackOptions): Promise<string> {
  const { smsURL, size = 200 } = options;
  
  try {
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(smsURL, {
      width: size,
      margin: 2,
      color: {
        dark: '#1F2139',  // Night indigo
        light: '#F4E8CE'  // Parchment
      }
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR code generation failed:', error);
    throw error;
  }
}
```

### Fallback UI Component

```tsx
interface SMSFallbackProps {
  phoneNumber: string;
  message: string;
  onClose: () => void;
}

export function SMSFallback({ phoneNumber, message, onClose }: SMSFallbackProps) {
  const [qrCode, setQRCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const smsURL = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    generateQRFallback({ smsURL, phoneNumber, message })
      .then(setQRCode)
      .catch(console.error);
  }, [phoneNumber, message]);
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-parchment p-8 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-night-indigo mb-4">
          Text Samantha
        </h3>
        
        <div className="text-center mb-6">
          <p className="text-deep-wood mb-4">
            Scan this QR code with your phone to send the message:
          </p>
          {qrCode && (
            <img 
              src={qrCode} 
              alt="QR code to text Samantha" 
              className="mx-auto mb-4 rounded-lg shadow-md"
            />
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-deep-wood mb-2">
              Phone Number:
            </label>
            <div className="flex items-center bg-white p-3 rounded border">
              <span className="flex-1 font-mono">{phoneNumber}</span>
              <button
                onClick={() => copyToClipboard(phoneNumber)}
                className="ml-2 px-3 py-1 bg-candle-gold text-night-indigo rounded text-sm hover:bg-ember-orange transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-deep-wood mb-2">
              Message:
            </label>
            <div className="flex items-start bg-white p-3 rounded border">
              <span className="flex-1">{message}</span>
              <button
                onClick={() => copyToClipboard(message)}
                className="ml-2 px-3 py-1 bg-candle-gold text-night-indigo rounded text-sm hover:bg-ember-orange transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-deep-wood hover:text-night-indigo transition-colors"
          >
            Close
          </button>
          <div className="text-sm text-deep-wood">
            Or call: <a href={`tel:${phoneNumber}`} className="text-candle-gold hover:underline">{phoneNumber}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## CTA Button Implementation

### Primary CTA Component

```tsx
interface SMSCTAProps {
  message?: string;
  customization?: Record<string, string>;
  variant?: 'primary' | 'secondary' | 'tool-result';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackingData?: Record<string, any>;
}

export function SMSCTA({
  message = "Hey Sam, got your message—can't wait to talk. I'm in!",
  customization = {},
  variant = 'primary',
  size = 'md',
  className = '',
  trackingData = {}
}: SMSCTAProps) {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const phoneNumber = '+16176428741';
  
  const handleSMSClick = async () => {
    setIsLoading(true);
    
    // Track the CTA click
    trackEvent('sms_cta_clicked', {
      variant,
      message_type: customization.type || 'generic',
      device_type: isMobileDevice() ? 'mobile' : 'desktop',
      ...trackingData
    });
    
    // Generate customized message
    const finalMessage = generateCustomMessage(message, customization);
    
    // Check if mobile device
    if (isMobileDevice()) {
      try {
        // Generate SMS URL
        const smsURL = generateSMSLink({
          phoneNumber,
          baseMessage: finalMessage
        });
        
        // Open SMS app
        window.location.href = smsURL;
        
        // Track successful SMS launch
        trackEvent('sms_launched_successfully', {
          method: 'deep_link',
          ...trackingData
        });
        
      } catch (error) {
        console.error('SMS deep link failed:', error);
        setShowFallback(true);
        
        trackEvent('sms_launch_failed', {
          error: error.message,
          fallback_shown: true,
          ...trackingData
        });
      }
    } else {
      // Show desktop fallback
      setShowFallback(true);
      trackEvent('sms_desktop_fallback_shown', trackingData);
    }
    
    setIsLoading(false);
  };
  
  return (
    <>
      <button
        onClick={handleSMSClick}
        disabled={isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 relative overflow-hidden',
          
          // Size variants
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          
          // Style variants
          {
            'bg-gradient-to-r from-candle-gold to-ember-orange text-night-indigo hover:shadow-lg hover:-translate-y-0.5 shadow-md': variant === 'primary',
            'border-2 border-candle-gold text-candle-gold hover:bg-candle-gold hover:text-night-indigo': variant === 'secondary',
            'bg-gradient-to-br from-candle-gold via-ember-orange to-arcane-violet text-white shadow-xl hover:shadow-2xl hover:scale-105': variant === 'tool-result'
          },
          
          // Loading state
          {
            'opacity-75 cursor-not-allowed': isLoading
          },
          
          className
        )}
      >
        {/* Animated background for primary variant */}
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-ember-orange to-candle-gold opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
        
        {/* Button content */}
        <div className="relative flex items-center space-x-2">
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              <span>Opening SMS...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              <span>Text Samantha</span>
            </>
          )}
        </div>
        
        {/* Glow effect for tool-result variant */}
        {variant === 'tool-result' && (
          <div className="absolute inset-0 rounded-lg bg-candle-gold opacity-20 animate-pulse" />
        )}
      </button>
      
      {/* Desktop fallback modal */}
      {showFallback && (
        <SMSFallback
          phoneNumber={phoneNumber}
          message={generateCustomMessage(message, customization)}
          onClose={() => setShowFallback(false)}
        />
      )}
    </>
  );
}
```

### Device Detection Utilities

```typescript
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function getBrowserInfo(): { name: string; version: string; platform: string } {
  const ua = navigator.userAgent.toLowerCase();
  
  let browser = 'unknown';
  if (ua.includes('chrome')) browser = 'chrome';
  else if (ua.includes('firefox')) browser = 'firefox';
  else if (ua.includes('safari')) browser = 'safari';
  else if (ua.includes('edge')) browser = 'edge';
  
  let platform = 'unknown';
  if (ua.includes('iphone')) platform = 'ios';
  else if (ua.includes('android')) platform = 'android';
  else if (ua.includes('windows')) platform = 'windows';
  else if (ua.includes('mac')) platform = 'macos';
  
  return {
    name: browser,
    version: 'unknown', // Could parse version if needed
    platform
  };
}
```

---

## Analytics & Tracking

### SMS Event Tracking

```typescript
interface SMSAnalyticsEvent {
  event_name: 'sms_cta_clicked' | 'sms_launched_successfully' | 'sms_launch_failed' | 'sms_desktop_fallback_shown';
  properties: {
    phone_number: string;
    message_type: string;
    source_section: string;
    device_type: 'mobile' | 'desktop';
    browser_info: BrowserInfo;
    timestamp: string;
    user_agent: string;
    tool_result?: any;
    custom_data?: Record<string, any>;
  };
}

function trackSMSEvent(eventName: string, properties: Record<string, any>) {
  // PostHog tracking
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, {
      ...properties,
      phone_number: '+16176428741', // Always the same for this project
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      referrer: document.referrer || 'direct'
    });
  }
  
  // Additional analytics (Google Analytics, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'SMS_CTA',
      event_label: properties.source_section,
      custom_map: properties
    });
  }
}
```

### Success Rate Monitoring

```typescript
interface SMSMetrics {
  total_clicks: number;
  successful_launches: number;
  failed_launches: number;
  desktop_fallbacks: number;
  mobile_success_rate: number;
  most_common_failure_reason: string;
}

function calculateSMSMetrics(events: SMSAnalyticsEvent[]): SMSMetrics {
  const clicks = events.filter(e => e.event_name === 'sms_cta_clicked');
  const successes = events.filter(e => e.event_name === 'sms_launched_successfully');
  const failures = events.filter(e => e.event_name === 'sms_launch_failed');
  const fallbacks = events.filter(e => e.event_name === 'sms_desktop_fallback_shown');
  
  const mobileClicks = clicks.filter(e => e.properties.device_type === 'mobile');
  const mobileSuccesses = successes.filter(e => e.properties.device_type === 'mobile');
  
  return {
    total_clicks: clicks.length,
    successful_launches: successes.length,
    failed_launches: failures.length,
    desktop_fallbacks: fallbacks.length,
    mobile_success_rate: mobileClicks.length > 0 ? (mobileSuccesses.length / mobileClicks.length) * 100 : 0,
    most_common_failure_reason: 'unknown' // Would need to analyze failure events
  };
}
```

---

## Testing Strategy

### Manual Testing Checklist

#### Mobile Devices
- [ ] **iPhone (iOS 14+)**
  - [ ] Safari: SMS app opens with message
  - [ ] Chrome: Fallback or native SMS
  - [ ] Firefox: Fallback behavior
  - [ ] Test with/without SMS app installed

- [ ] **Android (API 28+)**
  - [ ] Chrome: Default SMS app opens
  - [ ] Samsung Internet: SMS functionality
  - [ ] Firefox: Fallback handling
  - [ ] Test multiple SMS apps installed

- [ ] **iPad/Android Tablets**
  - [ ] Verify SMS capability
  - [ ] Fallback for WiFi-only devices
  - [ ] QR code display and scanning

#### Desktop Browsers
- [ ] **Chrome/Firefox/Safari/Edge**
  - [ ] QR code generation and display
  - [ ] Copy-to-clipboard functionality
  - [ ] Alternative contact methods shown
  - [ ] Modal close behavior

### Automated Testing

```typescript
// Jest tests for SMS URL generation
describe('SMS URL Generation', () => {
  it('generates correct iOS URL format', () => {
    // Mock iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true
    });
    
    const url = generateSMSLink({
      phoneNumber: '+16176428741',
      baseMessage: 'Test message'
    });
    
    expect(url).toBe('sms:16176428741&body=Test%20message');
  });
  
  it('generates correct Android URL format', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 10)',
      configurable: true
    });
    
    const url = generateSMSLink({
      phoneNumber: '+16176428741',
      baseMessage: 'Test message'
    });
    
    expect(url).toBe('sms:16176428741?body=Test%20message');
  });
  
  it('handles message customization correctly', () => {
    const url = generateSMSLink({
      phoneNumber: '+16176428741',
      baseMessage: 'My score is [SCORE]',
      customization: { SCORE: '85' }
    });
    
    expect(url).toContain('My%20score%20is%2085');
  });
});
```

### Performance Testing

```typescript
// Performance benchmarks
describe('SMS Integration Performance', () => {
  it('generates SMS URLs quickly', async () => {
    const start = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      generateSMSLink({
        phoneNumber: '+16176428741',
        baseMessage: 'Performance test message'
      });
    }
    
    const end = performance.now();
    const avgTime = (end - start) / 1000;
    
    expect(avgTime).toBeLessThan(1); // Less than 1ms average
  });
  
  it('generates QR codes efficiently', async () => {
    const start = performance.now();
    
    await generateQRFallback({
      smsURL: 'sms:16176428741?body=Test',
      phoneNumber: '+16176428741',
      message: 'Test'
    });
    
    const end = performance.now();
    
    expect(end - start).toBeLessThan(100); // Less than 100ms
  });
});
```

---

## Troubleshooting & Common Issues

### Common Problems & Solutions

#### 1. SMS Deep Link Not Working
**Symptoms:** Button click doesn't open SMS app
**Causes:**
- Incorrect URL format for platform
- Message encoding issues
- No SMS app installed
- Browser security restrictions

**Solutions:**
- Verify user agent detection
- Test URL encoding
- Implement fallback UI
- Add error handling

#### 2. QR Code Not Generating
**Symptoms:** Blank or broken QR code display
**Causes:**
- QR library not loaded
- SMS URL too long
- Canvas/image rendering issues

**Solutions:**
- Check library dependencies
- Simplify message content
- Add error boundaries

#### 3. Desktop Fallback Not Showing
**Symptoms:** No fallback UI on desktop
**Causes:**
- Device detection false positive
- Modal rendering issues
- CSS/styling conflicts

**Solutions:**
- Improve device detection logic
- Test modal z-index and positioning
- Verify CSS framework conflicts

### Debug Utilities

```typescript
function debugSMSIntegration() {
  const info = {
    userAgent: navigator.userAgent,
    deviceType: isMobileDevice() ? 'mobile' : 'desktop',
    browserInfo: getBrowserInfo(),
    supportsSMS: 'unknown', // Would need to test
    testURL: generateSMSLink({
      phoneNumber: '+16176428741',
      baseMessage: 'Debug test message'
    })
  };
  
  console.table(info);
  
  // Test SMS URL
  console.log('Testing SMS URL:', info.testURL);
  
  return info;
}

// Usage in development
if (process.env.NODE_ENV === 'development') {
  window.debugSMS = debugSMSIntegration;
}
```

This comprehensive SMS integration guide ensures reliable, cross-platform functionality while maintaining excellent user experience and detailed analytics tracking.
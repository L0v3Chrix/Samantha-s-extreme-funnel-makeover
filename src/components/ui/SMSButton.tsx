'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn, generateSMSLink, isMobileDevice } from '@/lib/utils';
import Button from './Button';
import Modal, { ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './Modal';

interface SMSButtonProps {
  message?: string;
  phoneNumber?: string;
  variant?: 'primary' | 'secondary' | 'sms';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  customization?: Record<string, string>;
  trackingData?: Record<string, any>;
  children?: React.ReactNode;
}

export function SMSButton({
  message = "Hey Sam, got your message—can't wait to talk. I'm in!",
  phoneNumber = '+16176428741',
  variant = 'sms',
  size = 'lg',
  className,
  customization = {},
  trackingData = {},
  children,
}: SMSButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const generateCustomMessage = (baseMessage: string, custom: Record<string, string>): string => {
    let finalMessage = baseMessage;
    Object.entries(custom).forEach(([key, value]) => {
      finalMessage = finalMessage.replace(`[${key.toUpperCase()}]`, value.toString());
    });
    return finalMessage;
  };

  const handleSMSClick = async () => {
    setIsLoading(true);

    try {
      // Track the CTA click (placeholder for analytics)
      console.log('SMS CTA clicked', {
        variant,
        device_type: isMobileDevice() ? 'mobile' : 'desktop',
        ...trackingData
      });

      const finalMessage = generateCustomMessage(message, customization);

      if (isMobileDevice()) {
        const smsURL = generateSMSLink(phoneNumber, finalMessage);
        window.location.href = smsURL;

        console.log('SMS launched successfully', {
          method: 'deep_link',
          ...trackingData
        });
      } else {
        // For desktop, show fallback (would implement QR code modal here)
        setShowFallback(true);
        console.log('SMS desktop fallback shown', trackingData);
      }
    } catch (error) {
      console.error('SMS launch failed:', error);
      setShowFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleSMSClick}
        loading={isLoading}
        className={cn('group', className)}
      >
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 group-hover:animate-bounce-gentle" />
          <span>{children || 'Text Samantha'}</span>
        </div>
      </Button>

      {/* Desktop fallback modal */}
      <Modal 
        isOpen={showFallback} 
        onClose={() => setShowFallback(false)}
        title="Text Samantha"
        size="md"
      >
        <ModalHeader>
          <ModalDescription>
            Copy this information to text Samantha directly, or scan the QR code below with your phone.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-deep-wood font-medium mb-2">Phone Number:</p>
            <div className="bg-candle-gold/10 p-3 rounded-lg border border-candle-gold/30">
              <p className="text-candle-gold font-mono text-lg font-semibold">
                {phoneNumber}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-deep-wood font-medium mb-2">Message:</p>
            <div className="bg-parchment/50 p-3 rounded-lg border border-candle-gold/20">
              <p className="text-deep-wood leading-relaxed">
                {generateCustomMessage(message, customization)}
              </p>
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button 
            variant="secondary" 
            onClick={() => setShowFallback(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default SMSButton;
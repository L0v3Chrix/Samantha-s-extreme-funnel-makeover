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
        // Brand color palette - Magical Scholarly Theme
        'night-indigo': {
          DEFAULT: '#1F2139',
          50: '#E8E9ED',
          100: '#D1D3DB',
          200: '#A3A7B7',
          300: '#757B93',
          400: '#474F6F',
          500: '#1F2139',
          600: '#191A2D',
          700: '#131422',
          800: '#0D0D16',
          900: '#07070B',
        },
        'candle-gold': {
          DEFAULT: '#F6C66D',
          50: '#FEFCF7',
          100: '#FEF8EF',
          200: '#FCF0D7',
          300: '#FAE7BF',
          400: '#F8DEA7',
          500: '#F6C66D',
          600: '#F4B235',
          700: '#F29E0A',
          800: '#C07D08',
          900: '#8E5B06',
        },
        'ember-orange': {
          DEFAULT: '#E8963A',
          50: '#FBF4ED',
          100: '#F7E8DB',
          200: '#F0D2B7',
          300: '#E8BB93',
          400: '#E0A56F',
          500: '#E8963A',
          600: '#E07E0F',
          700: '#AD5F0B',
          800: '#7A4008',
          900: '#472005',
        },
        'parchment': {
          DEFAULT: '#F4E8CE',
          50: '#FEFDFB',
          100: '#FCF9F1',
          200: '#F8F1E3',
          300: '#F4E8CE',
          400: '#F0E0BA',
          500: '#ECD7A5',
          600: '#E8CE91',
          700: '#E4C67C',
          800: '#E0BD68',
          900: '#DCB453',
        },
        'deep-wood': {
          DEFAULT: '#5A3B2E',
          50: '#EBE4E1',
          100: '#D7C9C3',
          200: '#AF9387',
          300: '#875D4B',
          400: '#5F4C3F',
          500: '#5A3B2E',
          600: '#482F25',
          700: '#36231B',
          800: '#241712',
          900: '#120B09',
        },
        'arcane-violet': {
          DEFAULT: '#6D4A7F',
          50: '#F0EDEF',
          100: '#E1DBDF',
          200: '#C3B7BF',
          300: '#A5939F',
          400: '#876F7F',
          500: '#6D4A7F',
          600: '#573B66',
          700: '#412C4D',
          800: '#2B1D33',
          900: '#150E1A',
        },
        'crystal-teal': {
          DEFAULT: '#2FA7A3',
          50: '#E7F6F6',
          100: '#CFEDED',
          200: '#9FDBDB',
          300: '#6FC9C9',
          400: '#3FB7B7',
          500: '#2FA7A3',
          600: '#258682',
          700: '#1B6562',
          800: '#114341',
          900: '#082221',
        },
        // Legacy colors for compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'heading': ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'ui': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        // Additional spacing for design system
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        // Custom animations for magical theme
        'constellation-twinkle': 'constellation-twinkle 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-breathe': 'scale-breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        'constellation-twinkle': {
          '0%': { 
            opacity: '0.3', 
            transform: 'scale(0.8)',
            filter: 'brightness(0.8)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1.2)',
            filter: 'brightness(1.2)'
          },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(246, 198, 109, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(246, 198, 109, 0.6), 0 0 60px rgba(246, 198, 109, 0.4)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'slide-in-left': {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'slide-in-right': {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'bounce-gentle': {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-5px)' 
          },
        },
      },
      boxShadow: {
        // Custom shadows for magical effects
        'glow': '0 0 20px rgba(246, 198, 109, 0.3)',
        'glow-lg': '0 0 40px rgba(246, 198, 109, 0.4)',
        'glow-xl': '0 0 60px rgba(246, 198, 109, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(246, 198, 109, 0.2)',
        'magical': '0 4px 15px rgba(31, 33, 57, 0.1), 0 0 30px rgba(246, 198, 109, 0.2)',
        'constellation': '0 0 30px rgba(109, 74, 127, 0.3), 0 4px 15px rgba(31, 33, 57, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-magical': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-constellation': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
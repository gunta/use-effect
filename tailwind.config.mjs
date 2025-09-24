/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0EA5E9',
        'warning-red': '#EF4444',
      },
      animation: {
        'glitch': 'glitch 2s ease-in-out infinite',
        'glitch-2': 'glitch-2 3s ease-in-out infinite',
        'typing': 'typing 2s steps(20) infinite',
        'blink': 'blink 1s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'counter': 'counter 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0)',
            textShadow: '2px 2px 0 #ef4444, -2px -2px 0 #0ea5e9'
          },
          '20%': { 
            transform: 'translate(-2px, 2px)',
            textShadow: '2px 2px 0 #0ea5e9, -2px -2px 0 #ef4444'
          },
          '40%': { 
            transform: 'translate(-2px, -2px)',
            textShadow: '-2px 2px 0 #ef4444, 2px -2px 0 #0ea5e9'
          },
          '60%': { 
            transform: 'translate(2px, 2px)',
            textShadow: '2px -2px 0 #0ea5e9, -2px 2px 0 #ef4444'
          },
          '80%': { 
            transform: 'translate(2px, -2px)',
            textShadow: '-2px -2px 0 #ef4444, 2px 2px 0 #0ea5e9'
          },
        },
        'glitch-2': {
          '0%, 100%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
          '25%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          },
          '50%': { 
            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          },
          '75%': { 
            clipPath: 'polygon(0 30%, 100% 30%, 100% 70%, 0 70%)',
          },
        },
        typing: {
          '0%, 100%': { width: '0' },
          '50%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        counter: {
          '0%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        'bold': ['Arial Black', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

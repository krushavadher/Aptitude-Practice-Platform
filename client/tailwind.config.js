/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          DEFAULT: 'var(--glass-bg)',
          strong: 'var(--glass-bg-strong)',
          border: 'var(--glass-border)',
          edge: 'var(--glass-edge)'
        },
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        success: {
          DEFAULT: 'var(--success)',
          text: 'var(--success-text)'
        },
        error: {
          DEFAULT: 'var(--error)',
          text: 'var(--error-text)'
        },
        warning: {
          DEFAULT: 'var(--warning)',
          text: 'var(--warning-text)'
        },
      },
      backdropBlur: {
        glass: 'var(--glass-blur)'
      },
    },
  },
  plugins: [],
}

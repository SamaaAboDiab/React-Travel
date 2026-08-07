/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // كحلي أساسي (مأخوذ من هوية المشروع الأصلي: --primary #1a3c6e)
        primary: {
          50: '#eef3fa',
          100: '#d6e2f2',
          200: '#adc5e5',
          300: '#7fa3d6',
          400: '#4a90d9', // --secondary الأصلي
          500: '#2a5298', // --primary-light
          600: '#1a3c6e', // --primary
          700: '#15335c',
          800: '#0f2647', // --primary-dark
          900: '#0a1a32',
          950: '#060f1d',
        },
        // ذهبي مميز (مأخوذ من --accent)
        gold: {
          50: '#fdf9ec',
          100: '#faf0c9',
          200: '#f5d742', // --accent-light
          300: '#eecb3a',
          400: '#e8b931', // --accent
          500: '#cfa021',
          600: '#a87e19',
          700: '#7d5d14',
        },
        night: {
          50: '#f5f7fa',
          100: '#e9edf3',
          200: '#c9d2e0',
          300: '#a3afc4',
          400: '#64748b', // --text-light (darkened from #6b7a8d for WCAG AA contrast)
          500: '#3d4a5c', // --text-medium
          600: '#2c3646',
          700: '#1a2332', // --text-dark
          800: '#141b26',
          900: '#0a0e15',
        },
      },
      fontFamily: {
        display: ['"Cairo"', 'sans-serif'],
        body: ['"Tajawal"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)',
        'gold-gradient': 'linear-gradient(135deg, #e8b931, #f5d742)',
      },
      boxShadow: {
        soft: '0 8px 35px -8px rgba(26,60,110,0.18)',
        card: '0 4px 20px rgba(26,60,110,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

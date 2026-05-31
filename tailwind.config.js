/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // SCP Foundation-inspired dark palette
        'scp-bg': '#0a0a0a',
        'scp-panel': '#141414',
        'scp-panel-2': '#1c1c1c',
        'scp-border': '#2a2a2a',
        'scp-text': '#e6e6e6',
        'scp-muted': '#8a8a8a',
        'scp-red': '#8b0000',
        'scp-red-bright': '#c00000',
        'scp-amber': '#d4a017',
        // Object class colors
        'class-safe': '#3a8a3a',
        'class-euclid': '#d4a017',
        'class-keter': '#c0392b',
        'class-thaumiel': '#7e57c2',
        'class-neutralized': '#6b6b6b',
        'class-apollyon': '#000000',
      },
      fontFamily: {
        // Use system mono first for that classified-file feel
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        redact: 'inset 0 -2px 0 0 rgba(192, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}

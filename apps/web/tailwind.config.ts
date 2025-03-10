import { Config } from 'tailwindcss';
import baseConfig from '@packages/ui/tailwind.config';

const config: Config = {
  presets: [baseConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'border-gray': 'hsl(var(--gray-border))',
      },
    },
  },
};

export default config;
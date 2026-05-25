// Next.js (with --turbo) cannot use createGlobPatternsForDependencies from
// @nx/next/tailwind, so we add the libs/ui content paths manually.
// https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('../../libs/ui/tailwind.config.js')],
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../libs/ui/src/**/*.{ts,tsx,js,jsx,html}',
    '!../../libs/ui/src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

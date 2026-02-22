'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */
const {addIconSelectors} = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  plugins: [
    require('tailwindcss-logical'),
    require('./src/@core/tailwind/plugin'),
    addIconSelectors({
      prefixes: ['fluent', 'mdi'],
    }),
  ],
  theme: {
    extend: {},
  },
};

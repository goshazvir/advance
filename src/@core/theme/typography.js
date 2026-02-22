const typography = fontFamily => ({
  fontFamily:
    typeof fontFamily === 'undefined' || fontFamily === ''
      ? [
          'Inter',
          'sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(',')
      : fontFamily,
  fontSize: 13.125,
  h1: {
    fontSize: '1.375rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '127.273%',
    leadingTrim: 'both',
    textEdge: 'cap',
    fontVariantNumeric: 'lining-nums tabular-nums',
  },
  h2: {
    fontSize: '1.0625rem',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '164.706%',
    leadingTrim: 'both',
    textEdge: 'cap',
    fontVariantNumeric: 'lining-nums tabular-nums',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.58334,
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5556,
  },
  h6: {
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: 1.46667,
  },
  subtitle1: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1rem',
    letterSpacing: '0.015rem',
  },
  subtitle2: {
    fontSize: '0.8125rem',
    fontWeight: 400,
    lineHeight: 1.53846154,
  },
  body1: {
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '142.857%',
    letterSpacing: '0.00875rem',
  },
  body2: {
    fontSize: '0.8125rem',
    lineHeight: 1.53846154,
  },
  button: {
    fontSize: '0.9375rem',
    lineHeight: 1.46667,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.6875rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '145.455%',
    letterSpacing: '0.0275rem',
  },
  overline: {
    fontSize: '0.75rem',
    lineHeight: 1.16667,
    letterSpacing: '0.8px',
  },
});

export default typography;

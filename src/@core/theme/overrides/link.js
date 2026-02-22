// link.js

// Config Imports

const link = {
  MuiLink: {
    // 1. default props
    defaultProps: {
      // For example, disable ripple-like effects if you have them or set underline behavior
      // underline: 'hover' or 'none'
      underline: 'hover',
    },

    // 2. style overrides
    styleOverrides: {
      // The `root` key is the base styling for all <Link> components
      root: ({theme, ownerState}) => {
        return {
          cursor: 'pointer',

          // Example: replicate a "rounded" look if you want
          borderRadius: '4px',

          // You can incorporate your CSS variables or direct theme palette references
          textDecorationColor: 'var(--mui-palette-primary-main)',

          // If you want different spacing for "small" or "large" or any other prop,
          // you can do conditional logic here. E.g.:
          ...(ownerState.size === 'small' && {
            fontSize: theme.typography.body2.fontSize,
            padding: theme.spacing(0.5, 1),
          }),
          ...(ownerState.size === 'large' && {
            fontSize: theme.typography.body1.fontSize,
            padding: theme.spacing(1, 1.5),
          }),

          // Example of a global hover/focus style:
          '&:hover, &.Mui-focusVisible': {
            textDecoration: 'underline',
          },
        };
      },
    },

    // 3. Variants (similar to your button variants)
    variants: [
      {
        // e.g. if you want special styling when Link color="primary"
        props: {color: 'primary'},
        style: {
          color: 'var(--mui-palette-primary-main)',

          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              // You could change color, background, or text-decoration
              color: 'var(--mui-palette-primary-dark)',
              textDecoration: 'underline',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        // color="secondary"
        props: {color: 'secondary'},
        style: {
          color: 'var(--mui-palette-secondary-main)',

          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: 'var(--mui-palette-secondary-dark)',
              textDecoration: 'underline',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        // color="error"
        props: {color: 'error'},
        style: {
          color: 'var(--mui-palette-error-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: 'var(--mui-palette-error-dark)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        // color="warning"
        props: {color: 'warning'},
        style: {
          color: 'var(--mui-palette-warning-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: 'var(--mui-palette-warning-dark)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        // color="info"
        props: {color: 'info'},
        style: {
          color: 'var(--mui-palette-info-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: 'var(--mui-palette-info-dark)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        // color="success"
        props: {color: 'success'},
        style: {
          color: 'var(--mui-palette-success-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: 'var(--mui-palette-success-dark)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-main)',
          },
        },
      },
    ],
  },
};

export default link;

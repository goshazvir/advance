'use client';

// Third-party Imports
import classnames from 'classnames';
// React Imports
import React, {forwardRef} from 'react';

import {css} from '@emotion/react';
// Component Imports
import {RouterLink} from '../RouterLink';
// Util Imports
import {menuClasses} from '../../utils/menuClasses';

export const menuButtonStyles = props => {
  const {level, disabled, children, isCollapsed, isPopoutWhenCollapsed} = props;

  return css({
    display: 'flex',
    alignItems: 'center',
    minBlockSize: '30px',
    textDecoration: 'none',
    color: 'inherit',
    boxSizing: 'border-box',
    cursor: 'pointer',
    paddingInlineEnd: '0.5rem',
    paddingInlineStart: `${
      level === 0
        ? 8
        : (isPopoutWhenCollapsed && isCollapsed ? level : level + 1) * 8
    }px`,
    '&:hover, &[aria-expanded="true"]': {
      backgroundColor: '#f3f3f3',
    },
    '&:focus-visible': {
      outline: 'none',
      backgroundColor: '#f3f3f3',
    },
    ...(disabled && {
      pointerEvents: 'none',
      cursor: 'default',
      color: '#adadad',
    }),
    [`&.${menuClasses.active}`]: {
      ...(!children && {color: 'white'}),
      backgroundColor: children ? '#f3f3f3' : '#765feb',
    },
  });
};

const MenuButton = (
  {className, component: Component, children, href, to, ...rest},
  ref,
) => {
  if (Component) {
    if (typeof Component === 'string') {
      return (
        <Component
          className={classnames(className)}
          href={href}
          to={to}
          {...rest}
          ref={ref}
        >
          {children}
        </Component>
      );
    } else {
      return (
        <Component
          className={classnames(className)}
          href={href}
          to={to}
          {...rest}
          ref={ref}
        >
          {children}
        </Component>
      );
    }
  } else {
    if (href) {
      return (
        <RouterLink ref={ref} className={className} href={href} {...rest}>
          {children}
        </RouterLink>
      );
    } else {
      return (
        <a ref={ref} className={className} {...rest}>
          {children}
        </a>
      );
    }
  }
};

// Export the component with forwarded ref
export default forwardRef(MenuButton);

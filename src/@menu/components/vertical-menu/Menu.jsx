'use client';

// Style Imports
import styles from '../../styles/styles.module.css';

// Third-party Imports
import classnames from 'classnames';
// React Imports
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {Stack} from '@mui/material';
// Next Imports
import {FloatingTree} from '@floating-ui/react';
// Util Imports
import {menuClasses} from '../../utils/menuClasses';
// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav';
// Default Config Imports
import {verticalSubMenuToggleDuration} from '../../defaultConfigs';
// Styled Component Imports
import StyledVerticalMenu from '../../styles/vertical/StyledVerticalMenu';

export const VerticalMenuContext = createContext({});

export const VERTICAL_MENU_WIDTH = 240;

const Menu = (props, ref) => {
  // Props
  const {
    children,
    className,
    rootStyles,
    menuItemStyles,
    renderExpandIcon,
    renderExpandedMenuItemIcon,
    menuSectionStyles,
    browserScroll = false,
    triggerPopout = 'hover',
    popoutWhenCollapsed = false,
    subMenuOpenBehavior = 'accordion', // accordion, collapse
    transitionDuration = verticalSubMenuToggleDuration,
    collapsedMenuSectionLabel = '-',
    popoutMenuOffset = {mainAxis: 0},
    textTruncate = true,
    menuItemSpacing = 0,
    ...rest
  } = props;

  // States
  const [openSubmenu, setOpenSubmenu] = useState([]);

  // Refs
  const openSubmenusRef = useRef([]);

  // Hooks
  const {updateVerticalNavState} = useVerticalNav();

  const toggleOpenSubmenu = useCallback(
    (...submenus) => {
      if (!submenus.length) return;
      const openSubmenuCopy = [...openSubmenu];

      submenus.forEach(({level, label, active = false, id}) => {
        const submenuIndex = openSubmenuCopy.findIndex(
          submenu => submenu.id === id,
        );
        const submenuExists = submenuIndex >= 0;
        const isAccordion = subMenuOpenBehavior === 'accordion';
        const inactiveSubmenuIndex = openSubmenuCopy.findIndex(
          submenu => !submenu.active && submenu.level === 0,
        );

        // Delete submenu if it exists
        if (submenuExists) {
          openSubmenuCopy.splice(submenuIndex, 1);
        }

        if (isAccordion) {
          // Add submenu if it doesn't exist
          if (!submenuExists) {
            if (inactiveSubmenuIndex >= 0 && !active && level === 0) {
              openSubmenuCopy.splice(inactiveSubmenuIndex, 1, {
                level,
                label,
                active,
                id,
              });
            } else {
              openSubmenuCopy.push({level, label, active, id});
            }
          }
        } else {
          // Add submenu if it doesn't exist
          if (!submenuExists) {
            openSubmenuCopy.push({level, label, active, id});
          }
        }
      });
      setOpenSubmenu(openSubmenuCopy);
    },
    [openSubmenu, subMenuOpenBehavior],
  );

  // UseEffect, update verticalNav state to set initial values and update values on change
  useEffect(() => {
    updateVerticalNavState({
      isPopoutWhenCollapsed: popoutWhenCollapsed,
    });
  }, [popoutWhenCollapsed, updateVerticalNavState]);

  const providerValue = useMemo(
    () => ({
      browserScroll,
      triggerPopout,
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      collapsedMenuSectionLabel,
      popoutMenuOffset,
      textTruncate,
    }),
    [
      browserScroll,
      triggerPopout,
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      collapsedMenuSectionLabel,
      popoutMenuOffset,
      textTruncate,
    ],
  );

  return (
    <VerticalMenuContext.Provider value={providerValue}>
      <FloatingTree>
        <StyledVerticalMenu
          ref={ref}
          className={classnames(menuClasses.root, className)}
          rootStyles={rootStyles}
          {...rest}
        >
          <ul className={`${styles.ul}`} style={{width: '100%'}}>
            <Stack width={'100%'} gap={menuItemSpacing}>
              {children}
            </Stack>
          </ul>
        </StyledVerticalMenu>
      </FloatingTree>
    </VerticalMenuContext.Provider>
  );
};

export default forwardRef(Menu);

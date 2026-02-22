'use client';

// Third-party Imports
import classnames from 'classnames';
// React Imports
import {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
// Next Imports
import {usePathname} from 'next/navigation';
import Collapse from '@mui/material/Collapse';
// Component Imports
// Icon Imports
import ChevronRight from '../../svg/ChevronRight';
// Util Imports
import {menuClasses} from '../../utils/menuClasses';
// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav';
import MenuButton, {menuButtonStyles} from './MenuButton';
import useVerticalMenu from '../../hooks/useVerticalMenu';
// Styled Component Imports
import StyledMenuLabel from '../../styles/StyledMenuLabel';
import StyledMenuPrefix from '../../styles/StyledMenuPrefix';
import StyledMenuSuffix from '../../styles/StyledMenuSuffix';
import {confirmUrlInChildren, renderMenuIcon} from '../../utils/menuUtils';
import StyledVerticalNavExpandIcon, {
  StyledVerticalNavExpandIconWrapper,
} from '../../styles/vertical/StyledVerticalNavExpandIcon';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  hide,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingTree,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

const StyledSubMenu = styled.li`
  position: relative;
  inline-size: 100%;
  margin-block-start: 4px;

  &.${menuClasses.open} > .${menuClasses.button} {
    background-color: #f3f3f3;
  }

  ${({menuItemStyles}) => menuItemStyles};
  ${({rootStyles}) => rootStyles};

  > .${menuClasses.button} {
    ${({
      level,
      disabled,
      active,
      children,
      isCollapsed,
      isPopoutWhenCollapsed,
    }) =>
      menuButtonStyles({
        level,
        active,
        disabled,
        children,
        isCollapsed,
        isPopoutWhenCollapsed,
      })};
    ${({buttonStyles}) => buttonStyles};
  }
`;

const StyledSubMenuContent = styled.ul`
  list-style: none;
  padding-left: ${props => props.level * 16}px;
  margin: 0;
  ${({rootStyles}) => rootStyles};
`;

const SubMenu = (props, ref) => {
  // Props
  const {
    children,
    className,
    label,
    icon,
    title,
    prefix,
    suffix,
    defaultOpen,
    level = 0,
    disabled = false,
    rootStyles,
    component,
    href,
    onOpenChange,
    onClick,
    onKeyUp,
    persistent = false,
    removeToggle,
    ...rest
  } = props;

  // States
  const [active, setActive] = useState(false);

  // Refs
  const wasPathRelevantRef = useRef(false);
  const isInitialMount = useRef(true);

  // Hooks
  const id = useId();
  const pathname = usePathname();
  const {isCollapsed, isPopoutWhenCollapsed, isHovered, isBreakpointReached} =
    useVerticalNav();
  const tree = useFloatingTree();
  const {
    triggerPopout,
    renderExpandIcon,
    renderExpandedMenuItemIcon,
    menuItemStyles,
    openSubmenu,
    toggleOpenSubmenu,
    transitionDuration,
    openSubmenusRef,
    popoutMenuOffset,
    textTruncate,
  } = useVerticalMenu();

  // Vars
  // Filter out falsy values from children
  const childNodes = Children.toArray(children).filter(Boolean);

  const isPathRelevant = () => {
    if (persistent) {
      if (href && pathname?.startsWith(href)) {
        return true;
      }

      let relevant = false;
      Children.forEach(children, child => {
        if (
          child &&
          child.props &&
          child.props.href &&
          pathname?.startsWith(child.props.href)
        ) {
          relevant = true;
        }
      });

      return relevant;
    }
    return false;
  };

  const mainAxisOffset =
    popoutMenuOffset &&
    popoutMenuOffset.mainAxis &&
    (typeof popoutMenuOffset.mainAxis === 'function'
      ? popoutMenuOffset.mainAxis({level})
      : popoutMenuOffset.mainAxis);

  const alignmentAxisOffset =
    popoutMenuOffset &&
    popoutMenuOffset.alignmentAxis &&
    (typeof popoutMenuOffset.alignmentAxis === 'function'
      ? popoutMenuOffset.alignmentAxis({level})
      : popoutMenuOffset.alignmentAxis);

  const {refs, context} = useFloating({
    strategy: 'fixed',
    placement: 'right-start',
    middleware: [
      offset({
        mainAxis: mainAxisOffset,
        alignmentAxis: alignmentAxisOffset,
      }),
      flip({crossAxis: false}),
      shift(),
      hide(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    handleClose: safePolygon({
      blockPointerEvents: true,
    }),
    restMs: 25,
    enabled: triggerPopout === 'hover',
    delay: {open: 75}, // Delay opening submenu by 75ms
  });

  const click = useClick(context, {
    enabled: triggerPopout === 'click', // Only enable click effect when triggerPopout option is set to 'click'
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, {role: 'menu'});

  // Merge all the interactions into prop getters
  const {getReferenceProps, getItemProps} = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);
  const isSubMenuOpen = openSubmenu?.some(item => item.id === id) || false;

  const handleSlideToggle = () => {
    if (level === 0 && isCollapsed && !isHovered) {
      return;
    }

    toggleOpenSubmenu?.({level, label, active, id});
    onOpenChange?.(!isSubMenuOpen);
    if (
      openSubmenusRef?.current &&
      openSubmenusRef?.current.length > 0 &&
      !persistent
    ) {
      openSubmenusRef.current = [];
    }
  };

  const handleOnClick = event => {
    onClick?.(event);

    if (persistent) {
      const relevant = isPathRelevant();

      if (!relevant && !isSubMenuOpen) {
        handleSlideToggle();
      } else if (
        !relevant &&
        isSubMenuOpen &&
        event.target.closest(`.${menuClasses.button}`) === event.currentTarget
      ) {
        handleSlideToggle();
      }
    } else {
      if (!(removeToggle === true)) {
        handleSlideToggle();
      }
    }
  };

  const handleOnKeyUp = event => {
    onKeyUp?.(event);

    if (event.key === 'Enter') {
      if (!(removeToggle === true)) {
        handleSlideToggle();
      }
    }
  };

  const getSubMenuItemStyles = element => {
    // If the menuItemStyles prop is provided, get the styles for the specified element.
    if (menuItemStyles) {
      // Define the parameters that are passed to the style functions.
      const params = {
        level,
        disabled,
        active,
        isSubmenu: true,
        open: isSubMenuOpen,
      };

      // Get the style function for the specified element.
      const styleFunction = menuItemStyles[element];

      if (styleFunction) {
        // If the style function is a function, call it and return the result.
        // Otherwise, return the style function itself.
        return typeof styleFunction === 'function'
          ? styleFunction(params)
          : styleFunction;
      }
    }
  };

  useEffect(() => {
    if (confirmUrlInChildren(children, pathname)) {
      openSubmenusRef?.current.push({level, label, active: true, id});
    } else {
      if (defaultOpen) {
        openSubmenusRef?.current.push({level, label, active: false, id});
      }
    }
  }, []);

  // Change active state when the url changes
  useEffect(() => {
    if (persistent) {
      const relevant = isPathRelevant();

      if (isInitialMount.current) {
        isInitialMount.current = false;

        if (relevant) {
          if (!isSubMenuOpen) {
            toggleOpenSubmenu({level, label, active: true, id});

            if (
              openSubmenusRef?.current.findIndex(
                submenu => submenu.id === id,
              ) === -1
            ) {
              openSubmenusRef?.current.push({level, label, active: true, id});
            }
          }
          wasPathRelevantRef.current = true;
        }
      } else if (relevant !== wasPathRelevantRef.current) {
        if (relevant && !isSubMenuOpen) {
          toggleOpenSubmenu({level, label, active: true, id});
          wasPathRelevantRef.current = true;
        } else if (!relevant && isSubMenuOpen) {
          if (!isPathRelevant() && openSubmenu?.some(item => item.id === id)) {
            toggleOpenSubmenu({level, label, active: false, id});
          }

          wasPathRelevantRef.current = relevant;
        } else {
          wasPathRelevantRef.current = relevant;
        }
      }
    }
  }, [pathname, persistent]);

  useEffect(() => {
    if (confirmUrlInChildren(children, pathname) || href === pathname) {
      setActive(true);

      if (
        openSubmenusRef?.current.findIndex(submenu => submenu.id === id) === -1
      ) {
        openSubmenusRef?.current.push({level, label, active: true, id});
      } else {
        if (href === pathname && !persistent) {
          handleSlideToggle();
        }
      }
    } else {
      setActive(false);
    }
  }, [pathname, href]);

  const submenuContent = (
    <Collapse in={isSubMenuOpen} timeout={transitionDuration || 200}>
      <StyledSubMenuContent
        ref={
          isCollapsed && level === 0 && isPopoutWhenCollapsed
            ? refs.setFloating
            : null
        }
        level={level}
        rootStyles={getSubMenuItemStyles('subMenuContent')}
        className={menuClasses.subMenuContent}
      >
        {childNodes.map(node =>
          cloneElement(node, {
            ...getItemProps({
              onClick(event) {
                if (
                  node.props.children &&
                  !Array.isArray(node.props.children)
                ) {
                  node.props.onClick?.(event);
                  tree?.events.emit('click');
                }
              },
            }),
            level: level + 1,
          }),
        )}
      </StyledSubMenuContent>
    </Collapse>
  );

  return (
    /* Sub Menu */
    <StyledSubMenu
      ref={ref}
      className={classnames(
        menuClasses.subMenuRoot,
        {[menuClasses.active]: active},
        {[menuClasses.disabled]: disabled},
        {[menuClasses.open]: isSubMenuOpen},
        className,
      )}
      menuItemStyles={getSubMenuItemStyles('root')}
      level={level}
      isPopoutWhenCollapsed={isPopoutWhenCollapsed}
      disabled={disabled}
      active={active}
      isCollapsed={isCollapsed}
      buttonStyles={getSubMenuItemStyles('button')}
      rootStyles={rootStyles}
    >
      {/* Menu Item */}
      <MenuButton
        ref={
          isCollapsed && level === 0 && isPopoutWhenCollapsed && !disabled
            ? refs.setReference
            : null
        }
        onClick={handleOnClick}
        {...(isCollapsed &&
          level === 0 &&
          isPopoutWhenCollapsed &&
          !disabled &&
          getReferenceProps())}
        onKeyUp={handleOnKeyUp}
        title={title}
        className={classnames(menuClasses.button, {
          [menuClasses.active]: active,
        })}
        component={component}
        href={href}
        tabIndex={disabled ? -1 : 0}
        {...rest}
      >
        {/* Sub Menu Icon */}
        {renderMenuIcon({
          icon,
          level,
          active,
          disabled,
          renderExpandedMenuItemIcon,
          styles: getSubMenuItemStyles('icon'),
          isBreakpointReached,
        })}

        {/* Sub Menu Prefix */}
        {prefix && (
          <StyledMenuPrefix
            isHovered={isHovered}
            isCollapsed={isCollapsed}
            firstLevel={level === 0}
            className={menuClasses.prefix}
            rootStyles={getSubMenuItemStyles('prefix')}
          >
            {prefix}
          </StyledMenuPrefix>
        )}

        {/* Sub Menu Label */}
        <StyledMenuLabel
          className={menuClasses.label}
          rootStyles={getSubMenuItemStyles('label')}
          textTruncate={textTruncate}
        >
          {label}
        </StyledMenuLabel>

        {/* Sub Menu Suffix */}
        {suffix && (
          <StyledMenuSuffix
            isHovered={isHovered}
            isCollapsed={isCollapsed}
            firstLevel={level === 0}
            className={menuClasses.suffix}
            rootStyles={getSubMenuItemStyles('suffix')}
          >
            {suffix}
          </StyledMenuSuffix>
        )}

        {/* Sub Menu Toggle Icon Wrapper */}
        {isCollapsed && !isHovered && level === 0 ? null : (
          <StyledVerticalNavExpandIconWrapper
            className={menuClasses.subMenuExpandIcon}
            rootStyles={getSubMenuItemStyles('subMenuExpandIcon')}
          >
            {renderExpandIcon ? (
              renderExpandIcon({
                level,
                disabled,
                active,
                open: isSubMenuOpen,
              })
            ) : (
              /* Expanded Arrow Icon */
              <StyledVerticalNavExpandIcon
                open={isSubMenuOpen}
                transitionDuration={transitionDuration}
              >
                <ChevronRight fontSize='1rem' />
              </StyledVerticalNavExpandIcon>
            )}
          </StyledVerticalNavExpandIconWrapper>
        )}
      </MenuButton>

      {/* Sub Menu Content */}
      {isCollapsed && level === 0 && isPopoutWhenCollapsed ? (
        <FloatingPortal>{submenuContent}</FloatingPortal>
      ) : (
        submenuContent
      )}
    </StyledSubMenu>
  );
};

export default forwardRef(SubMenu);

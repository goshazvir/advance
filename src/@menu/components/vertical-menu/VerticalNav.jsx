'use client';

// Style Imports
import styles from '../../styles/vertical/verticalNavBgImage.module.css';

// Third-party Imports
import classnames from 'classnames';
// React Imports
import {useEffect, useRef} from 'react';

// Hook Imports
import useMediaQuery from '../../hooks/useMediaQuery';
import useVerticalNav from '../../hooks/useVerticalNav';
// Styled Component Imports
import StyledBackdrop from '../../styles/StyledBackdrop';
import {verticalNavClasses} from '../../utils/menuClasses';
// Util Imports
import StyledVerticalNav from '../../styles/vertical/StyledVerticalNav';
import StyledVerticalNavContainer from '../../styles/vertical/StyledVerticalNavContainer';
// Default Config Imports
import {
  defaultBreakpoints,
  verticalNavToggleDuration,
} from '../../defaultConfigs';
import StyledVerticalNavBgColorContainer from '../../styles/vertical/StyledVerticalNavBgColorContainer';

const VerticalNav = props => {
  // Props
  const {
    width = 240,
    collapsedWidth = 80,
    defaultCollapsed = false,
    backgroundColor,
    backgroundImage,
    breakpoint = 'lg',
    customBreakpoint,
    breakpoints,
    transitionDuration = verticalNavToggleDuration,
    backdropColor,
    scrollWithContent = false,
    className,
    customStyles,
    children,
    ...rest
  } = props;

  // Vars
  const mergedBreakpoints = {...defaultBreakpoints, ...breakpoints};

  // Refs
  const verticalNavCollapsedRef = useRef(false);

  // Hooks
  const {
    updateVerticalNavState,
    isCollapsed: isCollapsedContext,
    width: widthContext,
    isBreakpointReached: isBreakpointReachedContext,
    isToggled: isToggledContext,
    isHovered: isHoveredContext,
    collapsing: collapsingContext,
    expanding: expandingContext,
    isScrollWithContent: isScrollWithContentContext,
    transitionDuration: transitionDurationContext,
  } = useVerticalNav();

  // Find the breakpoint from which screen size responsive behavior should enable and if its reached or not
  const breakpointReached = useMediaQuery(
    customBreakpoint ??
      (breakpoint ? mergedBreakpoints[breakpoint] : breakpoint),
  );

  // UseEffect, update verticalNav state to set initial values and update values on change
  useEffect(() => {
    updateVerticalNavState({
      width,
      collapsedWidth,
      transitionDuration,
      isScrollWithContent: scrollWithContent,
      isBreakpointReached: breakpointReached,
    });

    if (!breakpointReached) {
      updateVerticalNavState({isToggled: false});
      if (verticalNavCollapsedRef.current) {
        updateVerticalNavState({isCollapsed: true});
      }
    } else {
      if (isCollapsedContext && !verticalNavCollapsedRef.current) {
        verticalNavCollapsedRef.current = true;
      }

      if (isCollapsedContext) updateVerticalNavState({isCollapsed: false});
      if (isHoveredContext) updateVerticalNavState({isHovered: false});
    }
  }, [
    width,
    collapsedWidth,
    scrollWithContent,
    breakpointReached,
    updateVerticalNavState,
  ]);
  useEffect(() => {
    if (defaultCollapsed) {
      updateVerticalNavState({
        isCollapsed: defaultCollapsed,
        isToggled: false,
      });
    }
  }, [defaultCollapsed]);
  useEffect(() => {
    setTimeout(() => {
      updateVerticalNavState({
        expanding: false,
        collapsing: false,
      });
    }, transitionDuration);

    if (
      !isCollapsedContext &&
      !breakpointReached &&
      verticalNavCollapsedRef.current
    ) {
      verticalNavCollapsedRef.current = false;
    }
  }, [isCollapsedContext]);

  // Handle Backdrop(Content Overlay) Click
  const handleBackdropClick = () => {
    // Close the verticalNav
    updateVerticalNavState({isToggled: false});
  };

  // Handle VerticalNav Hover Event

  // Handle VerticalNav Hover Out Event

  return (
    <StyledVerticalNav
      width={defaultCollapsed && !widthContext ? collapsedWidth : width}
      isBreakpointReached={isBreakpointReachedContext}
      collapsedWidth={collapsedWidth}
      collapsing={collapsingContext}
      expanding={expandingContext}
      customStyles={customStyles}
      scrollWithContent={isScrollWithContentContext}
      transitionDuration={transitionDurationContext}
      className={classnames(
        verticalNavClasses.root,
        {
          [verticalNavClasses.collapsed]: isCollapsedContext,
          [verticalNavClasses.toggled]: isToggledContext,
          [verticalNavClasses.hovered]: isHoveredContext,
          [verticalNavClasses.breakpointReached]: isBreakpointReachedContext,
          [verticalNavClasses.scrollWithContent]: isScrollWithContentContext,
          [verticalNavClasses.collapsing]: collapsingContext,
          [verticalNavClasses.expanding]: expandingContext,
        },
        className,
      )}
      {...rest}
    >
      {/* VerticalNav Container for hover effect when verticalNav is collapsed */}
      <StyledVerticalNavContainer
        width={widthContext}
        className={verticalNavClasses.container}
        transitionDuration={transitionDurationContext}

        // {...(!isPopoutWhenCollapsedContext &&
        //   isCollapsedContext &&
        //   !breakpointReached && {
        //     onMouseEnter: handleVerticalNavHover,
        //     onMouseLeave: handleVerticalNavHoverOut
        //   })}
      >
        {/* VerticalNav Container to apply styling like background */}
        <StyledVerticalNavBgColorContainer
          className={verticalNavClasses.bgColorContainer}
          backgroundColor={backgroundColor}
        >
          {children}
        </StyledVerticalNavBgColorContainer>

        {/* Display verticalNav background image if provided by user through props */}
        {backgroundImage && (
          /* VerticalNav Background Image */
          <img
            className={classnames(verticalNavClasses.image, styles.root)}
            src={backgroundImage}
            alt='verticalNav background'
          />
        )}
      </StyledVerticalNavContainer>

      {/* When verticalNav is toggled on smaller screen, show/hide verticalNav backdrop */}
      {isToggledContext && breakpointReached && (
        /* VerticalNav Backdrop */
        <StyledBackdrop
          role='button'
          tabIndex={0}
          aria-label='backdrop'
          onClick={handleBackdropClick}
          onKeyPress={handleBackdropClick}
          className={verticalNavClasses.backdrop}
          backdropColor={backdropColor}
        />
      )}
    </StyledVerticalNav>
  );
};

export default VerticalNav;

// Third-party Imports
import classnames from 'classnames';

import Box from '@mui/material/Box';
// Util Imports
import {verticalLayoutClasses} from './utils/layoutClasses';
// Component Imports

const MobileVerticalLayout = props => {
  // Props
  const {navbar, footer, navigation, children} = props;

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <Box
        className={classnames(
          verticalLayoutClasses.contentWrapper,
          'flex flex-col min-is-0',
        )}
        width='100vw'
        sx={{
          position: 'relative',
          height: '100dvh', // Use dynamic viewport height
          overflow: 'hidden',
          // Ensure full viewport usage on mobile
          minHeight: '100dvh',
        }}
      >
        {/* Fixed Navbar */}
        {navbar && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
              width: '100%',
              backgroundColor: 'background.default',
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
              boxShadow: 1,
            }}
          >
            {navbar}
          </Box>
        )}

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            // Enable momentum scrolling on iOS
            WebkitOverflowScrolling: 'touch',
            // Prevent overscroll behavior that can interfere with UI hiding
            overscrollBehavior: 'none',
            // Optimize scrolling performance
            // transform: 'translateZ(0)',
            // Hide scrollbar for webkit browsers (Chrome, Safari, Edge)
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            // Hide scrollbar for Firefox
            scrollbarWidth: 'none',
            // Hide scrollbar for IE and Edge Legacy
            msOverflowStyle: 'none',
          }}
          style={{
            paddingTop: navbar ? 'var(--navbar-height, 64px)' : 0,
            paddingBottom: footer ? 'var(--footer-height, 64px)' : 0,
          }}
        >
          {children}
        </Box>

        {/* Fixed Footer */}
        {footer && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
              width: '100%',
              backgroundColor: 'background.default',
              borderTop: '1px solid',
              borderTopColor: 'divider',
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MobileVerticalLayout;

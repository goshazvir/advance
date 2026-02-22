// Third-party Imports
import classnames from 'classnames';

import Box from '@mui/material/Box';
// Util Imports
import {verticalLayoutClasses} from './utils/layoutClasses';
// Component Imports
import LayoutContent from './components/vertical/LayoutContent';

const VerticalLayout = props => {
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
      >
        {navbar || null}
        {/* Content */}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </Box>
    </div>
  );
};

export default VerticalLayout;

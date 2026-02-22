'use client';

// Third-party Imports
import classnames from 'classnames';

// MUI Imports
import {useTheme} from '@mui/material/styles';

const DirectionalIcon = props => {
  // Props
  const {ltrIconClass, rtlIconClass, className} = props;

  // Hooks
  const theme = useTheme();

  return (
    <i
      className={classnames(
        {
          [ltrIconClass]: theme.direction === 'ltr',
          [rtlIconClass]: theme.direction === 'rtl',
        },
        className,
      )}
    />
  );
};

export default DirectionalIcon;

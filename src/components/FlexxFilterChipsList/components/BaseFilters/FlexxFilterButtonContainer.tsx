import React, {useMemo, useState} from 'react';

import Menu from '@mui/material/Menu';
import {Button, Tooltip} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface FlexxFilterButtonProps {
  children: React.ReactNode;
  filterId: string;
  label: string;
  error?: string | null;
  onClickDismissFilter: (filterId: string) => void;
}

const FlexxFilterButtonContainer: React.FC<FlexxFilterButtonProps> = ({
  children,
  filterId,
  label,
  onClickDismissFilter,
  error,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const endIcon = useMemo(() => {
    return (
      <div
        style={{justifyContent: 'center', display: 'flex'}}
        onClick={() => {
          onClickDismissFilter(filterId);
        }}
      >
        <CloseIcon fontSize={'small'} />
      </div>
    );
  }, []);

  return (
    <>
      <Button
        variant='outlined'
        endIcon={endIcon}
        onClick={onClick}
        color={'secondary'}
      >
        {error && (
          <Tooltip title={error}>
            <ErrorOutlineIcon color='error' style={{marginRight: 8}} />
          </Tooltip>
        )}
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
};

export {FlexxFilterButtonContainer};

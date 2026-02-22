'use client';

// React Imports
import {useRef, useState} from 'react';

import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
// Next Imports
import {useRouter} from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
// MUI Imports
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
// Util Imports
import {getLocalizedUrl} from '@/utils/i18n';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
// Hook Imports
import {useSettings} from '@core/hooks/useSettings';
import {cleanCache} from '@/QueryClient/invalidators';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)',
});

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false);

  // Refs
  const anchorRef = useRef(null);

  // Hooks
  const router = useRouter();
  const {settings} = useSettings();

  // Hardcoded user for interview assignment
  const user = {
    name: 'Interview Candidate',
    email: 'candidate@example.com',
    image: '',
  };

  const handleDropdownOpen = () => {
    setOpen(prev => !prev);
  };

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(getLocalizedUrl(url));
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return;
    }

    setOpen(false);
  };

  const handleUserLogout = async () => {
    try {
      await cleanCache();
      window.location.href = '/';
    } catch {
      await cleanCache();
    }
  };

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={user.name}
          src={user.image}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({TransitionProps, placement}) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-end' ? 'right top' : 'left top',
            }}
          >
            <Paper
              className={
                settings.skin === 'bordered'
                  ? 'border shadow-none'
                  : 'shadow-lg'
              }
            >
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  <div
                    className='flex items-center plb-2 pli-4 gap-2'
                    tabIndex={-1}
                  >
                    <Avatar alt={user.name} src={user.image} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {user.name}
                      </Typography>
                      <Typography variant='caption'>{user.email}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={handleUserLogout}
                      sx={{'& .MuiButton-endIcon': {marginInlineStart: 1.5}}}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default UserDropdown;

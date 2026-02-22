'use client';
// Third-party Imports
import classnames from 'classnames';

// Component Imports
import NavToggle from './NavToggle';
import NavSearch from './NavSearch';
import {Stack} from '@mui/material';
// Util Imports
import {verticalLayoutClasses} from '@layouts/utils/layoutClasses';

const NavbarContent = () => {
  return (
    <Stack
      gap={4}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100%'}
      px={{xs: '0.2rem', md: '2rem'}}
      className={classnames(verticalLayoutClasses.navbarContent)}
    >
      <Stack flexGrow={1} direction={'row'} alignItems={'center'} gap={4}>
        <NavToggle />
        <NavSearch />
      </Stack>
    </Stack>
  );
};

export default NavbarContent;

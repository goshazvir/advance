'use client';
// Third-party Imports

import {Stack} from '@mui/material';
// Component Imports
import {Menu} from '@menu/vertical-menu';
// MUI Imports
import {useTheme} from '@mui/material/styles';
import {useSettings} from '@core/hooks/useSettings';
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav';
// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles';
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles';
import {useUserSession} from '@components/UserSessionProvider/UserSessionProvider';
// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon';
import FlexxMenuItemComponent from '@components/FlexxLayout/FlexxVerticalLayout/FlexxSideBarMenu/FlexxMenuItem';
import {
  FlexxBottomMenuGroups,
  FlexxMenuGroups,
} from '@components/FlexxLayout/FlexxVerticalLayout/FlexxSideBarMenu/flexxMenuItems';

const RenderExpandIcon = ({open, transitionDuration}) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className='iconify fluent--chevron-right-20-regular' />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = () => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();
  const {settings} = useSettings();
  const session = useUserSession();

  // Vars
  const {transitionDuration} = verticalNavOptions;

  const filteredGroupItems = FlexxMenuGroups.map(group => group.items);
  const filteredBottomGroupItems = FlexxBottomMenuGroups.map(
    group => group.items,
  );

  return (
    <Menu
      style={{width: '100%'}}
      popoutMenuOffset={{mainAxis: 10}}
      menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
      renderExpandIcon={({open}) => (
        <RenderExpandIcon open={open} transitionDuration={transitionDuration} />
      )}
      renderExpandedMenuItemIcon={{icon: <i className='ri-circle-line' />}}
      menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      menuItemSpacing={6}
    >
      <Stack
        direction={'column'}
        paddingBottom={'2rem'}
        height={'100%'}
        width='100%'
        alignItems='stretch'
      >
        <Stack spacing={6} alignItems='stretch' width='100%' flex={1}>
          {filteredGroupItems.map(
            (group, index) =>
              group.length > 0 && (
                <Stack key={index} alignItems='stretch' width='100%'>
                  {group.map((item, i) => (
                    <FlexxMenuItemComponent key={`${item.id}.${i}`} {...item} />
                  ))}
                </Stack>
              ),
          )}
        </Stack>

        <Stack
          mt={'auto'}
          flexShrink={0}
          alignItems='stretch'
          width='100%'
          spacing={1}
        >
          {filteredBottomGroupItems.map(
            (group, index) =>
              group.length > 0 && (
                <Stack
                  key={`bottom-${index}`}
                  alignItems='stretch'
                  width='100%'
                >
                  {group.map((item, i) => (
                    <FlexxMenuItemComponent key={`${item.id}.${i}`} {...item} />
                  ))}
                </Stack>
              ),
          )}
        </Stack>
      </Stack>
    </Menu>
  );
};

export default VerticalMenu;

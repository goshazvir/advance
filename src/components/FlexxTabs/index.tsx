import React, {FC, useEffect} from 'react';

import Divider from '@mui/material/Divider';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {FlexxTabsProps, TabType} from '@components/FlexxTabs/domain/flexx-tabs';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const FlexxTabs = <K,>({
  tabs,
  selectedTab,
  tabDirection,
  handleTabChange,
  removeMargin,
  renderIfSingleTab,
  iconSize,
  alignContent,
}: FlexxTabsProps<K>) => {
  const large = !!tabs.find(tab => tab.large);

  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  useEffect(() => {
    if (tabs.length > 0 && selectedTab !== undefined) {
      const tabExists = tabs.some(tab => tab.id === selectedTab);
      if (!tabExists && handleTabChange) {
        handleTabChange({} as React.SyntheticEvent, tabs[0].id);
      }
    }
  }, [tabs, selectedTab, handleTabChange]);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  if (tabs.length == 1 && !renderIfSingleTab) {
    return (
      <Stack paddingTop={'1rem'} spacing={'0.5rem'}>
        <Divider />
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        position: isMobile ? undefined : 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
      }}
      marginX={removeMargin || large ? 0 : 8}
    >
      <Tabs value={selectedTab} onChange={handleTabChange} variant='fullWidth'>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <FlexxTabLabel
                tab={tab}
                tabDirection={tabDirection}
                large={large}
                iconSize={iconSize}
                alignContent={alignContent}
              />
            }
            sx={
              large
                ? {
                    paddingLeft: 0,
                    paddingBottom: '1rem',
                    justifyContent: 'start',
                    alignItems: 'start',
                  }
                : {justifyContent: 'start', alignItems: alignContent ?? 'start'}
            }
            disabled={tab.disabled}
            disableRipple
          />
        ))}
      </Tabs>
    </Box>
  );
};

const FlexxTabLabel: FC<{
  tab: TabType;
  tabDirection?: 'vertical' | 'horizontal';
  large?: boolean;
  iconSize?: number;
  alignContent?: 'start' | 'center' | 'end';
}> = ({tab, large, tabDirection, iconSize = 20, alignContent}) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const {title, icon} = tab;
  const isRow = tabDirection === 'horizontal';
  return (
    <Stack
      direction={isRow ? 'row' : 'column'}
      justifyContent={isRow ? 'start' : 'end'}
      alignContent={'center'}
      alignItems={tab.align ?? 'start'}
      alignSelf={alignContent}
      textAlign={alignContent ?? !isMdDown ? 'start' : undefined}
      gap={isRow ? 2 : 1}
      paddingX={!large ? 2 : 0}
    >
      <Stack
        direction={'row'}
        width={'100%'}
        alignItems={'center'}
        gap={1}
        justifyContent={alignContent}
      >
        {icon && !isMdDown && (
          <FlexxIcon icon={icon} width={iconSize} height={iconSize} />
        )}
        {tab.subtitle && (
          <Typography variant={'body2'}>{tab.subtitle}</Typography>
        )}
      </Stack>
      <Typography variant={'h6'} alignSelf={alignContent} whiteSpace='nowrap'>
        {title}
      </Typography>
    </Stack>
  );
};

export default FlexxTabs;

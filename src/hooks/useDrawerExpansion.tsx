import React, {useState} from 'react';

import {expandedDrawerComponentSizes} from '@components/DrawerWrapper/DrawerWrapper';

export const useDrawerExpansion = ({
  settingsComponent,
  onCloseDrawer,
}: {
  settingsComponent?: React.ReactElement;
  onCloseDrawer: () => void;
}) => {
  const [collapsedComponent, setCollapsedComponent] = useState<
    React.ReactElement | undefined | null
  >(null);
  const [collapsedComponentWidth, setCollapsedComponentWidth] = useState<
    expandedDrawerComponentSizes | undefined
  >(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleExpand = (
    component: React.ReactElement,
    width?: expandedDrawerComponentSizes,
  ) => {
    setCollapsedComponent(component);
    setCollapsedComponentWidth(width);
    setIsSettingsOpen(false);
  };

  const handleCloseExpansion = () => {
    if (collapsedComponent) {
      setCollapsedComponent(null);
      setIsSettingsOpen(false);
      setCollapsedComponentWidth(undefined);
      return;
    }

    onCloseDrawer();
  };

  const handleCollapseExpansion = () => {
    setCollapsedComponent(null);
    setCollapsedComponentWidth(undefined);
    setIsSettingsOpen(false);
  };

  const handleSettings = () => {
    if (isSettingsOpen) {
      setCollapsedComponent(null);
      setCollapsedComponentWidth(undefined);
      setIsSettingsOpen(false);
      return;
    }

    setIsSettingsOpen(true);
    setCollapsedComponent(settingsComponent);
    setCollapsedComponentWidth('fill');
  };

  return {
    isSettingsOpen,
    collapsedComponent,
    collapsedComponentWidth,
    handleExpand,
    handleCloseExpansion,
    handleCollapseExpansion,
    handleSettings,
  };
};

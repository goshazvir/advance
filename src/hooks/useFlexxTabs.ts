import React, {useState} from 'react';

export interface FlexxTabsType<T> {
  selectedTab: T;
  handleTabChange: (event: React.SyntheticEvent, newTab: T) => void;
}

export const useFlexxTabs = <T>(initialTab: T): FlexxTabsType<T> => {
  const [selectedTab, setSelectedTab] = useState<T>(initialTab);

  const handleTabChange = (event: React.SyntheticEvent, newTab: T): void => {
    setSelectedTab(newTab);
  };

  return {
    selectedTab,
    handleTabChange,
  };
};

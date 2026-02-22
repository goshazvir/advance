import React from 'react';

export interface TabType {
  id: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  large?: boolean;
  align?: 'left' | 'center' | 'right';
  subtitle?: string | React.ReactNode;
}

export interface FlexxTabsProps<K> {
  tabs: TabType[];
  tabDirection?: 'vertical' | 'horizontal';
  selectedTab: string;
  removeMargin?: boolean;
  renderIfSingleTab?: boolean;
  // eslint-disable-next-line
  handleTabChange: (event: React.SyntheticEvent, newTab: any) => void;
  iconSize?: number;
  alignContent?: 'start' | 'center' | 'end';
  shouldRenderArgs?: K;
}

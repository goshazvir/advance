import React, {MouseEvent} from 'react';

import {StackProps, TooltipProps} from '@mui/material';

export interface ActionButtonConfig {
  event_id?: string;
  name: string;
  variant: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  endIcon?: string;
  startIcon?: string;
  color?: 'error';
  MenuComponent?: React.FC;
  toolTip?: Partial<TooltipProps>;
  skeletonWidth?: number | string;
  disableToolTip?: boolean;
  loading?: boolean;
  origin?: string;
}

export interface FlexxActionButtonsProps {
  origin?: string;
  actions: ActionButtonConfig[];
  containerProps?: StackProps;
  gap?: number | string;
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export const SkeletonSize: Record<'small' | 'medium' | 'large', string> = {
  small: '2rem',
  medium: '4rem',
  large: '6rem',
};

import React from 'react';

import {Box} from '@mui/material';

interface FlexxIconProps {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  variant?: 'iconify' | 'iconify-color';
  style?: React.CSSProperties;
}

const FlexxIcon: React.FC<FlexxIconProps> = ({
  icon,
  width,
  height,
  className = '',
  color = 'inherit',
  variant = 'iconify',
  style,
}) => {
  const calculateSize = React.useCallback(
    (measure?: number) => {
      if (measure) return measure;
      const iconSize = Number(icon.split('-').at(-2));
      if (!isNaN(iconSize)) return iconSize;
      return 20;
    },
    [width, height],
  );

  const defaultHeight = calculateSize(height);
  const defaultWidth = calculateSize(width);

  if (!icon) {
    return null;
  }

  return (
    <Box
      width={defaultWidth}
      height={defaultHeight}
      display='flex'
      alignItems='center'
      justifyContent={'center'}
    >
      <i
        style={{
          width: defaultWidth,
          height: defaultHeight,
          color: color,
          ...style,
        }}
        className={`${variant} ${className} ${icon}`}
      />
    </Box>
  );
};

export default FlexxIcon;

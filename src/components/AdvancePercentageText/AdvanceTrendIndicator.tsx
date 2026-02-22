import React from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {Tooltip, Typography, useTheme} from '@mui/material';

const AdvanceTrendIndicator: React.FC<{
  percentage?: number;
  align?: 'baseline' | 'center';
  tooltip?: string;
}> = ({percentage, align = 'center', tooltip = null}) => {
  const theme = useTheme();
  const isPercentage = percentage !== undefined;
  const isPercentagePositive = isPercentage && percentage >= 0;

  return (
    <Tooltip title={tooltip}>
      <Typography
        display={'flex'}
        flexDirection={'row'}
        alignItems={align}
        gap={'0.25rem'}
        variant={'caption'}
        sx={{
          paddingTop: align === 'baseline' ? 1 : 0,
          color: 'secondary.dark',
        }}
      >
        {isPercentage ? (
          <>
            <FlexxIcon
              icon={
                isPercentagePositive
                  ? 'fluent--triangle-16-filled'
                  : 'fluent--triangle-down-16-filled'
              }
              color={
                isPercentagePositive
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              width={8}
              height={8}
            />
            <span>{percentage?.toFixed(1)}%</span>
          </>
        ) : (
          '—'
        )}
      </Typography>
    </Tooltip>
  );
};

export default AdvanceTrendIndicator;

import React from 'react';

import Typography from '@mui/material/Typography';
import {Skeleton, TypographyVariant} from '@mui/material';

interface AdvanceLoadingTypographyProps {
  prefix?: string;
  value?: string;
  suffix?: string;
  isLoading?: boolean;
  variant?: TypographyVariant;
}

const AdvanceLoadingTypography: React.FC<AdvanceLoadingTypographyProps> = ({
  prefix,
  value,
  suffix,
  isLoading,
  variant,
}) => {
  return (
    <Typography variant={variant}>
      {prefix}
      {isLoading ? <Skeleton variant='text' width={100} /> : value}
      {suffix}
    </Typography>
  );
};

export default AdvanceLoadingTypography;

import React from 'react';

import {Stack, StackProps, Typography, TypographyProps} from '@mui/material';

interface AdvancePercentageTextProps {
  showCents?: boolean;
  amount?: number | string;
  currency?: string;
  variant?: TypographyProps['variant'];
  color?: string;
  align?: StackProps['justifySelf'];
}
const subtitleSizeMap: Record<
  NonNullable<TypographyProps['variant']>,
  number
> = {
  h1: 12,
  h2: 10,
  h3: 10,
  h4: 10,
  h5: 10,
  h6: 10,
  subtitle1: 10,
  subtitle2: 10,
  body1: 10,
  body2: 10,
  caption: 10,
  button: 10,
  overline: 10,
  inherit: 10,
};

const paddingMap: Record<NonNullable<TypographyProps['variant']>, number> = {
  h1: 1,
  h2: 1,
  h3: 1,
  h4: 1,
  h5: 1,
  h6: 1,
  subtitle1: 1,
  subtitle2: 0.5,
  body1: 1,
  body2: 0.5,
  caption: 0,
  button: 0,
  overline: 0,
  inherit: 0.4,
};

const AdvancePercentageText: React.FC<AdvancePercentageTextProps> = ({
  amount,
  color,
  variant = 'inherit',
  align,
}) => {
  if (amount === undefined || amount === null || amount === '') {
    return (
      <Typography variant={variant} color={color}>
        —
      </Typography>
    );
  }

  const numericValue = Number.parseFloat(String(amount));
  const isFinite = !Number.isNaN(numericValue) && Number.isFinite(numericValue);
  const isPercentage = numericValue >= 0 && numericValue <= 100;
  const isValid = isFinite && isPercentage;
  const formattedNumber = numericValue.toFixed(2);

  if (!isValid) {
    return (
      <Typography variant={variant} color={color}>
        —
      </Typography>
    );
  }

  return (
    <Stack direction='row' spacing={0.3} justifySelf={align}>
      <Typography gutterBottom={false} variant={variant} color={color}>
        {formattedNumber}
      </Typography>

      <Typography
        paddingTop={paddingMap[variant]}
        fontSize={subtitleSizeMap[variant]}
        color={color}
        gutterBottom={false}
        variant={variant}
      >
        %
      </Typography>
    </Stack>
  );
};
export default AdvancePercentageText;

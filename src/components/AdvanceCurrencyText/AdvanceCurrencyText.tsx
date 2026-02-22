import React from 'react';

import {formatNumber} from '@/utils/formatter.utils';
import {Stack, StackProps, Typography, TypographyProps} from '@mui/material';

export interface AdvanceCurrencyTextProps {
  showCents?: boolean;
  amount?: number | string;
  currency?: string;
  variant?: TypographyProps['variant'];
  fontSize?: TypographyProps['fontSize'];
  color?: string;
  fontWeight?: TypographyProps['fontWeight'];
  align?: StackProps['justifySelf'];
  width?: StackProps['width'];
}
const subtitleSizeMap: Record<
  NonNullable<TypographyProps['variant']>,
  number
> = {
  h1: 12,
  h2: 10,
  h3: 10,
  h4: 15,
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

const AdvanceCurrencyText: React.FC<AdvanceCurrencyTextProps> = ({
  showCents = true,
  amount,
  currency = '$',
  color,
  variant = 'inherit',
  fontWeight,
  fontSize,
  align,
  width,
}) => {
  if (amount === undefined || amount === null || amount === '') {
    return (
      <Typography variant={variant} color={color}>
        —
      </Typography>
    );
  }

  const numericVal = Number(amount);
  const isNegative = numericVal < 0;
  const absoluteVal = Math.abs(numericVal);
  const formatted = absoluteVal.toFixed(2);
  const [dollarsStr, centsStr] = formatted.split('.');
  const dollars = Number(dollarsStr);
  const cents = centsStr ?? '00';

  return (
    <Stack direction='row' spacing={0.3} justifySelf={align} width={width}>
      {isNegative && (
        <Typography
          variant={variant}
          color={color}
          gutterBottom={false}
          fontWeight={fontWeight}
          fontSize={fontSize}
        >
          (
        </Typography>
      )}
      <Typography
        paddingTop={paddingMap[variant]}
        variant={variant}
        fontSize={subtitleSizeMap[variant]}
        color={color}
        fontWeight={fontWeight}
        gutterBottom={false}
      >
        {currency}
      </Typography>
      <Typography
        gutterBottom={false}
        fontWeight={fontWeight}
        fontSize={fontSize}
        variant={variant}
        color={color}
      >
        {formatNumber(dollars)}
        {showCents ? '.' : ''}
      </Typography>
      {showCents && (
        <Typography
          paddingTop={paddingMap[variant]}
          fontSize={subtitleSizeMap[variant]}
          color={color}
          fontWeight={fontWeight}
          gutterBottom={false}
          variant={variant}
        >
          {cents}
        </Typography>
      )}
      {isNegative && (
        <Typography
          variant={variant}
          color={color}
          gutterBottom={false}
          fontWeight={fontWeight}
          fontSize={fontSize}
        >
          )
        </Typography>
      )}
    </Stack>
  );
};

export default AdvanceCurrencyText;

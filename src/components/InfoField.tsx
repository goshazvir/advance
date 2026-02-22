import React from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import CopyIconButton from '@components/CopyIconButton/CopyIconButton';
import {Skeleton, Stack, Typography, TypographyProps} from '@mui/material';
import AdvanceCurrencyText, {
  AdvanceCurrencyTextProps,
} from '@components/AdvanceCurrencyText/AdvanceCurrencyText';

interface InfoFieldProps {
  value: string | number | undefined;
  label: string;
  endValueIcon?: string;
  endLabelIcon?: string;
  endLabelIconColor?: string;
  variant?: TypographyProps['variant'];
  lableVariant?: TypographyProps['variant'];
  valueColor?: string;
  lableColor?: string;
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
  isCopy?: boolean;
  isLoading?: boolean;
  isCurrency?: boolean;
  currencyProps?: Partial<AdvanceCurrencyTextProps>;
  borderProps?: {
    enabled?: boolean;
    color?: string;
    radius?: string | number;
    padding?: string | number;
  };
}

const InfoField: React.FC<InfoFieldProps> = ({
  value,
  label,
  endValueIcon,
  endLabelIcon,
  endLabelIconColor,
  variant = 'h6',
  lableVariant = 'caption',
  valueColor = 'primary.main',
  lableColor = 'secondary.main',
  fontSize,
  fontWeight,
  isCopy,
  isLoading,
  isCurrency = false,
  currencyProps = {},
  borderProps = {},
}) => {
  const {
    enabled = false,
    color = 'divider',
    radius = '0.5rem',
    padding = '0.3rem',
  } = borderProps;

  const hasValue =
    value !== undefined &&
    value !== null &&
    (typeof value === 'number' || value.toString().trim() !== '');

  const wrapperStyles = enabled
    ? {
        border: '1px solid',
        borderColor: color,
        borderRadius: radius,
        padding: padding,
      }
    : {};

  if (isLoading) {
    return (
      <Stack direction='column' sx={wrapperStyles}>
        <Skeleton width={100} height={28} />
        <Stack direction='row' alignItems='center' spacing={0.5}>
          <Typography variant={lableVariant} color={lableColor}>
            {label}
          </Typography>
          {endLabelIcon && (
            <FlexxIcon
              icon={endLabelIcon}
              color={endLabelIconColor}
              width={14}
              height={14}
            />
          )}
        </Stack>
      </Stack>
    );
  }

  if (!hasValue) {
    return (
      <Stack direction='column' sx={wrapperStyles}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Typography
            variant={variant}
            color='secondary.main'
            fontSize={fontSize}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textWrap: 'nowrap',
            }}
          >
            N/A
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={0.5}>
          <Typography variant={lableVariant} color={lableColor}>
            {label}
          </Typography>
          {endLabelIcon && (
            <FlexxIcon
              icon={endLabelIcon}
              color={endLabelIconColor}
              width={14}
              height={14}
            />
          )}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction='column' sx={wrapperStyles}>
      <Stack direction='row' alignItems='center' spacing={1}>
        {isCurrency ? (
          <Stack direction={'row'} gap={'0.5rem'} alignItems={'center'}>
            <AdvanceCurrencyText
              amount={value}
              color={valueColor}
              variant={variant}
              fontSize={fontSize}
              fontWeight={fontWeight}
              {...currencyProps}
            />
            {endValueIcon && (
              <FlexxIcon icon={endValueIcon} width={28} height={28} />
            )}
          </Stack>
        ) : (
          <Typography
            variant={variant}
            fontWeight={fontWeight}
            fontSize={fontSize}
            color={valueColor}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textWrap: 'nowrap',
            }}
          >
            {value}
          </Typography>
        )}

        {hasValue && isCopy && (
          <CopyIconButton
            valueToCopy={value}
            iconHeight={16}
            iconWidth={16}
            size={'small'}
            sx={{padding: '2px'}}
          />
        )}
      </Stack>

      <Stack direction='row' alignItems='center' spacing={0.5}>
        <Typography variant={lableVariant} color={lableColor}>
          {label}
        </Typography>
        {endLabelIcon && (
          <FlexxIcon
            icon={endLabelIcon}
            color={endLabelIconColor}
            width={14}
            height={14}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default InfoField;

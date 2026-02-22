import React from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import CopyIconButton from '@/components/CopyIconButton/CopyIconButton';
import AdvanceCurrencyText, {
  AdvanceCurrencyTextProps,
} from '@/components/AdvanceCurrencyText/AdvanceCurrencyText';
import {
  Card,
  CardContent,
  Skeleton,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from '@mui/material';

export interface DisplayInfoProps {
  value: string | number | React.ReactNode | undefined;
  subValue?: string | number | React.ReactNode;
  label: string;
  labelColor?: string;
  valueColor?: string;
  icon?: string;
  variant?: TypographyProps['variant'];
  labelVariant?: TypographyProps['variant'];
  valueVariant?: TypographyProps['variant'];
  subValueVariant?: TypographyProps['variant'];
  isLoading?: boolean;
  isCurrency?: boolean;
  currencyProps?: Partial<AdvanceCurrencyTextProps>;
  isCard?: boolean;
  additionalInfo?: string;
  justifyContent?: StackProps['justifyContent'];
  isCopy?: boolean;
}

const DisplayInfo: React.FC<DisplayInfoProps> = ({
  value,
  subValue,
  label,
  labelColor = 'text.secondary',
  icon,
  variant,
  labelVariant,
  valueVariant,
  subValueVariant,
  justifyContent = 'space-between',
  isLoading,
  isCurrency,
  currencyProps,
  isCard,
  additionalInfo,
  isCopy,
  valueColor = 'text.primary',
}) => {
  const hasValue =
    isCurrency ||
    (value !== undefined &&
      value !== null &&
      (typeof value === 'number' ||
        (typeof value === 'string' && value.toString().trim() !== '') ||
        React.isValidElement(value)));

  if (isLoading) {
    return (
      <Stack direction='row' alignItems='center' gap={2.5} py={1}>
        {icon && (
          <FlexxIcon
            icon={icon}
            color={'text.secondary'}
            width={22}
            height={22}
          />
        )}
        <Typography
          variant={variant || 'body1'}
          color={labelColor}
          sx={{fontWeight: 500, minWidth: 'fit-content'}}
        >
          {label}
        </Typography>
        <Skeleton
          variant='text'
          width={120}
          height={24}
          sx={{display: 'inline-block', verticalAlign: 'middle'}}
        />
      </Stack>
    );
  }

  if (!hasValue) {
    if (isCard) {
      return (
        <Card sx={{backgroundColor: 'transparent'}}>
          <CardContent>
            <Typography variant={'h5'} component='div'>
              {label}
            </Typography>
            <Typography
              variant='body2'
              color='text.disabled'
              sx={{fontStyle: 'italic'}}
            >
              N/A
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Stack direction='row' alignItems='center' gap={2.5} py={1}>
        {icon && (
          <FlexxIcon
            icon={icon}
            color={'text.secondary'}
            width={22}
            height={22}
          />
        )}
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={justifyContent ?? 'space-between'}
          alignItems={'start'}
          gap={2}
        >
          <Typography
            variant={variant || 'body1'}
            color={labelColor}
            sx={{fontWeight: 500, minWidth: 'fit-content'}}
          >
            {label}
          </Typography>
          <Typography
            variant={variant || 'body1'}
            color='text.disabled'
            sx={{
              display: 'flex',
              alignItems: 'center',
              textWrap: 'nowrap',
              fontStyle: 'italic',
            }}
          >
            N/A
          </Typography>
        </Stack>
      </Stack>
    );
  }

  if (isCard) {
    return (
      <Card sx={{backgroundColor: 'transparent'}}>
        <CardContent>
          <Typography variant={labelVariant || 'h5'} component='div'>
            {label}
          </Typography>

          {isCurrency ? (
            <AdvanceCurrencyText
              amount={Number(value ?? 0)}
              variant={valueVariant || 'body2'}
              color='text.secondary'
            />
          ) : (
            <Typography
              variant={valueVariant || 'body2'}
              color='text.secondary'
              sx={{wordBreak: 'break-word', overflowWrap: 'break-word'}}
            >
              {value}
            </Typography>
          )}
          {subValue && (
            <Typography
              variant={subValueVariant || 'body2'}
              color='text.secondary'
              sx={{wordBreak: 'break-word', overflowWrap: 'break-word'}}
            >
              {subValue}
            </Typography>
          )}
          {additionalInfo && (
            <Typography variant='body2' color='text.primary' fontWeight='bold'>
              *{additionalInfo}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack direction='row' alignItems='center' gap={2.5} py={1}>
      {icon && (
        <FlexxIcon icon={icon} color={'text.primary'} width={22} height={22} />
      )}
      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={justifyContent ?? 'space-between'}
        gap={2}
      >
        <Typography
          variant={labelVariant || variant || 'body1'}
          color={labelColor}
          sx={{fontWeight: 500, minWidth: 'fit-content'}}
        >
          {label}
        </Typography>
        <Stack direction={'row'} alignItems={'center'}>
          {isCurrency ? (
            <AdvanceCurrencyText
              amount={Number(value) ?? 0}
              variant={valueVariant || variant || 'body1'}
              color='text.primary'
              fontWeight={600}
              {...currencyProps}
            />
          ) : (
            <Typography
              variant={valueVariant || variant || 'body1'}
              fontWeight={600}
              color={valueColor}
            >
              {value}
            </Typography>
          )}
          {isCopy && typeof value !== 'object' && (
            <CopyIconButton
              valueToCopy={String(value)}
              iconHeight={20}
              iconWidth={20}
              size={'small'}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DisplayInfo;

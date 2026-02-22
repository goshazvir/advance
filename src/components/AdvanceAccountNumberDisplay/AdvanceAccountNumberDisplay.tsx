import React, {useState} from 'react';

import {Typography, TypographyProps} from '@mui/material';
import {Skeleton, TypographyVariant} from '@mui/material';
import {formatAccountNumber} from '@/utils/formatter.utils';
import {formatFullAccountNumber} from '@/utils/formatter.utils';
import CopyIconButton from '@components/CopyIconButton/CopyIconButton';
import {HIDE_ACCOUNT_NUMBER_AFTER_CLICK_MS} from '@/components/AdvanceAccountNumberDisplay/constants/constants';

interface AdvanceAccountNumberDisplayProps {
  accountNumber?: string;
  isLoading?: boolean;
  removeClipboardIcon?: boolean;
  removeEyeIcon?: boolean;
  variant?: TypographyVariant;
  fontWeight?: TypographyProps['fontWeight'];
}

const AdvanceAccountNumberDisplay: React.FC<
  AdvanceAccountNumberDisplayProps
> = ({
  accountNumber,
  isLoading,
  removeClipboardIcon,
  variant,
  removeEyeIcon,
  fontWeight,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  if (isLoading) {
    return <Skeleton width={100} height={28} />;
  }

  if (!accountNumber) {
    return (
      <Typography
        variant={variant ?? 'h2'}
        color={'secondary.main'}
        minWidth={100}
        sx={{
          alignItems: 'center',
          gap: '0.5rem',
          textWrap: 'nowrap',
        }}
      >
        N/A
      </Typography>
    );
  }

  return (
    <Typography
      variant={variant ?? 'h2'}
      color={'secondary.main'}
      fontWeight={fontWeight}
      sx={{
        alignItems: 'center',
        textWrap: 'nowrap',
      }}
    >
      {isRevealed
        ? formatFullAccountNumber(accountNumber)
        : formatAccountNumber(accountNumber)}
      {(!removeClipboardIcon || !isRevealed) && !removeEyeIcon && (
        <CopyIconButton
          valueToCopy={accountNumber}
          iconHeight={20}
          iconWidth={20}
          noHoverIconButton
          withReveal
          size='small'
          duration={HIDE_ACCOUNT_NUMBER_AFTER_CLICK_MS}
          externalReveal={{state: isRevealed, setState: setIsRevealed}}
        />
      )}
    </Typography>
  );
};
export default AdvanceAccountNumberDisplay;

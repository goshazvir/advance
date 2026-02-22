import React from 'react';

import {Skeleton, Typography, TypographyVariant} from '@mui/material';
import CopyIconButton from '@components/CopyIconButton/CopyIconButton';

interface AdvanceRoutingNumberDisplayProps {
  routingNumber?: string;
  isLoading?: boolean;
  removeClipboardIcon?: boolean;
  variant?: TypographyVariant;
}

const AdvanceRoutingNumberDisplay: React.FC<
  AdvanceRoutingNumberDisplayProps
> = ({routingNumber, isLoading, removeClipboardIcon, variant}) => {
  if (isLoading) {
    return <Skeleton width={100} height={28} />;
  }

  return (
    <Typography
      variant={variant ?? 'h2'}
      color={'secondary.main'}
      minWidth={150}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textWrap: 'nowrap',
      }}
    >
      {routingNumber ? (
        <>
          {routingNumber}
          {!removeClipboardIcon && (
            <CopyIconButton
              valueToCopy={routingNumber}
              iconHeight={20}
              iconWidth={20}
              size={'small'}
              noHoverIconButton
            />
          )}
        </>
      ) : (
        'N/A'
      )}
    </Typography>
  );
};

export default AdvanceRoutingNumberDisplay;

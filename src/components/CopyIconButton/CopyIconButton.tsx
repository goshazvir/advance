import React, {useEffect, useState} from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {copyToClipboard} from '@/utils/formatter.utils';
import {IconButton, IconButtonProps, useTheme} from '@mui/material';

interface CopyIconButtonProps extends IconButtonProps {
  valueToCopy: string | number | undefined;
  duration?: number;
  iconWidth?: number;
  iconHeight?: number;
  noHoverIconButton?: boolean;
  withReveal?: boolean;
  isLink?: boolean;
  externalReveal?: {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  valueToCopy,
  duration = 2000,
  iconWidth,
  iconHeight,
  noHoverIconButton = false,
  withReveal = false,
  isLink = false,
  externalReveal,
  ...rest
}) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [internalRevealed, setInternalRevealed] = useState(false);

  const isRevealed = externalReveal ? externalReveal.state : internalRevealed;
  const setIsRevealed = externalReveal
    ? externalReveal.setState
    : setInternalRevealed;

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), duration);
    return () => clearTimeout(timer);
  }, [copied, duration]);

  const handleCopy = () => {
    if (!valueToCopy) return;
    copyToClipboard(String(valueToCopy));
    setCopied(true);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => setIsRevealed(false), duration);
  };

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (withReveal && !isRevealed) {
      handleReveal();
    } else {
      handleCopy();
    }
  };

  const defaultIcon = isLink
    ? 'fluent--link-20-regular'
    : 'fluent--copy-20-regular';
  let iconName = defaultIcon;
  if (copied) {
    iconName = 'fluent--checkmark-20-regular';
  } else if (withReveal) {
    iconName = isRevealed ? defaultIcon : 'fluent--eye-20-regular';
  }

  return (
    <IconButton
      {...rest}
      onClick={onClickHandler}
      disableRipple={noHoverIconButton ? true : undefined}
      disableTouchRipple={noHoverIconButton ? true : undefined}
      disableFocusRipple={noHoverIconButton ? true : undefined}
      sx={{
        ...(noHoverIconButton && {
          '&:hover': {
            backgroundColor: 'transparent !important',
            opacity: '1 !important',
            transform: 'none !important',
            boxShadow: 'none !important',
          },
          '&:active': {backgroundColor: 'transparent !important'},
          '&:focus': {backgroundColor: 'transparent !important'},
          paddingY: '0 !important',
          transition: 'none !important',
        }),
        ...rest.sx,
      }}
    >
      <FlexxIcon
        icon={iconName}
        width={iconWidth}
        height={iconHeight}
        color={copied ? theme.palette.success.main : 'inherit'}
      />
    </IconButton>
  );
};

export default CopyIconButton;

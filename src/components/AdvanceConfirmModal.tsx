import React from 'react';

import {LoadingButton} from '@mui/lab';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {
  Backdrop,
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material';

interface AdvanceConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onCloseIconClick?: () => void;
  isLoading?: boolean;
  confirmButtonVariant?: ButtonProps['variant'];
  confirmButtonColor?: ButtonProps['color'];
  cancelButtonVariant?: ButtonProps['variant'];
  cancelButtonColor?: ButtonProps['color'];
  maxWidth?: DialogProps['maxWidth'];
  showCloseIcon?: boolean;
  disableBackdropClick?: boolean;
}

const StyledBackdrop = styled(Backdrop)({
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&.MuiBackdrop-root': {
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '&:not(.MuiBackdrop-invisible)': {
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    visibility: 'visible',
  },
});

export const AdvanceConfirmModal: React.FC<AdvanceConfirmModalProps> = ({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onCloseIconClick,
  isLoading = false,
  confirmButtonVariant = 'outlined',
  confirmButtonColor = 'primary',
  cancelButtonVariant = 'text',
  cancelButtonColor = 'inherit',
  maxWidth = 'xs',
  showCloseIcon = true,
}) => {
  const handleCloseIconClick = onCloseIconClick || onCancel;

  return (
    <Dialog
      open={open}
      onClose={handleCloseIconClick}
      maxWidth={maxWidth}
      fullWidth
      slots={{
        backdrop: StyledBackdrop,
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{position: 'relative'}}>
        {showCloseIcon && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              handleCloseIconClick();
            }}
            size='small'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <FlexxIcon
              width={20}
              height={20}
              icon='fluent--dismiss-24-regular'
            />
          </IconButton>
        )}
        <DialogTitle>{title}</DialogTitle>
      </Box>
      <DialogContent sx={{paddingTop: 0}}>
        <Typography variant='body1' color='text.secondary'>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            e.stopPropagation();
            onCancel();
          }}
          color={cancelButtonColor}
          variant={cancelButtonVariant}
        >
          {cancelText}
        </Button>

        {isLoading ? (
          <LoadingButton
            onClick={e => {
              e.stopPropagation();
              onConfirm();
            }}
            variant={confirmButtonVariant}
            color={confirmButtonColor}
            loading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </LoadingButton>
        ) : (
          <Button
            onClick={e => {
              e.stopPropagation();
              onConfirm();
            }}
            variant={confirmButtonVariant}
            color={confirmButtonColor}
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

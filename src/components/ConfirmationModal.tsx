import React from 'react';

import {LoadingButton} from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type ConfirmationModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title = 'Confirm Action',
  message = 'Are you sure you want to do this? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth='xs' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            e.stopPropagation();
            onCancel();
          }}
          color='inherit'
          variant='outlined'
        >
          {cancelText}
        </Button>

        {isLoading ? (
          <LoadingButton
            onClick={e => {
              e.stopPropagation();
              onConfirm();
            }}
            color='error'
            variant='contained'
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
            color='error'
            variant='contained'
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

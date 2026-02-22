import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {Box, Button, Dialog, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface FlexxValidationModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  disableClose?: boolean;
  isLoadingModal?: boolean;
  style?: React.CSSProperties;
}

const FlexxValidationModal: React.FC<FlexxValidationModalProps> = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  isLoading,
  confirmLabel,
  cancelLabel,
  disableClose,
  isLoadingModal,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        style={{
          minWidth: 500,
          minHeight: 200,
        }}
      >
        <Typography variant='body1'>{message}</Typography>
        {isLoadingModal && (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          display='flex'
          flexGrow={1}
          justifyContent='space-between'
          alignItems='end'
        >
          <Button onClick={onClose} disabled={isLoading}>
            {cancelLabel || 'Cancel'}
          </Button>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={isLoading || disableClose}
              endIcon={isLoading ? <CircularProgress size={20} /> : undefined}
            >
              {confirmLabel || 'Confirm'}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FlexxValidationModal;

import React from 'react';

import {Button} from '@mui/material';

interface ClearFiltersButtonProps {
  disabled?: boolean;
  onClearFilters: () => void;
}

const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  disabled,
  onClearFilters,
}) => {
  if (disabled) {
    return null;
  }

  return (
    <Button
      variant='text'
      color='error'
      disabled={disabled}
      onClick={onClearFilters}
    >
      Clear Filters
    </Button>
  );
};

export {ClearFiltersButton};

import React from 'react';

import {Stack, StackProps} from '@mui/material';
import {FilterChip} from '@components/AdvanceFilterChips/domain/filter-chip';
import AdvanceButtonChip from '@components/AdvanceFilterChips/AdvanceButtonChip';

interface AdvanceFilterChipListProps {
  activeChip?: string;
  chips: FilterChip[];
  onClickChip?: (chip: FilterChip) => void;
  isLoading?: boolean;
  isLoadingCount?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  containerProps?: StackProps;
}

const AdvanceFilterChipList: React.FC<AdvanceFilterChipListProps> = ({
  chips,
  activeChip,
  isLoading,
  isLoadingCount,
  onClickChip,
  isError = false,
  containerProps,
}) => {
  const handleChipClick = (chip: FilterChip) => () => {
    chip?.onClick?.();
    onClickChip?.(chip);
  };

  if (isError) {
    return null;
  }

  return (
    <Stack direction='row' gap='1rem' {...containerProps}>
      {chips.map(chip => (
        <AdvanceButtonChip
          key={chip.id}
          id={chip.id}
          isLoading={isLoading}
          isLoadingCount={isLoadingCount}
          label={chip.label}
          active={chip.id === activeChip}
          count={chip.count}
          disabled={chip.disabled}
          danger={chip.danger}
          shouldShowCount={chip.shouldShowCount}
          onClick={handleChipClick(chip)}
          shouldRender={chip.shouldRender ?? true}
        />
      ))}
    </Stack>
  );
};

export default AdvanceFilterChipList;

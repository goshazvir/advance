import type {FlexxFilterChipInterface} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';

import React, {useState} from 'react';

import {FilterAlt} from '@mui/icons-material';
import {Button, Menu, MenuItem} from '@mui/material';

interface AddFilterDropdownProps {
  disabled?: boolean;
  filterChips: Iterable<FlexxFilterChipInterface>;
  // eslint-disable-next-line
  onSelectFilter: (filter: {id: string; value?: any}) => void;
}

const AddFilterDropdown: React.FC<AddFilterDropdownProps> = ({
  disabled,
  filterChips,
  onSelectFilter,
}) => {
  const [isFiltersListOpen, setIsFiltersListOpen] =
    useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsFiltersListOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsFiltersListOpen(null);
  };

  return (
    <>
      <Button
        variant='text'
        startIcon={<FilterAlt />}
        disabled={disabled}
        onClick={handleClick}
        style={{border: '1px solid', borderColor: 'primary.main'}}
      >
        Add Filter
      </Button>
      <Menu
        anchorEl={isFiltersListOpen}
        open={Boolean(isFiltersListOpen)}
        onClose={handleClose}
      >
        {[...filterChips].map(filter => (
          <MenuItem
            key={filter.id}
            onClick={() => {
              onSelectFilter({id: filter.id});
              handleClose();
            }}
          >
            {filter.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export {AddFilterDropdown};

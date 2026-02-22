'use client';
import {useDebounce} from 'use-debounce';
import React, {useEffect, useState} from 'react';

import FlexxIcon from '@/components/FlexxIcon/FlexxIcon';
import {Box, IconButton, InputAdornment} from '@mui/material';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';

interface FlexxTableSearchBarProps {
  searchTerm: string;
  onChangeSearchTerm: (searchTerm: string) => void;
  placeholder?: string;
}

const FlexxTableSearchBar: React.FC<FlexxTableSearchBarProps> = ({
  searchTerm,
  onChangeSearchTerm,
  placeholder,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm] = useDebounce(localSearchTerm, 300);

  // Sync local state with prop when it changes externally
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Update parent when debounced value changes
  useEffect(() => {
    onChangeSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setLocalSearchTerm(value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onChangeSearchTerm('');
  };

  return (
    <Box sx={{paddingBottom: 1}}>
      <FlexxTextField
        testID='table-search'
        name='table-search'
        placeholder={placeholder ?? 'Search'}
        value={localSearchTerm}
        onChange={handleChange}
        fullWidth
        variant={'standard'}
        startAdornment={
          <InputAdornment position='start' sx={{marginBottom: 1}}>
            <FlexxIcon icon='fluent--search-16-regular' />
          </InputAdornment>
        }
        endAdornment={
          localSearchTerm && (
            <InputAdornment position='end'>
              <IconButton onClick={handleClearSearch} size='small'>
                <FlexxIcon icon='fluent--dismiss-16-regular' />
              </IconButton>
            </InputAdornment>
          )
        }
        size='small'
        style={{borderRadius: '3rem'}}
        margin='none'
      />
    </Box>
  );
};

export default FlexxTableSearchBar;

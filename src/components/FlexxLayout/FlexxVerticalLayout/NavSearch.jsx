'use client';
import {useDebounce} from 'use-debounce';
import React, {useEffect, useState} from 'react';

import {usePathname} from 'next/navigation';
import {IconButton, InputAdornment} from '@mui/material';
import FlexxIcon from '@/components/FlexxIcon/FlexxIcon';
import {useGlobalSearch} from '@/@core/hooks/useGlobalSearch';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';

const NavSearch = () => {
  const pathname = usePathname();

  const {searchQuery, updateSearchQuery} = useGlobalSearch();

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(localSearchTerm, 500);

  useEffect(() => {
    setLocalSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    updateSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = e => {
    const {value} = e.target;
    setLocalSearchTerm(value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    updateSearchQuery('');
  };

  useEffect(() => {
    handleClearSearch();
  }, [pathname]);

  if (pathname === '/home') return null;

  return (
    <FlexxTextField
      testID='navbar-search'
      placeholder='Search'
      value={localSearchTerm}
      onChange={handleChange}
      fullWidth
      startAdornment={
        <InputAdornment position='start'>
          <FlexxIcon icon='fluent--search-16-regular' />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position='end'>
          <IconButton onClick={handleClearSearch}>
            <FlexxIcon icon='fluent--dismiss-16-regular' />
          </IconButton>
        </InputAdornment>
      }
      size='small'
      style={{borderRadius: '3rem'}}
      margin='none'
    />
  );
};

export default NavSearch;

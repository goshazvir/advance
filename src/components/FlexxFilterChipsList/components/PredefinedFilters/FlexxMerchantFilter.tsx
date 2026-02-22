import React from 'react';

import {
  FlexxListFilterChip,
  FlexxListFilterChipProps,
} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxListFilters';

const mockMerchantList = [
  {id: '1', label: 'Merchant 1'},
  {id: '2', label: 'Merchant 2'},
  {id: '3', label: 'Merchant 3'},
  {id: '4', label: 'Merchant 4'},
  {id: '5', label: 'Merchant 5'},
];

const FlexxMerchantFilter: React.FC<FlexxListFilterChipProps> = props => {
  return <FlexxListFilterChip {...props} listItems={mockMerchantList} />;
};

export {FlexxMerchantFilter};

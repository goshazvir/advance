import React from 'react';

import {
  FlexxListFilterChip,
  FlexxListFilterChipProps,
} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxListFilters';

//TODO: Replace mockMerchantList with actual method list
const mockMethodList = [
  {id: 'ACH-fitlerID', label: 'ACH'},
  {id: 'WireTransfer-fitlerID', label: 'Wire Transfer'},
  {id: 'CreditCard-fitlerID', label: 'Credit Card'},
  {id: 'DebitCard-fitlerID', label: 'Debit Card'},
];

const FlexxMethodFilter: React.FC<FlexxListFilterChipProps> = props => {
  return <FlexxListFilterChip {...props} listItems={mockMethodList} />;
};

export {FlexxMethodFilter};

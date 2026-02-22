/* eslint-disable */
import React, {JSX} from 'react';

import Chip from '@mui/material/Chip';
import {FlexxDateFilterChip} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxDateFilter';
import {FlexxRangeFilterChip} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxRangeFilter';
import {FlexxMerchantFilter} from '@components/FlexxFilterChipsList/components/PredefinedFilters/FlexxMerchantFilter';
import {FlexxMethodFilter} from '@components/FlexxFilterChipsList/components/PredefinedFilters/FlexxPaymentMethodFilter';
import {
  FlexxFilterChipInterface,
  FlexxFilterType,
  PredefinedFlexxFilterId,
} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';

interface FlexxFilterChipProps {
  filter: FlexxFilterChipInterface;
  value?: any;
  onUpdateFilter: (args: {id: string; value: any}) => void;
  onClickDismissFilter: (filterId: string) => void;
}

const FlexxFilterChip: React.FC<FlexxFilterChipProps> = ({
  filter,
  value,
  onUpdateFilter,
  onClickDismissFilter,
}) => {
  if (filter.id) {
    const Filter = FlexxFilters[filter.filterType.type];

    if (Filter) {
      return (
        <div style={{marginLeft: '8px'}}>
          <Filter
            filter={filter}
            value={value}
            onUpdateFilter={onUpdateFilter}
            onClickDismissFilter={onClickDismissFilter}
          />
        </div>
      );
    }
  }

  return null;
};

const FlexxFilters: Record<
  PredefinedFlexxFilterId | FlexxFilterType,
  (props: any) => JSX.Element
> = {
  [PredefinedFlexxFilterId.METHOD]: props => <FlexxMethodFilter {...props} />,
  [PredefinedFlexxFilterId.MERCHANT]: props => (
    <FlexxMerchantFilter {...props} />
  ),
  [PredefinedFlexxFilterId.CARRIER]: props => (
    <Chip label={props.filter?.label} />
  ),
  [PredefinedFlexxFilterId.INSURED]: props => (
    <Chip label={props.filter?.label} />
  ),
  [FlexxFilterType.LIST_FILTER]: props => <Chip label={props.filter?.label} />,
  [FlexxFilterType.DATE_FILTER]: props => <FlexxDateFilterChip {...props} />,
  [FlexxFilterType.RANGE_FILTER]: props => <FlexxRangeFilterChip {...props} />,
};

export {FlexxFilterChip};
export type {FlexxFilterChipProps};

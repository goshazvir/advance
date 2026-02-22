import React, {useState} from 'react';

import {useFlexxFilters} from '@components/FlexxFilterChipsList/useFlexxFilters';
import {FlexxFilterChip} from '@components/FlexxFilterChipsList/FlexxFilterChip';
import {AddFilterDropdown} from '@components/FlexxFilterChipsList/components/AddFilterDropDown';
import {ClearFiltersButton} from '@components/FlexxFilterChipsList/components/ClearFiltersButton';
import {type FlexxFilterChipInterface} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';

interface FlexxFilterChipsListProps {
  allFilters: FlexxFilterChipInterface[];
}

const FlexxFilterChipsList: React.FC<FlexxFilterChipsListProps> = ({
  allFilters,
}) => {
  const {selectedFilters, updateFilter, clearFilters, deleteFilter} =
    useFlexxFilters();

  const [filterOrder, setFilterOrder] = useState<string[]>(
    Object.keys(selectedFilters),
  );

  const remainingFilters = allFilters.filter(
    filter => !selectedFilters[filter.id],
  );

  // eslint-disable-next-line
  const onAddFilter = (filter: {id: string; value?: any}) => {
    if (!filterOrder.includes(filter.id)) {
      setFilterOrder([...filterOrder, filter.id]);
    }

    updateFilter(filter);
  };

  const onClearFilters = () => {
    setFilterOrder([]);
    clearFilters();
  };

  const handleDeleteFilter = (filterId: string) => {
    setFilterOrder(filterOrder.filter(id => id !== filterId));
    deleteFilter(filterId);
  };

  const sortedFilters = filterOrder
    .map(id => allFilters.find(filter => filter.id === id))
    .filter(Boolean) as FlexxFilterChipInterface[];

  return (
    <div style={{display: 'flex', alignItems: 'end'}}>
      <AddFilterDropdown
        disabled={!remainingFilters.length}
        filterChips={remainingFilters}
        onSelectFilter={onAddFilter}
      />
      {sortedFilters.map(filter => (
        <FlexxFilterChip
          key={filter.id}
          filter={filter}
          value={selectedFilters[filter.id]}
          onUpdateFilter={updateFilter}
          onClickDismissFilter={() => handleDeleteFilter(filter.id)}
        />
      ))}
      <div style={{marginLeft: 'auto'}}>
        <ClearFiltersButton
          onClearFilters={onClearFilters}
          disabled={!Object.keys(selectedFilters).length}
        />
      </div>
    </div>
  );
};

export {FlexxFilterChipsList};

import React, {useMemo, useState} from 'react';

import {Checkbox, MenuItem} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FlexxFilterChipProps} from '@components/FlexxFilterChipsList/FlexxFilterChip';
import {ListFilterType} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';
import {FlexxFilterButtonContainer} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxFilterButtonContainer';

interface FlexxListFilterChipProps extends FlexxFilterChipProps {
  listItems?: {id: string; label: string}[];
  filter: {id: string; label: string; filterType: ListFilterType};
  value: {ids: string[]};
}

const FlexxListFilterChip: React.FC<FlexxListFilterChipProps> = ({
  filter,
  onUpdateFilter,
  onClickDismissFilter,
  value,
  listItems,
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(
    new Set(value?.ids ?? []),
  );

  const formattedLabel = useMemo(() => {
    return `${filter.label} (${selectedEntries.size})`;
  }, [selectedEntries]);

  const listItemsToRender: {id: string; label: string}[] =
    filter.filterType?.listItems ?? listItems;

  const onClickEntry = (id: string) => {
    setSelectedEntries(prevSelectedEntries => {
      if (prevSelectedEntries.has(id)) {
        prevSelectedEntries.delete(id);
      } else {
        prevSelectedEntries.add(id);
      }

      return new Set(prevSelectedEntries);
    });

    onUpdateFilter({
      id: filter.id,
      value: {
        ids: Array.from(selectedEntries),
      },
    });
  };

  return (
    <FlexxFilterButtonContainer
      filterId={filter.id}
      label={formattedLabel}
      onClickDismissFilter={onClickDismissFilter}
    >
      {listItemsToRender.map(({id, label}) => (
        <MenuItem
          key={id}
          onClick={() => onClickEntry(id)}
          style={{display: 'flex'}}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedEntries.has(id)}
                onChange={() => onClickEntry(id)}
              />
            }
            label={label}
          />
        </MenuItem>
      ))}
    </FlexxFilterButtonContainer>
  );
};

export {FlexxListFilterChip};
export type {FlexxListFilterChipProps};

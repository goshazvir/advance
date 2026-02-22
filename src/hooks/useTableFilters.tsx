import {useEffect, useMemo, useState} from 'react';

import {
  ChipConfig,
  FilterChip,
} from '@/components/AdvanceFilterChips/domain/filter-chip';

export interface UseTableFiltersProps<T> {
  filters: T[];
  isAllSelected?: boolean;
  handleFilterChipClick: (id: T | string, isAll: boolean) => () => void;
  chipConfigMap: Record<string, ChipConfig<T>>;
  customAllFilterId?: string;
  multiSelect?: boolean;
  defaultChips?: (T | string)[];
  disableIfActive?: boolean;
}

export interface TableFiltersResult<T> {
  activeChips: (T | string)[];
  setActiveChips: (chips: (T | string)[]) => void;
  tableFilterChips: FilterChip[];
  handleClickFilter: (chip: FilterChip) => void;
}

export const useTableFilters = <T,>({
  isAllSelected,
  handleFilterChipClick,
  chipConfigMap,
  customAllFilterId = 'ALL',
  multiSelect = true,
  defaultChips = [],
  disableIfActive,
}: UseTableFiltersProps<T>): TableFiltersResult<T> => {
  const [activeChips, setActiveChips] = useState<(T | string)[]>(
    defaultChips || [customAllFilterId],
  );

  useEffect(() => {
    if (isAllSelected && !activeChips.includes(customAllFilterId)) {
      setActiveChips([customAllFilterId]);
    }
  }, [isAllSelected, activeChips, customAllFilterId]);

  const handleClickFilter = (chip: FilterChip) => {
    setActiveChips(prev => {
      if (disableIfActive && prev.includes(chip.id)) {
        const filteredChips = prev.filter(id => id !== chip.id);
        return filteredChips.length === 0 ? [customAllFilterId] : filteredChips;
      }

      if (chip.id === customAllFilterId) {
        return [customAllFilterId];
      }

      if (!multiSelect) {
        return [chip.id as T];
      }

      const filtered = prev.filter(id => id !== customAllFilterId);
      const isAlreadySelected = filtered.includes(chip.id as T);

      const updated = isAlreadySelected
        ? filtered.filter(id => id !== chip.id)
        : [...filtered, chip.id as T];

      return updated.length === 0 ? [customAllFilterId] : updated;
    });
  };

  const tableFilterChips: FilterChip[] = useMemo(
    () =>
      Object.values(chipConfigMap).map(({id, label}) => {
        const isAll = id === customAllFilterId;
        return {
          id: String(id),
          label,
          onClick: handleFilterChipClick(id, isAll),
        };
      }),
    [handleFilterChipClick, chipConfigMap, customAllFilterId],
  );

  return {
    activeChips,
    setActiveChips,
    tableFilterChips,
    handleClickFilter,
  };
};

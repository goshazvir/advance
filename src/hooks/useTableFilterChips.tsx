import {useCallback, useState} from 'react';

export interface UseTableFilterChipsProps<T> {
  allFilters: T[];
  multiSelect?: boolean;
}

export interface TableFilterChipsResult<T> {
  filters: T[];
  handleFilterChipClick: (id: T | string, isAll?: boolean) => () => void;
  isAllSelected: boolean;
}

export const useTableFilterChips = <T,>({
  allFilters,
  multiSelect = true,
}: UseTableFilterChipsProps<T>): TableFilterChipsResult<T> => {
  const [filters, setFilters] = useState<T[]>(allFilters);

  const isAllSelected = filters.length === allFilters.length;

  const handleFilterChipClick = useCallback(
    (id: T | string, isAll?: boolean) => () => {
      if (isAll) {
        setFilters(allFilters);
        return;
      }

      if (!multiSelect) {
        setFilters([id as T]);
        return;
      }

      const typedId = id as T;

      setFilters(prev => {
        const isAllActive = prev.length === allFilters.length;
        const isAlreadySelected = prev.includes(typedId);

        if (isAllActive && isAlreadySelected) {
          return [typedId];
        }

        if (isAlreadySelected) {
          const next = prev.filter(f => f !== typedId);
          return next.length === 0 ? allFilters : next;
        }

        const next = [...prev, typedId];
        const unique = Array.from(new Set(next));
        return unique.length === allFilters.length ? allFilters : unique;
      });
    },
    [allFilters],
  );

  return {
    filters,
    handleFilterChipClick,
    isAllSelected,
  };
};
export default useTableFilterChips;

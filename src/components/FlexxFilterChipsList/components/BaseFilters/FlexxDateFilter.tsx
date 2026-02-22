import dayjs from 'dayjs';
import {useDebounce} from 'use-debounce';
import React, {useEffect, useMemo, useState} from 'react';

import {formatDate} from '@/utils/formatter.utils';
import {FlexxFilterChipProps} from '@components/FlexxFilterChipsList/FlexxFilterChip';
import AdvanceBaseDatePicker from '@components/AdvanceDatePickers/AdvanceBaseDatePicker';
import {DateFilterType} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';
import {FlexxFilterButtonContainer} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxFilterButtonContainer';

const DEBOUNCE_TIME = 200;

interface FlexxDateFilterChipProps extends FlexxFilterChipProps {
  filter: {id: string; label: string; filterType: DateFilterType};
}

const FlexxDateFilterChip: React.FC<FlexxDateFilterChipProps> = ({
  filter,
  onUpdateFilter,
  onClickDismissFilter,
  value,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    value?.minDate || null,
  );

  const [endDate, setEndDate] = useState<Date | null>(value?.maxDate || null);

  const [debouncedMin] = useDebounce(startDate, DEBOUNCE_TIME);
  const [debouncedMax] = useDebounce(endDate, DEBOUNCE_TIME);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedMin !== null && debouncedMax !== null) {
      if (debouncedMin > debouncedMax) {
        setError('The minimal date must be before the maximal date');
      } else {
        setError(null);
      }
    }

    onUpdateFilter({
      id: filter.id,
      value: {
        minDate: debouncedMin || null,
        maxDate: debouncedMax || null,
      },
    });
  }, [debouncedMin, debouncedMax]);

  const handleMinDateChange = (newMinDate: Date | null) => {
    setStartDate(newMinDate);
  };

  const handleMaxDateChange = (newMaxDate: Date | null) => {
    setEndDate(newMaxDate);
  };

  const formattedLabel = useMemo(() => {
    const formattedMinDate = startDate ? formatDate(startDate, 'sm') : '';

    const formattedMaxDate = endDate ? formatDate(endDate, 'sm') : '';

    if (startDate && endDate) {
      return `${formattedMinDate} - ${formattedMaxDate}`;
    } else if (startDate) {
      return `From ${formattedMinDate}`;
    } else if (endDate) {
      return `Until ${formattedMaxDate}`;
    }

    return filter.label;
  }, [startDate, endDate]);

  const minDate = filter.filterType.range?.minDate;
  const maxDate = filter.filterType.range?.maxDate;

  return (
    <FlexxFilterButtonContainer
      filterId={filter.id}
      label={formattedLabel}
      error={error}
      onClickDismissFilter={onClickDismissFilter}
    >
      <AdvanceBaseDatePicker
        label='Start Date'
        minDate={minDate ? dayjs(minDate) : undefined}
        value={startDate ? dayjs(startDate) : null}
        onChange={newValue => handleMinDateChange(newValue?.toDate?.() || null)}
      />
      <AdvanceBaseDatePicker
        label='End Date'
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        value={endDate ? dayjs(endDate) : null}
        onChange={newValue => handleMaxDateChange(newValue?.toDate?.() || null)}
      />
    </FlexxFilterButtonContainer>
  );
};

export {FlexxDateFilterChip};
export type {FlexxDateFilterChipProps};

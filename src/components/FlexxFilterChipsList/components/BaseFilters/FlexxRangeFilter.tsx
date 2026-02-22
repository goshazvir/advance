import {useDebounce} from 'use-debounce';
import React, {useEffect, useMemo, useState} from 'react';

import {formatCurrency} from '@/utils/formatter.utils';
import {FormControl, InputAdornment, ListItem, TextField} from '@mui/material';
import {FlexxFilterChipProps} from '@components/FlexxFilterChipsList/FlexxFilterChip';
import {RangeFilterType} from '@components/FlexxFilterChipsList/domain/FlexxFilterChipInterface';
import FlexxFormattedNumberInput from '@components/FlexxCustomTextInputs/FlexxFormattedNumberInput';
import {FlexxFilterButtonContainer} from '@components/FlexxFilterChipsList/components/BaseFilters/FlexxFilterButtonContainer';

const DEBOUNCE_TIME = 250;

interface FlexxRangeFilterChipProps extends FlexxFilterChipProps {
  filter: {id: string; label: string; filterType: RangeFilterType};
}

const FlexxRangeFilterChip: React.FC<FlexxRangeFilterChipProps> = ({
  filter,
  onUpdateFilter,
  onClickDismissFilter,
  value,
}) => {
  const {label} = filter;
  const [min, setMin] = useState(value?.min);
  const [max, setMax] = useState(value?.max);
  const [debouncedMin] = useDebounce(min, DEBOUNCE_TIME);
  const [debouncedMax] = useDebounce(max, DEBOUNCE_TIME);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedMin !== undefined && debouncedMax !== undefined) {
      if (debouncedMin > debouncedMax) {
        setError('The minimum value must be less than the maximum value');
      } else {
        setError(null);
      }
    }

    onUpdateFilter({
      id: filter.id,
      value: {min: debouncedMin, max: debouncedMax},
    });
  }, [debouncedMin, debouncedMax, onUpdateFilter, filter.id]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(event.target.value));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(event.target.value));
  };

  const formatAmount = (amount: number) => {
    return formatCurrency({
      currency: filter.filterType?.currency,
      amount,
      showCents: false,
    });
  };

  const formattedMin = formatAmount(min);
  const formattedMax = formatAmount(max);

  const formatLabel = useMemo(() => {
    if (min !== undefined && max !== undefined) {
      return `${formattedMin} - ${formattedMax}`;
    }

    if (min !== undefined) {
      return `≥ ${formattedMin}`;
    }

    if (max !== undefined) {
      return `≤ ${formattedMax}`;
    }

    return label;
  }, [min, max]);

  const startAdornment = useMemo(() => {
    return <InputAdornment position='start'>$</InputAdornment>;
  }, []);

  return (
    <FlexxFilterButtonContainer
      filterId={filter.id}
      label={formatLabel}
      error={error}
      onClickDismissFilter={onClickDismissFilter}
    >
      <ListItem>
        <FormControl>
          <TextField
            label='At least'
            InputProps={{
              startAdornment,
              // eslint-disable-next-line
              inputComponent: FlexxFormattedNumberInput as any,
            }}
            value={min}
            onChange={handleMinChange}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <TextField
            label='At most'
            InputProps={{
              startAdornment,
              // eslint-disable-next-line
              inputComponent: FlexxFormattedNumberInput as any,
            }}
            value={max}
            onChange={handleMaxChange}
          />
        </FormControl>
      </ListItem>
    </FlexxFilterButtonContainer>
  );
};

export {FlexxRangeFilterChip};

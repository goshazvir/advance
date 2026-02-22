import React from 'react';

import {Button, Skeleton} from '@mui/material';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {COUNT_THRESHOLD} from '@/utils/enviroment.utils';
import {FilterChip} from '@components/AdvanceFilterChips/domain/filter-chip';

interface AdvanceFilterChipProps extends FilterChip {
  active: boolean;
  isLoading?: boolean;
  isLoadingCount?: boolean;
  startIcon?: string;
  dismissible?: boolean;
  activeColor?: 'primary' | 'secondary';
}

const AdvanceButtonChip: React.FC<AdvanceFilterChipProps> = ({
  id,
  label,
  active,
  onClick,
  isLoading,
  isLoadingCount,
  disabled,
  count,
  danger,
  shouldShowCount = true,
  shouldRender = true,
  startIcon,
  dismissible,
  activeColor = 'secondary',
}) => {
  const showCount = (shouldShowCount && count !== undefined) || isLoadingCount;
  const showDanger = danger && count;

  if (!shouldRender) {
    return null;
  }

  if (isLoading) {
    return (
      <Skeleton
        variant={'rectangular'}
        style={{
          borderRadius: '0.8rem',
        }}
        height={'1.3rem'}
        width={`${label.length / 1.3}rem`}
      />
    );
  }

  const countText = () => {
    if (isLoadingCount) {
      return (
        <Skeleton
          variant='rounded'
          width={24}
          height={20}
          sx={{ml: 1, borderRadius: 4}}
        />
      );
    }
    if ((count || 0) > COUNT_THRESHOLD) {
      return `${COUNT_THRESHOLD}+`;
    }
    return count;
  };

  return (
    <Button
      onClick={onClick}
      variant={active ? 'contained' : 'outlined'}
      color={active ? activeColor : 'primary'}
      disabled={disabled}
      size='small'
      className='space-x-1'
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        height: '1.5rem',
        padding: '0.5rem 1rem',
        minWidth: 0,
        maxWidth: '100%',
        borderRadius: '0.8rem',
      }}
    >
      {startIcon ? <FlexxIcon icon={startIcon} /> : null}
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
          maxWidth: '100%',
          display: 'inline-block',
        }}
      >
        {label}
      </span>
      {showCount && (
        <span
          style={{
            flexShrink: 0,
            marginLeft: 10,
            color: showDanger ? 'white' : undefined,
            borderRadius: 10,
            padding: showDanger ? '0 0.25rem' : 0,
            backgroundColor: showDanger
              ? 'var(--mui-palette-error-main)'
              : undefined,
          }}
        >
          {countText()}
        </span>
      )}
      {dismissible ? (
        <span
          style={{
            marginLeft: 10,
          }}
        >
          <FlexxIcon icon={'fluent--dismiss-12-regular'} />
        </span>
      ) : null}
    </Button>
  );
};

export default AdvanceButtonChip;

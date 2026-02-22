import React from 'react';

import {Stack, Typography} from '@mui/material';
import {formatDate} from '@/utils/formatter.utils';
import {Alignment, FlexxColumn} from '@components/FlexxTable/domain/FlexxTable';
import AdvanceCurrencyText from '@components/AdvanceCurrencyText/AdvanceCurrencyText';
import AdvancePercentageText from '@components/AdvancePercentageText/AdvancePercentageText';

const parseCellContent = ({
  value,
  column,
  shouldDisplayDate,
  isDateColumn,
}: {
  value:
    | string
    | number
    | React.JSX.Element
    | null
    | undefined
    | Array<string | number | React.JSX.Element | null | undefined>;
  column: FlexxColumn;
  shouldDisplayDate: boolean;
  isDateColumn: boolean;
}) => {
  let cellContent: React.ReactNode;
  const getAlignment = (align?: Alignment) => {
    switch (align) {
      case 'right':
        return 'flex-end';
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      default:
        return 'inherit';
    }
  };

  if (Array.isArray(value)) {
    cellContent = (
      <Stack
        gap={'2rem'}
        alignItems={getAlignment(column.align)}
        sx={{textOverflow: 'ellipsis', textWrap: 'nowrap'}}
      >
        {value.map((el, index) => (
          <Stack key={(el ?? 0).toString() + index}>
            {parseCellContent({
              value: el,
              column,
              shouldDisplayDate,
              isDateColumn,
            })}
          </Stack>
        ))}
      </Stack>
    );
  } else if (!value) {
    cellContent =
      column.emptyField || column.isSpacer ? (
        ''
      ) : (
        <Typography color={'text.secondary'} variant={'subtitle1'}>
          N/A
        </Typography>
      );
  } else if (typeof value !== 'object' && column.currency) {
    cellContent = (
      <AdvanceCurrencyText
        amount={value}
        align={column.align ? column.align : 'flex-end'}
        showCents={Number(value) < 1000000 && column.showCents}
      />
    );
  } else if (typeof value !== 'object' && column.percentage) {
    cellContent = <AdvancePercentageText amount={value} align='flex-end' />;
  } else if (isDateColumn) {
    cellContent = shouldDisplayDate
      ? formatDate(value as number, column.dateFormat!)
      : '';
  } else {
    cellContent = value;
  }

  return cellContent;
};

export {parseCellContent};

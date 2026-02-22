import React, {FC, useMemo} from 'react';

import {formatDate} from '@/utils/formatter.utils';
import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {PARAGRAPH_TEXT_FONT_SIZE} from '@/constants/font-sizes';
import EllipsisText from '@/components/FlexxTable/components/EllipsisText';
import {parseCellContent} from '@components/FlexxTable/utils/flexxTableCell.utils';
import FlexxTableSkeletonBody from '@components/FlexxTable/components/FlexxTableSkeletonBody';
import {
  cellColors,
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';
import {
  Collapse,
  Stack,
  TableCell,
  TableCellProps,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

interface FlexxTableBodyProps {
  rows: FlexxTableRow[];
  columns: FlexxColumn[];
  align?: TableCellProps['align'];
  cellPadding?: string;
  columnWidths: number[];
  isError?: boolean;
  isLoading?: boolean;
  processedColumns: FlexxColumn[];
  skeletonRows?: number;
  emptyState?: string;
  dataTestId?: string;
  noWrap?: boolean;
  maxLinesWrap?: number;
}

const FlexxTableBody: FC<FlexxTableBodyProps> = ({
  rows,
  columns,
  align,
  columnWidths,
  isError,
  isLoading,
  processedColumns,
  skeletonRows,
  emptyState,
  dataTestId,
  noWrap,
  maxLinesWrap,
  cellPadding,
}) => {
  const {palette} = useTheme();

  const dateDisplayMap = useMemo(() => {
    const map = new Map<
      FlexxColumn,
      {display: boolean; groupStart: boolean; groupEnd: boolean}[]
    >();

    columns.forEach(column => {
      if (!column.dateFormat) return;

      const displayInfo: {
        display: boolean;
        groupStart: boolean;
        groupEnd: boolean;
      }[] = [];
      let previousFormattedDate: string | null = null;

      rows.forEach((row, rowIndex) => {
        const value = row.data[column.field];
        const formattedDate = value
          ? formatDate(value as number, column.dateFormat!)
          : null;
        const isFirstRow = rowIndex === 0;
        const hasDateChanged = formattedDate !== previousFormattedDate;

        if (isFirstRow || hasDateChanged) {
          if (!isFirstRow) {
            displayInfo[rowIndex - 1].groupEnd = true;
          }
          displayInfo.push({
            display: true,
            groupStart: true,
            groupEnd: false,
          });
        } else {
          displayInfo.push({
            display: false,
            groupStart: false,
            groupEnd: false,
          });
        }
        previousFormattedDate = formattedDate;
      });

      if (rows.length > 0) {
        displayInfo[rows.length - 1].groupEnd = true;
      }
      map.set(column, displayInfo);
    });

    return map;
  }, [columns, rows]);

  if (isLoading) {
    return (
      <FlexxTableSkeletonBody
        columns={processedColumns}
        numberOfRows={skeletonRows}
        cellPadding={cellPadding}
      />
    );
  }

  if (isError) {
    return (
      <TableRow data-testid={`${dataTestId}.errorState`}>
        <TableCell colSpan={processedColumns.length}>
          <Typography>Error loading table data</Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (rows.length === 0) {
    return (
      <TableRow data-testid={`${dataTestId}.emptyState`}>
        <TableCell colSpan={columns.length}>
          <Stack width='100%' gap={2} alignItems='center'>
            <FlexxIcon
              icon='fluent--info-32-regular'
              width={32}
              height={32}
              color={palette.secondary.main}
            />
            <Typography variant='h2' color={'secondary.main'}>
              {emptyState ?? 'No data available'}
            </Typography>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rows.map((row, rowIndex) => {
        const rowStyle = {
          cursor: row.onClick ? 'pointer' : 'default',
          ...((row.collapsible?.open || row.selected) && {
            backgroundColor: 'var(--mui-palette-action-hover)',
          }),
        };

        return (
          <React.Fragment key={`${rowIndex}-fragment`}>
            <TableRow
              data-testid={`${dataTestId}.row.${rowIndex}`}
              onClick={row.onClick}
              hover={!!row.onClick}
              style={rowStyle}
              selected={row.collapsible?.open || row.selected}
              className='flexx-table-row'
            >
              {columns.map((column, colIndex) => {
                const value = row.data[column.field];
                const theme =
                  column.decorator && typeof value === 'string'
                    ? column.decorator(value)
                    : undefined;
                const isDateColumn = !!column.dateFormat;
                const displayInfo = isDateColumn
                  ? dateDisplayMap.get(column)?.[rowIndex]
                  : undefined;
                const isFirstColumn = colIndex === 0;
                const shouldDisplayDate = isDateColumn
                  ? (displayInfo?.display || !isFirstColumn) ?? true
                  : true;

                const cellSx =
                  isDateColumn && isFirstColumn && value
                    ? {
                        borderBottom: displayInfo?.groupEnd ? '' : 'none',
                        '& .date-cell-content': {
                          visibility: shouldDisplayDate ? 'visible' : 'hidden',
                        },
                        '.flexx-table-row:hover & .date-cell-content': {
                          visibility: 'visible',
                        },
                      }
                    : {};

                const cellContent = parseCellContent({
                  value,
                  column,
                  isDateColumn,
                  shouldDisplayDate: true,
                });

                const cellStyles: React.CSSProperties = {
                  width: column.currency
                    ? 'fit-content'
                    : columnWidths[colIndex] || column.style?.width,
                  maxWidth: column.currency
                    ? undefined
                    : columnWidths[colIndex],
                  overflow: 'hidden',
                  fontWeight: column.style?.bold ? 'bold' : 'normal',
                  color: cellColors[theme || 'default'],
                  padding: column.style?.padding,
                  margin: column.style?.margin,
                  paddingLeft: column.currency ? '24px' : undefined,
                  fontSize: PARAGRAPH_TEXT_FONT_SIZE,
                  alignContent: column.style?.alignContent,
                };

                const wrappedContent =
                  isDateColumn && isFirstColumn ? (
                    <span className='date-cell-content'>{cellContent}</span>
                  ) : (
                    cellContent
                  );

                return (
                  <TableCell
                    data-testid={`${dataTestId}.${column.field}.${rowIndex}`}
                    key={column.field}
                    align={column.align ?? align}
                    style={cellStyles}
                    sx={{padding: cellPadding, ...cellSx}}
                  >
                    {noWrap &&
                    typeof cellContent === 'string' &&
                    !(isDateColumn && isFirstColumn) ? (
                      <EllipsisText
                        text={cellContent}
                        maxLines={maxLinesWrap}
                      />
                    ) : (
                      wrappedContent
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell
                style={{padding: 0, borderBottom: 0}}
                colSpan={columns.length}
              >
                <Collapse in={row.collapsible?.open} timeout='auto'>
                  {row.collapsible?.content?.(columnWidths)}
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FlexxTableBody;

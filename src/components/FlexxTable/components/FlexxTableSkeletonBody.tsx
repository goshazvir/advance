import {FC} from 'react';

import {Skeleton, TableCell, TableRow} from '@mui/material';
import {FlexxColumn} from '@components/FlexxTable/domain/FlexxTable';

const FlexxTableSkeletonBody: FC<{
  columns: FlexxColumn[];
  numberOfRows?: number;
  cellPadding?: string;
}> = ({columns, numberOfRows = 25, cellPadding}) => (
  <>
    {Array.from({length: numberOfRows}).map((_, index) => (
      <TableRow key={`skeleton-row-${index}`}>
        {columns.map(column => (
          <TableCell
            key={column.field}
            style={{
              width: column.style?.width,
              padding: cellPadding,
              paddingLeft: column.currency ? '24px' : undefined,
            }}
            align={column.align}
          >
            {!column.isSpacer ? <Skeleton variant='text' /> : null}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export default FlexxTableSkeletonBody;

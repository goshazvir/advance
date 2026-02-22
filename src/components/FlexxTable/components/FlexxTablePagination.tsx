import React, {FC} from 'react';

import isPropValid from '@emotion/is-prop-valid';
import {Skeleton, Stack, TablePagination} from '@mui/material';
import {styled} from '@mui/material/styles';
import FlexxTableActionsComponent from '@components/FlexxTable/FlexxTableActionsComponent/FlexxTableActionsComponent';

// MUI's styled system uses rootShouldForwardProp which leaks CSS props
// (like borderRadius) to DOM elements. This styled div uses emotion's
// is-prop-valid to properly filter all non-HTML props.
const TablePaginationRoot = styled('div', {
  shouldForwardProp: prop => isPropValid(prop as string),
})({});

const FlexxTablePaginationSkeleton: React.FC = () => (
  <Skeleton width={400} style={{marginLeft: 'auto'}} height={52} />
);

interface FlexxTablePaginationProps {
  disablePagination?: boolean;
  isLoading?: boolean;
  labelRowsPerPage?: string;
  rowsCount: number;
  rowsPerPage: number;
  currentPage: number;
  rowsPerPageOptions: number[];
  handlePageChange: (event: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  totalItems?: number;
}

const FlexxTablePagination: FC<FlexxTablePaginationProps> = ({
  isLoading,
  rowsCount,
  rowsPerPage,
  currentPage,
  rowsPerPageOptions,
  labelRowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  dataTestId,
  totalItems,
}) => {
  if (isLoading) {
    return <FlexxTablePaginationSkeleton />;
  }

  return (
    <Stack
      data-testid={`${dataTestId}.FlexxTablePagination`}
      className='flexx-table-pagination'
      sx={{
        zIndex: 2,
        bottom: 0,
        position: 'sticky',
        backgroundColor: 'inherit',
        backdropFilter: 'blur(15px)',
        paddingY: '0.5rem',
        width: '100%',
      }}
    >
      <Stack
        direction='row'
        flexWrap='wrap-reverse'
        justifyContent='space-between'
        flex='1 1 auto'
        alignItems='center'
        gap={2}
        width='100%'
      >
        <Stack direction='row' flexShrink={0} ml='auto'>
          <TablePagination
            component={TablePaginationRoot}
            count={totalItems ?? rowsCount}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage={labelRowsPerPage}
            showFirstButton
            showLastButton
            sx={{
              p: 0,
              minHeight: 32,
              flexWrap: 'nowrap',
            }}
            ActionsComponent={props => (
              <FlexxTableActionsComponent
                currentPage={currentPage}
                {...props}
              />
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FlexxTablePagination;

import React, {FC} from 'react';

import {Box, IconButton, Stack} from '@mui/material';
import FlexxIcon from '@/components/FlexxIcon/FlexxIcon';
import {TablePaginationActionsProps} from '@mui/material/TablePagination/TablePaginationActions';

interface FlexxTableActionsComponentProps extends TablePaginationActionsProps {
  currentPage: number;
}

const FlexxTableActionsComponent: FC<FlexxTableActionsComponentProps> = ({
  count,
  page,
  currentPage,
  rowsPerPage,
  onPageChange,
}) => {
  const isFirstPage = page === 0;
  const isLastPage = page >= Math.ceil(count / rowsPerPage) - 1;

  const getLabelDisplayedRows = () => {
    const pagesCount = Math.ceil(count / rowsPerPage);
    return `${currentPage + 1}/${pagesCount}`;
  };

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Stack
      direction={'row'}
      gap={'1rem'}
      alignItems={'center'}
      flexWrap={'nowrap'}
    >
      <Box
        display='flex'
        alignItems='center'
        className='MuiTablePagination-actions gap-[0.25rem]'
      >
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={isFirstPage}
          aria-label='Go to first page'
          size='small'
        >
          <FlexxIcon icon={'fluent--chevron-double-left-16-regular'} />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={isFirstPage}
          aria-label='Go to previous page'
          size='small'
        >
          <FlexxIcon icon={'fluent--chevron-left-16-regular'} />
        </IconButton>
        <span className='text-xs'>{getLabelDisplayedRows()}</span>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={isLastPage}
          aria-label='Go to next page'
          size='small'
        >
          <FlexxIcon icon={'fluent--chevron-right-16-regular'} />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={isLastPage}
          aria-label='Go to last page'
          size='small'
        >
          <FlexxIcon icon={'fluent--chevron-double-right-16-regular'} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default FlexxTableActionsComponent;

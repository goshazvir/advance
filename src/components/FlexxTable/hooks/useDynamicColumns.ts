import {useMemo} from 'react';

import {useTheme} from '@mui/material/styles';
import {FlexxColumn} from '../domain/FlexxTable';
import useMediaQuery from '@mui/material/useMediaQuery';
import {isColumnVisible, sortColumns} from '../utils/flexxColumn.utils';

const useDynamicColumns = (
  columns: Iterable<FlexxColumn>,
): {processedColumns: FlexxColumn[]} => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // screen size less than 600px

  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // screen size less than 900px

  const isSmallDesktop = useMediaQuery(theme.breakpoints.down('lg')); // screen size less than 1200px

  const isLargeDesktop = useMediaQuery(theme.breakpoints.down('xl')); // screen size less than 1536px

  const processedColumns = useMemo(() => {
    const sortedColumns = sortColumns(columns);

    const visibleColumns = sortedColumns.filter(column =>
      isColumnVisible({
        column,
        isMobile,
        isTablet,
        isSmallDesktop,
        isLargeDesktop,
      }),
    );

    return visibleColumns;
  }, [columns, isMobile, isTablet, isSmallDesktop, isLargeDesktop]);

  return {processedColumns};
};

export default useDynamicColumns;

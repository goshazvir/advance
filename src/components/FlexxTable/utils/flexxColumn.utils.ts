import {type FlexxColumn} from '@components/FlexxTable/domain/FlexxTable';

const sortColumns = (columns: Iterable<FlexxColumn>): FlexxColumn[] => {
  const sortedColumns = [...columns].sort((column_a, column_b) => {
    const priorityA = column_a.priority || 0;
    const priorityB = column_b.priority || 0;

    return priorityA - priorityB;
  });

  return sortedColumns;
};

type ColumnVisibilityProps = {
  column: FlexxColumn;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  isLargeDesktop: boolean;
};

const isColumnVisible = ({
  column,
  isMobile,
  isTablet,
  isSmallDesktop,
  isLargeDesktop,
}: ColumnVisibilityProps): boolean => {
  if (!column.hiddenOn) {
    return true;
  }

  switch (column.hiddenOn) {
    case 'sm':
      return !isMobile;
    case 'md':
      return !isTablet;
    case 'lg':
      return !isSmallDesktop;
    case 'xl':
      return !isLargeDesktop;
    default:
      return true;
  }
};

export {sortColumns, isColumnVisible};

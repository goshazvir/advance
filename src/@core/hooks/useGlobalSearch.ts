import {useContext} from 'react';

import {
  GlobalSearchContext,
  GlobalSearchContextValue,
} from '../contexts/GlobalSearchContext';

export const useGlobalSearch = (): GlobalSearchContextValue => {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearch must be used inside GlobalSearchProvider');
  }
  return context;
};

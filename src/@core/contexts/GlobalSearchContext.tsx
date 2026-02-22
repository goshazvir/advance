'use client';
import React, {createContext, useMemo, useState} from 'react';

export interface GlobalSearchContextValue {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

export const GlobalSearchContext =
  createContext<GlobalSearchContextValue | null>(null);

export const GlobalSearchProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const value = useMemo<GlobalSearchContextValue>(
    () => ({
      searchQuery,
      updateSearchQuery,
    }),
    [searchQuery],
  );

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
    </GlobalSearchContext.Provider>
  );
};
